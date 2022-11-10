import { GreetThreadUsecase } from './greetThread/greetThread.usecase';
import { GreetUserUsecase } from './greetUser/greetUser.usecase';

export const getUsecases = () => [GreetThreadUsecase, GreetUserUsecase];
