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
		window.location.hash = '';
		window.localStorage.fccvotingapp = JSON.stringify(loginTokens)
	}
}
