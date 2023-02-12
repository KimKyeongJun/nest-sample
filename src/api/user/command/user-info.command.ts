// /*
// import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
// import { Injectable } from '@nestjs/common';
// import { UserEntity } from '../../../infra/entity/user.entity';
// import {
//   AdditionalProfile,
//   UserInfoUserRes,
// } from '../interface/dto/user-info.user.res';
// import CryptoUtil from '../../../common/util/crypto.util';
//
// export class UserInfoCommand implements ICommand {
//   constructor(readonly user: UserEntity) {}
// }
//
// @Injectable()
// @CommandHandler(UserInfoCommand)
// export class UserInfoCommandHandler
//   implements ICommandHandler<UserInfoCommand>
// {
//   constructor() {
//     //
//   }
//   async execute(command: UserInfoCommand) {
//     const _additionalProfile = await command.user.additionalProfile;
//     const _user = command.user;
//
//     const decryptName = CryptoUtil.decryptWithAes256(_additionalProfile.name);
//     const additionalProfile = new AdditionalProfile(
//       decryptName,
//       _additionalProfile.birthYear,
//       _additionalProfile.ageRange,
//       _additionalProfile.gender,
//       _additionalProfile.plusFriendFlag,
//       _additionalProfile.inviteCode,
//       _additionalProfile.createAt,
//       _additionalProfile.updateAt,
//       _additionalProfile.birthDay,
//     );
//
//     const ret = new UserInfoUserRes(
//       _user.userSeq,
//       _user.id,
//       _user.nickName,
//       _user.email,
//       _user.phoneNumber,
//       _user.thumbnailImage,
//       _user.lastLoginAt,
//       _user.deleteAt,
//       _user.createAt,
//       _user.updateAt,
//       _user.registerType,
//       _user.usageAgreeFlag,
//       _user.marketingAgreeFlag,
//       _user.dormantFlag,
//       _user.deleteFlag,
//       additionalProfile,
//     );
//     return ret;
//   }
// }
// */
