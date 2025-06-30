export interface GetUsersResponseDto {
  meta: {
    totalCount: number;
    totalPages: number;
    page: number;
    hasNextPage: boolean;
  };
  data: MockUser[];
}

export interface MockUser {
  id: number;
  name: string;
  phone: string;
  email: string;
  createdAt: string;
}
