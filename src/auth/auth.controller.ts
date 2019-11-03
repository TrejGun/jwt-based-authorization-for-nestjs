import {Request} from "express";
import {Controller, Post, UseGuards, Get, Req} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";

import {AuthService} from "./auth.service";
import {IAuth} from "./interfaces";
import {Public, User} from "../common/decorators";

import {UserEntity} from "../user/user.entity";

@Controller("/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(AuthGuard("local"))
  @Post("login")
  public login(@User() user: UserEntity): IAuth {
    return this.authService.login(user);
  }

  @Public()
  @Get("/logout")
  public logout(@Req() req: Request): void {
    req.logout();
  }
}
