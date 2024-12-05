import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { SongsController } from './songs/songs.controller';
import { DevConfigService } from './common/providers/DevConfigService';

const devConfig = {
  port: 3000
}

const proConfig = {
  port: 4000
}

@Module({
  imports: [SongsModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: DevConfigService,
      useClass: DevConfigService,
    },
    {
      provide: 'CONFIG',
      useFactory: () => {
        return process.env.NODE_ENV === 'development' ? devConfig : proConfig;
      }
    }
  ],
})

// applying the middleware
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('songs'); // this runs for the path that have 'songs'
    // consumer.apply(LoggerMiddleware).forRoutes({path: 'songs', method: RequestMethod.POST}) // OPTION 2 for running only the post request
    consumer.apply(LoggerMiddleware).forRoutes(SongsController) // OPTION 3 for running all the paths in the songs controller
  }
}
