import { ArrayContains, Contains, IsEmail, IsIn, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { ValidRoles } from '../interfaces/valid-roles';


export class CreateUserDto {


  @IsString()
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(
    /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'The password must have a Uppercase, lowercase letter and a number'
  })
  password: string;


  @IsString()
  @MinLength(1)
  fullName: string;
  
  @IsString()
  @MinLength(1)
  @IsIn(Object.keys(ValidRoles))
  rol: string;

}