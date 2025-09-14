import { JwtUser } from '../../user/types/jwt-user.types';

declare global {
  namespace Express {
    interface User extends JwtUser {}
  }
}
