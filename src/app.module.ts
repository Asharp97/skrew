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
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

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
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        config: {
          host: configService.get('API_REDIS_HOST'),
          port: configService.get('API_REDIS_PORT'),
          username: configService.get('API_REDIS_USERNAME') || undefined,
          password: configService.get('API_REDIS_PASSWORD') || undefined,
        },
      }),
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('API_JWT_SECRET'),
        issuer: configService.get('API_JWT_ISSUER'),
        global: true,
      }),
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
