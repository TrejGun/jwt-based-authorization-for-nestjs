import {Body, Controller, Get, Post} from "@nestjs/common";

import {AuthService} from "./auth.service";
import {UserService} from "../user/user.service";
import {IAuth, ILoginFields, ILogoutFields, IRefreshFields} from "./interfaces";
import {IUserCreateFields} from "../user/interfaces";
import {Public} from "../common/decorators";

@Controller("/auth")
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @Public()
  @Post("/login")
  public login(@Body() data: ILoginFields): Promise<IAuth> {
    return this.authService.login(data);
  }

  @Post("/refresh")
  async refreshToken(@Body() data: IRefreshFields): Promise<IAuth> {
    return this.authService.refresh(data);
  }

  @Public()
  @Get("/logout")
  public async logout(@Body() data: ILogoutFields): Promise<boolean> {
    await this.authService.delete(data);
    return true;
  }

  @Public()
  @Get("/signup")
  public async signup(@Body() data: IUserCreateFields): Promise<IAuth> {
    const user = await this.userService.create(data);
    return this.authService.loginUser(user);
  }
}
