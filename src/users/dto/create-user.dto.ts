import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    id: string

    @IsString()
    @MinLength(2)
    username: string

    @IsString()
    @MinLength(2)
    password: string

    @IsEmail()
    email:string
}
