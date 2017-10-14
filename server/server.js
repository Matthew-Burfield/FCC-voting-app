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
  origin: 'http://localhost:3000',
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
		res.status(401).json({ message: 'Missing or invalid token' })
	}
}

app.get('/surveys', function(req, res) {
	mongodb.MongoClient.connect(mongoUri, function(err, db) {
		if (err) throw err
		db.collection('survey').find({}).sort( { datetime: -1 } ).toArray(function(err, result) {
			const surveysObj = result.reduce((obj, survey) => {
				obj[survey._id] = survey
				return obj
			}, {})
			res.json(surveysObj)
			db.close()
		})
	})
})

app.get('/survey', function(req, res) {
	mongodb.MongoClient.connect(mongoUri, function(err, db) {
		if (err) throw err
		db.collection('survey').find({
			_id: mongodb.ObjectId(req.query.id),
		}).toArray(function(err, result) {
			console.log(req.query.id, result)
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
	const id = req.body.surveyId
	const vote = `pollOptions.${req.body.pollOptionIndex}.votes`
	mongodb.MongoClient.connect(mongoUri, function(err, db) {
		if (err) returnError(res, err)
		db.collection('survey').update(
			{ _id: mongodb.ObjectID(id) },
			{ $inc: { [vote]: 1 }}, function(err, result) {
			if (err) returnError(res, err)
			db.close()
			res.json({
				success: true,
			})
		})
	})
})

app.post('/addPollOption', jwtCheck, unauthorized, function(req, res) {
	const id = req.body.surveyId
	const pollOption = {
		title: req.body.title,
		votes: 0,
	}
	mongodb.MongoClient.connect(mongoUri, function(err, db) {
		if (err) returnError(res, err)
		db.collection('survey').update(
			{ _id: mongodb.ObjectID(id) },
			{ $push: { pollOptions: pollOption } }, function(err, result) {
			if (err) returnError(res, err)
			db.close()
			res.json({
				success: true,
			})
		})
	})
})

app.post('/comment', jwtCheck, unauthorized, function(req, res) {
	const id = req.body.surveyId
	const comment = {
		value: req.body.comment,
		datetime: moment().valueOf(),
	}
	mongodb.MongoClient.connect(mongoUri, function(err, db) {
		if (err) returnError(res, err)
		db.collection('survey').update(
			{ _id: mongodb.ObjectID(id) },
			{ $push: { comments: comment }}, function(err, result) {
			if (err) returnError(res, err)
			db.close()
			res.json({
				success: true,
			})
		})
	})
})

app.post('/survey', jwtCheck, unauthorized, function(req, res) {
	const surveyDefaults = {
		comments: [],
		datetime: moment().valueOf(),
		isDeleted: 0,
		usersVoted: [],
	}
	const survey = {
		isPublished: req.body.isPublished,
		pollOptions: req.body.pollOptions.map(value => ({
			title: value,
			votes: 0,
		})),
		title: req.body.title,
		...surveyDefaults,
	}
	mongodb.MongoClient.connect(mongoUri, function(err, db) {
		if (err) returnError(res, err)
		db.collection('survey').insertOne(survey, function(err, result) {
			if (err) returnError(res, err)
			db.close()
			res.json({
				success: true,
				survey,
			})
		})
	})
})

app.listen(8000, () => console.log('Example app listening on port 8000!'))
