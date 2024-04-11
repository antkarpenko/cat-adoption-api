import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { Register } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = {
      id: user.id,
      roles: user.roles,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(payload: Register) {
    const isEmailExist = await this.userService.findOneByEmail(payload.email);
    if (isEmailExist) {
      throw new HttpException('Email already exists', HttpStatus.CONFLICT);
    }

    const roles = ['user'];

    const totalUsers = await this.userService.count()
    if (!totalUsers){
      // first user is admin
      roles.push('admin')
    }

    const salt = bcrypt.genSaltSync(10);
    const user = new User({
      email: payload.email,
      name: payload.name,
      password: bcrypt.hashSync(payload.password, salt),
      roles,
    });

    return this.userService.create(user);
  }
}