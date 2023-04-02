import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async validateUser(email, password) {
        const user = await this.userService.findByEmail(email);
        const matchPassword = await bcrypt.compare(password, user.password);

        if (user && matchPassword) {
            const { password, ...result } = user;
            return result;
        }
    }

    async login(user: any) {
        const payload = { email: user.email, id: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}