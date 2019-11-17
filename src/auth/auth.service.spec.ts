import {Test, TestingModule} from "@nestjs/testing";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";

import {AuthService} from "./auth.service";
import {JwtStrategy} from "./jwt.strategy";
import {UserModule} from "../user/user.module";
import {UserEntity} from "../user/user.entity";
import ormconfig from "../ormconfig";
import {AuthEntity} from "./auth.entity";


describe("AuthService", () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(ormconfig),
        TypeOrmModule.forFeature([AuthEntity]),
        TypeOrmModule.forFeature([UserEntity]),
        UserModule,
        PassportModule,
        JwtModule.register({
          secret: process.env.JWT_SECRET_KEY,
          signOptions: {expiresIn: "60s"},
        }),
      ],
      providers: [AuthService, JwtStrategy],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
