import * as http from "http";

declare module 'faye';

export type NodeAdapterOptions = {
  mount?: string,
  timeout?: number,
  engine?: EngineOptions,
}

export type EngineOptions = {
  type: any,
  host: string,
  port: number,
}

export type Extension = {
  incoming?: Function,
  outgoing?: Function,
}

export type Listener = Function
export type ListenerOption = {
  eventName: string,
  listener: Listener,
}

export interface BayeuxServer {
  attach(server: http.Server): void
  addExtension(extension: Extension): void
  on(event: string, listener: Listener): void
}

declare class NodeAdapter implements BayeuxServer {
  constructor(option: NodeAdapterOptions)
  attach(server: http.Server): void
  addExtension(extension: Extension): void
  on(event: string, listener: Listener): void
}