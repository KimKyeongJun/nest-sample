import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../../infra/entity/user.entity';
import { AdditionalProfileRepository } from '../../../infra/repository/additional-profile.repository';
import CryptoUtil from '../../../common/util/crypto.util';

export class ChangeUserInfoCommand implements ICommand {
  constructor(
    readonly name: string,
    readonly inviteCode: string,
    readonly user: UserEntity,
  ) {}
}

@Injectable()
@CommandHandler(ChangeUserInfoCommand)
export class ChangeUserInfoCommandHandler
  implements ICommandHandler<ChangeUserInfoCommand>
{
  constructor(
    @InjectRepository(AdditionalProfileRepository)
    private readonly additionalProfileRepository: AdditionalProfileRepository,
  ) {}
  async execute(command: ChangeUserInfoCommand) {
    const _user = command.user;
    const _additionalProfile = await _user.additionalProfile;

    if (command.name == null && command.inviteCode == null) {
      return;
    }

    if (command.name != null) {
      _additionalProfile.name = CryptoUtil.encryptWithAes256(command.name);
    }

    if (command.inviteCode != null) {
      _additionalProfile.inviteCode = command.inviteCode;
    }

    await this.additionalProfileRepository.updateUserName(_additionalProfile);
  }
}
