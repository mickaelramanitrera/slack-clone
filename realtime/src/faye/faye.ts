import * as http from "http";
import * as cluster from 'cluster';
import * as os from 'os';
import * as Faye from 'faye';
import * as FayeRedis from 'faye-redis';
import { debug as Debugger } from 'debug';
import { Config } from "../config";
import LoggerExt from "../extension/logger";

const debug = Debugger('server');
const numCpus = os.cpus().length;

export default class FayeServer {
  private port: string | number;
  private server: http.Server;
  private bayeux: Faye.BayeuxServer;
  private engine: Faye.EngineOptions | undefined;
  protected authorizor: any;
  protected supportMultiInstance: boolean = false;

  protected extensions: Faye.Extension[] = [];
  protected listeners: Faye.ListenerOption[] = [];

  constructor(public config: Config) {
    debug('boostraping application...')
    this.configure(config);
    this.createServer();
  }

  /**
   * Configure the server application
   * 
   * @param config 
   */
  private configure(config: any): void {
    debug('configuring the application', JSON.stringify(config))
    this.port = config.port || 0;

    if (config.redis) {
      const [host, port] = (config.redis.uri || '').split(':')

      if (host && !config.redis.disabled) {
        this.engine = {
          type: FayeRedis,
          host,
          port,
        };
        this.supportMultiInstance = true
      }
    }
  }

  /**
   * Create the instance of the TCP server
   */
  private createServer(): void {
    const handler = (req: http.RequestOptions, res: http.ServerResponse) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Request-Method', '*');
      res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
      res.setHeader('Access-Control-Allow-Headers', '*');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Vary', 'Origin');
      res.setHeader('X-Application', 'NLC/Realtime');
      if ( req.method === 'OPTIONS' ) {
        res.writeHead(200);
        res.end();
        return;
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify({ status: 'OK' }));
      res.end();
    }

    this.server = http.createServer(handler);
  }

  /**
   * Setup faye server, bind the bayeux into http server
   */
  private bindFaye() {
    let options: Faye.NodeAdapterOptions = {
      mount: this.config.mount,
      timeout: 2000,
    }

    if (this.engine) {
      options = {
        ...options,
        engine: this.engine,
      }
    }

    debug(`bind bayeux server on ${this.config.mount}...`)
    this.bayeux = new Faye.NodeAdapter(options);
    
    // add logger in prior
    this.bayeux.addExtension(LoggerExt);

    // add application-based extensions
    this.extensions.forEach(
      (extension: Faye.Extension) => {
        this.bayeux.addExtension(extension)
      }
    )

    // attach event listeners
    this.listeners.forEach(
      (o: Faye.ListenerOption) => {
        this.bayeux.on(o.eventName, o.listener)
      }
    )
    
    this.bayeux.attach(this.server)
  }

  /**
   * Adding extension to be bound on the bayeux server
   *
   * @param extension 
   */
  public addExtension(extension: Faye.Extension) {
    this.extensions.push(extension);

    return this
  }

  public on(eventName: string, listener: Faye.Listener) {
    this.listeners.push({
      eventName,
      listener
    });

    return this;
  }

  /**
   * Publicly exposed function to serve whole application
  */
  private listen(): void {
    this.bindFaye();

    this.server.listen(this.port, () => {
      console.log(`Running server on port ${this.port}`);
    });
  }

  /**
   * Run the server
   */
  public run() {
    if (this.supportMultiInstance) {
      if (cluster.isMaster) {
        debug(`Master is running on PID=${process.pid}`);
  
        for (let i = 0; i < numCpus; i++) {
          cluster.fork();
        }
      
        cluster.on('exit', (worker, code, signal) => {
          debug(`worker ${worker.process.pid} died`);
        });
      } else {
        this.listen()
      }
    } else {
      this.listen()
    }
  }  

  public getServer(): http.Server {
    return this.server;
  }
}