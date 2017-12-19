const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const jwt = require('express-jwt')
const moment = require('moment')
const mongodb = require('mongodb')
const request = require('request')
const rsaValidation = require('auth0-api-jwt-rsa-validation')

const app = express()

const mongoUri = process.env.MONGO_URL;

const corsOptions = {
  origin: 'http://fcc-voting-app.surge.sh',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))
app.use(bodyParser.json())

const returnError = (res, err) => {
	res.json({
		success: false,
		error: err,
	})
}

const jwtCheck = jwt({
	secret: rsaValidation(),
	algorithms: ['RS256'],
	issuer: process.env.ISSUER,
	audience: process.env.AUDIENCE,
	responseType: 'id_token',
	options: {
		auth: {
			responseType: 'id_token',
			scope: 'openid profile email'
		}
	}
})

const unauthorized = (err, req, res, next) => {
	if (err.name === 'UnauthorizedError') {
		console.log("Start unauthorized sequence")
		res.status(401).json({ message: 'Missing or invalid token' })
	}
	if (err.name === 'TypeError') {
		res.status(400).json(err)
	}
}

const allowUnauthorizedAccess = (err, req, res, next) => {
	return next()
}

const getUserId = (req) => {
	if (req && req.user && req.user.sub) {
		return req.user.sub
	}
	return void 0
}

const connectToDatabase = (res, callback) => {
	const response = (db, err, responseValues) => {
		db.close()
		if (err) {
			returnError(res, err)
		} else {
			res.json(Object.assign({}, { success: true }, responseValues))	
		}
	}
	mongodb.MongoClient.connect(mongoUri, function(err, db) {
		if (err) returnError(res, err)
		callback(db, response)
	})
}

// Do a jwtCheck to see if the user is logged in so we can
// get their unpublished surveys if they are.
// If they aren't return all the published surveys
app.get('/surveys', jwtCheck, allowUnauthorizedAccess, function(req, res) {
	const loggedInUserId = getUserId(req)
	mongodb.MongoClient.connect(mongoUri, function(err, db) {
		if (err) throw err
		db.collection('survey').find({
			$or: [{
				isPublished: true,
			}, {
				$and: [{
					isPublished: false,
				}, {
					createdBy: loggedInUserId,
				}],
			}],
		}).sort( { datetime: -1 } ).toArray(function(err, result) {
			const surveysObj = result.reduce((obj, survey) => {
				obj[survey._id] = survey
				return obj
			}, {})
			db.close()
			res.json(surveysObj)
		})
	})
})

app.get('/survey', function(req, res) {
	connectToDatabase(res, (db) => {
		db.collection('survey').find({
			_id: mongodb.ObjectId(req.query.id),
		}).toArray(function(err, result) {
			if (result.length > 0) {
				res.json(result)
			} else {
				res.status(404).send('The survey you\'re requesting doesn\'t exist!')
			}
			db.close()
		})
	})
})

app.post('/vote', function(req, res) {
	const id = req.body.pollId
	const vote = `pollOptions.${req.body.optionIndex}.votes`
	connectToDatabase(res, (db, response) => {
		db.collection('survey').update({
			_id: mongodb.ObjectID(id),
		}, {
			$inc: { [vote]: 1 },
		}, function(err, result) {
			response(db, err, {})
		})
	})
})

app.post('/addPollOption', jwtCheck, unauthorized, function(req, res) {
	const id = req.body.surveyId
	const pollOption = {
		title: req.body.title,
		votes: 0,
	}
	connectToDatabase(res, (db, response) => {
		db.collection('survey').update({
			_id: mongodb.ObjectID(id),
		}, {
			$push: { pollOptions: pollOption },
		}, function(err, result) {
			response(db, err, {})
		})
	})
})

app.post('/comment', jwtCheck, unauthorized, function(req, res) {
	const id = req.body.surveyId
	const comment = {
		value: req.body.comment,
		datetime: moment().valueOf(),
	}
	connectToDatabase(res, (db, response) => {
		db.collection('survey').updateOne({
			_id: mongodb.ObjectID(id),
		}, {
			$push: { comments: comment },
		}, function(err, result) {
			response(db, err, {
				datetime: comment.datetime,
			})
		})
	})
})

const getCompleteSurvey = (title, pollOptions, isPublished, user) => ({
	comments: [],
	datetime: moment().valueOf(),
	isDeleted: 0,
	isPublished,
	pollOptions,
	title,
	usersVoted: [],
	createdBy: user,
})

app.post('/survey', jwtCheck, unauthorized, function(req, res) {
	console.log('enter')
	if (req.body.isDeleted) {
		// Has the delete flag. Enter the delete flow
		if (!req.body.id) {
			returnError(res, 'Must provide the id of the survey to delete')
		}
		console.log('deleting survey: ', req.body.id)
		connectToDatabase(res, (db, response) => {
			db.collection('survey').deleteOne({ _id: mongodb.ObjectId(req.body.id) }, function(err, result) {
				response(db, err, {})
			})
		})
	} else if (req.body.id) {
		// This survey already has an ID. Enter the update flow
		console.log('editing survey: ', req.body.id)
		const survey = getCompleteSurvey(req.body.title, req.body.pollOptions, req.body.publish, req.user.sub)
		
		connectToDatabase(res, (db, response) => {
			db.collection('survey').updateOne({ _id: mongodb.ObjectID(req.body.id) }, survey, function(err, result) {
				survey._id = req.body.id
				response(db, err, {
					survey,
				})
			})
		})
	} else {
		// No delete flag and no ID. Enter the create flow
		console.log('creating survey: ', req.body)
		const {
			title,
			pollOptions,
			publish,
		} = req.body
		const survey = getCompleteSurvey(title, pollOptions, publish, req.user.sub)
		connectToDatabase(res, (db, response) => {
			db.collection('survey').insertOne(survey, function(err, result) {
				response(db, err, {
					survey,
				})
			})
		})
	}
})

const port = process.env.PORT || 8000

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
