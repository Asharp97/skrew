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
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/guards/auth.guard';
import { ScheduleModule } from '@nestjs/schedule';
import { WebsocketsModule } from './websockets/websockets.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true,
      },
      playground: process.env.NODE_ENV === 'development',
      context: ({ req, res }: { req: unknown; res: unknown }) => ({ req, res }),
    }),
    RedisModule.forRootAsync({
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
    JwtModule.register({
      global: true,
      secret: process.env.API_JWT_SECRET,
      signOptions: { issuer: process.env.API_JWT_ISSUER },
    }),
    ScheduleModule.forRoot(),
    CardModule,
    CardInstanceModule,
    UserModule,
    TurnModule,
    HandModule,
    TableModule,
    WebsocketsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
