// Created the logger middleware by creating the common/middleware folders in the src
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('Request...', new Date().toDateString())
    next();
  }
}
