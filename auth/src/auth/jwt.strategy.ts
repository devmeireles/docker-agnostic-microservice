import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtPayload } from './jwt-payload.interface';
import { UserEntity } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    const jwtConfig = 'topSecretHash';

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig,
    });
  }

  async validate(payload: JwtPayload): Promise<UserEntity> {
    const { email } = payload;

    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
