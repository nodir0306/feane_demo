import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user';
import { LoginRequest, LoginResponse, RefreshRequest, RefreshResponse, RegisterRequest, RegisterResponse } from './interfaces';
import { SendMessageDto } from './dtos';
export declare class AuthService {
    private usermodel;
    private config;
    private jwt;
    constructor(usermodel: typeof User, config: ConfigService, jwt: JwtService);
    login(payload: LoginRequest): Promise<LoginResponse>;
    register(payload: RegisterRequest): Promise<RegisterResponse>;
    logout(): Promise<void>;
    refresh(payload: RefreshRequest): Promise<RefreshResponse>;
    sendFunc(payload: SendMessageDto): Promise<string>;
}
