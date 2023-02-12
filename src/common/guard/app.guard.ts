import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Constants } from '../constant/constants';

@Injectable()
export class AppGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  private validateRequest(request: any) {
    const appId = request.headers['app-id'];
    const appSecret = request.headers['app-secret'];
    if (appId === Constants.appId && appSecret === Constants.appSecret) {
      return true;
    }
    throw new HttpException(
      {
        status: HttpStatus.UNAUTHORIZED,
        message: 'unauthorized',
        error: 'please check app-id or app-secret again.',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
