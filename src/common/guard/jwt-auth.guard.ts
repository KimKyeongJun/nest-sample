import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // constructor(private jwtService: JwtService) {
  //   super();
  // }
  // canActivate(context: ExecutionContext) {
  //   return true;
  // }
}
