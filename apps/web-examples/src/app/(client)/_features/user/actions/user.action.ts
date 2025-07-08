'use server';

import type { SignUpRequestDto } from '../dtos/signUp.dto';
import userService from '../services/user.service';

export async function signUpAction(signUpRequestDto: SignUpRequestDto) {
  return userService.signUp(signUpRequestDto);
}
