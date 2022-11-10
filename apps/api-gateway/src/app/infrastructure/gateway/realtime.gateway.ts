import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import { WelcomeEvent } from '@slack-clone/kernel';

@WebSocketGateway({
  cors: {
    origin: '*' // to remove later when deployed
  }
})
export class RealtimeGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  private readonly logger: Logger = new Logger(`API-GATEWAY : ${RealtimeGateway.name}`);

  @SubscribeMessage('message')
  handleEvent(@MessageBody() data: string): { ack: boolean } {
    this.logger.log(`Received datas with : ${JSON.stringify(data)}`);
    return { ack: true };
  }

  handleConnection(client: Socket, ...args): any {
    this.logger.log(`Gateway connection established for client ${client.id}`);
    client.emit(WelcomeEvent.name, new WelcomeEvent('👋 Welcome on gateway !'));
    client.broadcast.emit(
      WelcomeEvent.name,
      new WelcomeEvent(`New client [${client.id}] connected`)
    );
  }

  handleDisconnect(client: Socket): any {
    this.logger.log(`Gateway connection terminated for client ${client.id}`);
    client.broadcast.emit(WelcomeEvent.name, new WelcomeEvent(`Client [${client.id}] just left`));
  }

  afterInit(_): any {
    this.logger.log('Gateway initialized');
  }
}
