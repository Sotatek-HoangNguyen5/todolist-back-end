import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MaxLength(20, { message: 'Username length must less or equal to 20' })
  @MinLength(4, { message: 'Username length must be more or equal to 4' })
  userName: string;

  @MaxLength(20, { message: 'Password length must less or equal to 20' })
  @MinLength(8, { message: 'Password length must be more or equal to 8' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  password: string;
}
