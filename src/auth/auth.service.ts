import {Injectable} from "@nestjs/common";
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";
import {IAuth} from "./interfaces";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  public async validateUser(email: string, password: string): Promise<any> {
    return this.userService.getByCredentials(email, password);
  }

  public async getUser(id: number): Promise<any> {
    return this.userService.findOne({id});
  }

  public login(user: any): IAuth {
    const {email, id} = user;
    return {
      // eslint-disable-next-line @typescript-eslint/camelcase
      access_token: this.jwtService.sign({email, id}),
    };
  }
}
