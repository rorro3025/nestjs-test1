import { Controller, Post, Body, Res, HttpStatus } from "@nestjs/common";
import { Response } from 'express';
import { AuthService } from "./auth.service";

interface LoginI {
    username: string,
    password: string
}

@Controller('login')
export class AuthController {

    authService: AuthService

    constructor(authService: AuthService) {
        this.authService = authService
    }

    @Post()
    login(@Body() formData: LoginI, @Res() response: Response) {

        const currentUser = this.authService.getUserRequesterInformation(formData.username)
        if (currentUser && formData.password === 'password') {
            response.setHeader('Authorization', 'Rorro')
            return response.status(HttpStatus.ACCEPTED).json({ message: 'User logged with validation' })
        }

    }

    @Post('Logout')
    logout(@Res() response: Response) {
        return response.status(HttpStatus.ACCEPTED).json({ message: 'Sessio has been close' })
    }
}

