import { debug as Debugger } from 'debug';

const debug = Debugger('server:io');

export default {
	incoming: function (message: any, request: any, callback: Function) {
		if (message.channel.match(/^\/meta/i)) {
			return callback(message);
		}

		const { headers } = request;
    debug("incoming message: ", message.channel, JSON.stringify({ headers, message }).length);
		return callback(message);
	}
}