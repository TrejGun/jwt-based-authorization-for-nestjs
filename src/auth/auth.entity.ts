import {BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "../user/user.entity";
import {IAuth} from "./interfaces";

@Entity({schema: "test", name: "auth"})
export class AuthEntity extends BaseEntity implements IAuth {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({type: "varchar"})
  public refreshToken: string;

  @Column({type: "int"})
  public refreshTokenExpiresAt: number;

  public accessToken: string;

  public accessTokenExpiresAt: number;

  @JoinColumn()
  @OneToOne(_type => UserEntity)
  public user: UserEntity;
}
