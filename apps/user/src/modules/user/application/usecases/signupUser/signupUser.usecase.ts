import { Usecase, UsecaseResult } from '@slack-clone/kernel';
import { Injectable } from '@nestjs/common';
import { SignupUserDto } from './signupUser.dto';
import { SignupUserResponse } from './signupUser.response';
import { User } from '../../../domain/user';
import { UserRole } from '../../../domain/userRole';

@Injectable()
export class SignupUserUsecase extends Usecase<SignupUserDto, SignupUserResponse> {
  async execute({
    name,
    profilePicture,
    password,
    email
  }: SignupUserDto): Promise<UsecaseResult<SignupUserResponse>> {
    const userResult = User.create({
      name,
      email,
      password,
      profilePicture: profilePicture ?? null,
      role: UserRole.Regular
    });

    return userResult.map((user) => ({ user }));
  }
}
