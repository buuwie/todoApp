import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from 'src/dto/registerUser.dto';
import { LoginUserDto } from 'src/dto/loginUser.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body(ValidationPipe) LoginUserDto: LoginUserDto) {
        return this.authService.loginUser(LoginUserDto);
    }

    @Post('register')
    register(@Body(ValidationPipe) RegisterUserDto: RegisterUserDto) {
        return this.authService.createUser(RegisterUserDto);
    }
}
