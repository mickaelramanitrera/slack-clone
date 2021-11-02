import * as jwt from 'jsonwebtoken';
import { debug as Debugger } from 'debug';

const debugf = Debugger('server:faye:authorizor');

// example
// https://faye.jcoglan.com/node/extensions.html
// Get subscribed channel and auth token
/**********************************************
var subscription = message.subscription,
	msgToken = message.ext && message.ext.authToken;

// Find the right token for the channel
this._fileContent = {
	"/users/jcoglan/updates": "rt6utrb",
	"/artists/mclusky/news": "99taaec"
}

var registry = JSON.parse(this._fileContent.toString()),
	token = registry[subscription];

// Add an error if the tokens don't match
if (token !== msgToken) {
	message.error = 'Invalid subscription auth token';
}
***********************************************/

export default {
	incoming: function (message: any, request: any, callback: Function) {
		if (message.channel !== '/meta/subscribe') {
			return callback(message);
		}

		if (!message.ext) {
			return callback({
				...message,
				error: 'No authentication information found'
			})
		}

		if (!(message.ext || {}).token) {
			return callback({
				...message,
				error: 'No token information found'
			})
		}

		return jwt.verify(
			(message.ext || {}).token, 
			process.env.JWT_SECRET,
			{ algorithms: ['HS256', 'RS256', 'ES256'] },
			(err: Error | null, payload: any) => {
				if (err) {
					debugf(err)
					return callback({
						...message,
						error: err.message
					})
				}

				if (!payload) {
					debugf(`${message.clientId}: payload not resolved`)
					return callback({
						...message,
						error: 'payload not resolved'
					})
				}

				const {subscription} = message;
				debugf(`user: [${payload.item_id}, ${payload.name}] sub on ${subscription}`)

				return callback(message)
			}
		);
	}
}