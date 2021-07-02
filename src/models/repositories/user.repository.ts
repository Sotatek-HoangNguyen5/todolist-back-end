import { AuthCredentialsDto } from 'src/modules/auth/dto/auth-condentials.dto';
import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { bcrypt } from 'bcrypt';
import { NotFoundException } from '@nestjs/common';
import { NotFoundError } from 'rxjs';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async signup(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { userName, password } = authCredentialsDto;

    //generate a salt and hash on separate function calls
    const salt = await bcrypt.genSalt(process.env.SALT_ROUND);

    const newUser = new UserEntity();
    newUser.userName = userName;
    newUser.password = await this.hashPassword(password, salt);
    newUser.salt = salt;

    await newUser.save();
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async getUserById(id: number): Promise<UserEntity> {
    const user = await this.findOne(id);

    if (!user) throw new NotFoundException(`No user found with ID "${id}"`);

    return user;
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<UserEntity> {
    const { userName, password } = authCredentialsDto;

    const user = this.findOne({ userName });

    if (user && (await (await user).validatePassword(password))) {
      return user;
    } else return null;
  }
}
