import jwtDecode from 'jwt-decode'
import moment from 'moment'

export const checkTokenIsValid = (token) => {
	try {
		const decodedToken = jwtDecode(token)
		return decodedToken.exp > (Date.now() / 1000)
	} catch (InvalidTokenError) {
		return false
	}
}

export const getAccessToken = () => {
	if (window &&
		window.localStorage &&
		window.localStorage.fccvotingapp
	) {
		return JSON.parse(window.localStorage.fccvotingapp).access_token
	}
	return null
}

export const getTokenId = () => {
	if (window &&
		window.localStorage &&
		window.localStorage.fccvotingapp
	) {
		const tokenId = JSON.parse(window.localStorage.fccvotingapp).id_token
		return tokenId
	}
	return null
}

export const getUserId = () => {
	const token_id = jwtDecode(getTokenId())
	return token_id.sub
}

export const removeLocalTokens = () => {
	if (window &&
		window.localStorage &&
		window.localStorage.fccvotingapp &&
		window.localStorage.fccvotingapp.length
	) {
			window.localStorage.fccvotingapp = ''
		}
}

export const saveTokensToLocalStorage = () => {
	if (
		window && 
		window.location && 
		window.location.hash && 
		window.location.hash.length > 1
	) {
		const loginTokens = window.location.hash.slice(1).split('&').reduce((obj, val) => {
			const item = val.split('=')
			return {
				...obj,
				[item[0]]: item[1],
			}
		}, {})
		window.location.hash = ''
		window.localStorage.fccvotingapp = JSON.stringify(loginTokens)
	}
}

export const saveVoteToLocalStorage = (pollId, optionsIndex) => {
	if (window && window.localStorage) {
		if (!window.localStorage.votedPolls) {
			window.localStorage.votedPolls = JSON.stringify({})
		}
		const votes = JSON.parse(window.localStorage.votedPolls)
		votes[pollId] = {
			optionVotedFor: optionsIndex,
			date: moment.now()
		}
		window.localStorage.votedPolls = JSON.stringify(votes)
	}
}


export const userHasVoted = (pollId) => {
	if (window && window.localStorage && window.localStorage.votedPolls) {
		return JSON.parse(window.localStorage.votedPolls)[pollId]
	}
	return void 0
}
