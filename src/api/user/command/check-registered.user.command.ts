import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../../../infra/repository/user.repository';

export class CheckRegisteredUserCommand implements ICommand {
  constructor(readonly id: string) {}
}

@Injectable()
@CommandHandler(CheckRegisteredUserCommand)
export class CheckRegisteredUserHandler
  implements ICommandHandler<CheckRegisteredUserCommand>
{
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}
  async execute(command: CheckRegisteredUserCommand): Promise<boolean> {
    const id = command.id;
    return await this.userRepository.existUserId(id);
  }
}
