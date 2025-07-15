import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    const secretOrKey = 'ACCESS_TOKEN_SECRET_KEY';

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey,
    });
  }

  async validate(payload: { username: string }) {
    const { username } = payload;

    const user = await (await this.userService.getUser(username)).toPromise();

    if (!user)
      throw new UnauthorizedException('User not found or invalid token');

    const { password, ...safeUser } = user;
    return safeUser;
  }
}
