import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {

  id:string
  @IsString({message:"Se esperaba cadena"})
  @IsNotEmpty()
  @MinLength(2)
  username: string;
  password: string;

  @IsString({message:"Se esperaba cadena"})
  @IsEmail()
  email: string

  fullName: string;
  address: {
    city: string
    state: string
  };

  contactInformation: {
    phoneNumber: string
    officeNumber: string
  };
}
