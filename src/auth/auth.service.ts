import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

    getUserRequesterInformation(username: string): boolean {
        if (username === 'SandraBB') return true
        return false
    }

}
