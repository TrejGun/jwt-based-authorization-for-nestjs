import {Module} from "@nestjs/common";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {TypeOrmModule} from "@nestjs/typeorm";

import {AuthService} from "./auth.service";
import {AuthEntity} from "./auth.entity";
import {JwtStrategy} from "./jwt.strategy";
import {UserModule} from "../user/user.module";
import {AuthController} from "./auth.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthEntity]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
