import { AdditionalProfile } from './user-info.user.res';
import { number } from 'joi';

export class UserPointRes {
  constructor(readonly points: Array<UserPoint>) {}
}

export class UserPoint {
  constructor(readonly type: string, readonly point: number) {}
}
