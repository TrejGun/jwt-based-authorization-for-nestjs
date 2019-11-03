import "./env";
// eslint-disable-next-line import/default
import passport from "passport";
import {NestFactory, Reflector} from "@nestjs/core";

import {ApplicationModule} from "./app.module";
import {JwtGuard, RolesGuard} from "./common/guards";


async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(ApplicationModule);

  // eslint-disable-next-line import/namespace
  app.use(passport.initialize());

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtGuard(reflector));
  app.useGlobalGuards(new RolesGuard(reflector));

  await app.listen(process.env.PORT, process.env.HOST, () => {
    // eslint-disable-next-line no-console
    console.info(`Express server is running on http://${process.env.HOST}:${process.env.PORT}/`);
  });
}

bootstrap();
