import { Usecase, UsecaseResult } from '@slack-clone/kernel';
import { Injectable } from '@nestjs/common';
import { GreetUserDto } from './greetUser.dto';
import { GreetUserResponse } from './greetUser.response';
import { UserService } from '../../services/user.service';

@Injectable()
export class GreetUserUsecase extends Usecase<GreetUserDto, GreetUserResponse> {
  constructor(private readonly userService: UserService) {
    super();
  }

  async execute(request: GreetUserDto): Promise<UsecaseResult<GreetUserResponse>> {
    const greetResponse = await this.userService.greet(request.name);

    return greetResponse.map((response) => ({ response }));
  }
}
