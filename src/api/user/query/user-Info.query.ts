import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../../infra/entity/user.entity';
import {
  AdditionalProfile,
  UserInfoUserRes,
} from '../interface/dto/user-info.user.res';
import CryptoUtil from '../../../common/util/crypto.util';

export class UserInfoQuery implements IQuery {
  constructor(readonly user: UserEntity) {}
}

@Injectable()
@QueryHandler(UserInfoQuery)
export class UserInfoQueryHandler implements IQueryHandler<UserInfoQuery> {
  constructor() {
    //
  }
  async execute(query: UserInfoQuery) {
    const _additionalProfile = await query.user.additionalProfile;
    const _user = query.user;

    const decryptName = CryptoUtil.decryptWithAes256(_additionalProfile.name);
    const phoneNumber = CryptoUtil.decryptWithAes256(_user.phoneNumber);
    const additionalProfile = new AdditionalProfile(
      decryptName,
      _additionalProfile.birthYear,
      _additionalProfile.ageRange,
      _additionalProfile.gender,
      _additionalProfile.plusFriendFlag,
      _additionalProfile.inviteCode,
      _additionalProfile.createAt,
      _additionalProfile.updateAt,
      _additionalProfile.birthDay,
    );

    const ret = new UserInfoUserRes(
      _user.userSeq,
      _user.id,
      _user.nickName,
      _user.email,
      phoneNumber,
      _user.thumbnailImage,
      _user.userCode,
      _user.lastLoginAt,
      _user.deleteAt,
      _user.createAt,
      _user.updateAt,
      _user.registerType,
      _user.usageAgreeFlag,
      _user.marketingAgreeFlag,
      _user.dormantFlag,
      _user.deleteFlag,
      additionalProfile,
    );
    return ret;
  }
}
