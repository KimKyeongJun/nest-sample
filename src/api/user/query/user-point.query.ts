import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserEntity } from '../../../infra/entity/user.entity';
import { Injectable } from '@nestjs/common';
import { UserPoint, UserPointRes } from '../interface/dto/user-point.user.res';
import { of } from 'rxjs';

export class UserPointQuery implements IQuery {
  constructor(readonly user: UserEntity) {}
}

@Injectable()
@QueryHandler(UserPointQuery)
export class UserPointQueryHandler implements IQueryHandler<UserPointQuery> {
  async execute(query: UserPointQuery) {
    const userPointEntities = await query.user.userBenefits;
    const points: Array<UserPoint> = [];
    for (const point of userPointEntities) {
      const userPoint = new UserPoint(
        point.benefitType.toString(),
        point.point,
      );
      points.push(userPoint);
    }
    const response = new UserPointRes(points);
    return response;
  }
}
