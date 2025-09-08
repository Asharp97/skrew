import { Module } from '@nestjs/common';
import { WebsocketsGateway } from './websocket';

@Module({
  providers: [WebsocketsGateway],
  exports: [WebsocketsGateway],
})
export class WebsocketsModule {}
