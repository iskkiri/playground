export interface JwtPayload {
  sub: number;
  email: string;
  role: string;
}

export interface RefreshTokenWithUser {
  id: string;
  familyId: string;
  tokenHash: string;
  userId: number;
  isRevoked: boolean;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
  user_id: number;
  user_email: string;
  user_role: string;
}