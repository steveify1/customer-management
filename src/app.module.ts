import { BadRequestException, forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './components/auth/auth.module';
import { GenderModule } from './components/gender/gender.module';
import { UserModule } from './components/user/user.module';
import ExceptionsFilter from './shared/filters/exceptions.filter';
import { LoggingInterceptor } from './shared/interceptors/logging.interceptor';
import ResponseSerializerInterceptor from './shared/interceptors/response.interceptor';
import { PaginationMiddleware } from './shared/middlewares/pagination.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: ['dist/**/*.entity.js'],
      }),
      inject: [ConfigService],
    }),
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    forwardRef(() => GenderModule),
  ],
  controllers: [AppController],
  providers: [
    ConfigService,
    AppService,
    {
      provide: APP_FILTER,
      useClass: ExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseSerializerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_PIPE,
      useFactory: () => {
        return new ValidationPipe({
          exceptionFactory: (errors) => new BadRequestException(errors),
          transform: true,
          validationError: { target: false, value: false },
          whitelist: true,
          forbidNonWhitelisted: true,
        });
      },
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    return consumer
      .apply(PaginationMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.GET });
  }
}
