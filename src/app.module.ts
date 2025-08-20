import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardModule } from './card/card.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { CardInstanceModule } from './cardInstance/cardInstance.module';
import { TurnModule } from './turn/turn.module';
import { HandModule } from './hand/hand.module';
import { TableModule } from './table/table.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true,
      },
      playground: process.env.NODE_ENV === 'development',
      context: ({ req, res }) => ({ req, res }),
    }),
    CardModule,
    CardInstanceModule,
    UserModule,
    TurnModule,
    HandModule,
    TableModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
