import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3001);
console.log("✅ Hot reload is working very well!");

}
bootstrap();
// Test change for hot reload
// Test change for hot reload
