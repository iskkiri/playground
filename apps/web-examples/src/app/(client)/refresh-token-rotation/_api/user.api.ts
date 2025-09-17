import { client } from './client';
import type { GetMeResponseDto } from './dtos/getMe.dto';

export async function getMeApi() {
  const { data } = await client.get<GetMeResponseDto>('/users/me');
  return data;
}

export async function testApi() {
  const { data } = await client.get<{ success: true }>('/users/test');
  return data;
}
