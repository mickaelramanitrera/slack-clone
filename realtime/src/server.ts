import * as minimist from 'minimist';
import defaultConfig from './config';
import { FayeServer } from './faye';
import {onDisconnect, onSubscribe, onHandshake, onUnsubscribe} from './listeners';
import AuthorizationExt from './extension/authorizor';

// parse command
const argv: any = minimist(process.argv.slice(2), {
  default: defaultConfig,
  alias: {
    p: 'port'
  }
});

// instanciate the application and run
const app = new FayeServer(argv);
const server = app.getServer();

app
  .on('subscribe', onSubscribe)
  .on('unsubscribe', onUnsubscribe)
  .on('disconnect', onDisconnect)
  .on('handshake', onHandshake)
  // .addExtension(AuthorizationExt)
;

app.run();

export { server };