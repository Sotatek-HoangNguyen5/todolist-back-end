import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/models/repositories/user.repository';
import { AuthCredentialsDto } from './dto/auth-condentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signup(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return await this.userRepository.signup(authCredentialsDto);
  }

  async signin(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const user = await this.userRepository.validateUserPassword(
      authCredentialsDto,
    );

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const userName = user.userName;

    const payload: JwtPayload = { userName };
    console.log(payload);
    const accessToken = await this.signJWT(payload);

    return { accessToken };
  }

  async signJWT(payload) {
    return await this.jwtService.sign(payload);
  }
}
