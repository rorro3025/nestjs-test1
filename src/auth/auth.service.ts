import { Injectable, Body, Res,HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class AuthService {

  getUserRequesterInformation(username: string): boolean {
    return username === 'SandraBB';
  }

  login(@Body() formData:LoginI, @Res() response: Response) {
    const userValidated = this.getUserRequesterInformation(formData.username)
    if(userValidated)
      return response.status(HttpStatus.ACCEPTED).json({message: 'User logged with validation'})
    else
    response.status(HttpStatus.UNAUTHORIZED).json({message: 'User no found'})

  }
}
