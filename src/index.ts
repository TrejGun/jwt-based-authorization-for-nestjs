import "./env";
import {NestFactory, Reflector} from "@nestjs/core";

import {ApplicationModule} from "./app.module";
import {JwtGuard, RolesGuard} from "./common/guards";


async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(ApplicationModule);

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtGuard(reflector));
  app.useGlobalGuards(new RolesGuard(reflector));

  await app.listen(process.env.PORT, process.env.HOST, () => {
    console.info(`Express server is running on http://${process.env.HOST}:${process.env.PORT}/`);
  });
}

bootstrap();
