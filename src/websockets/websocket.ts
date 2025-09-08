import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WebsocketsGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket: Socket) => {
      console.log('Client connected:', socket.id);
    });
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() payload: unknown) {
    console.log('Message received:', payload);
    this.server.emit('onMessage', { msg: 'ne mesaj', data: payload });
  }
}
