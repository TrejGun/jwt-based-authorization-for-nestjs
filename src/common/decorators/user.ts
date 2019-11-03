import {Request} from "express";
import {createParamDecorator} from "@nestjs/common";


export const User = createParamDecorator((_data: any, req: Request) => req.user);
