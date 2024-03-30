import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ credentials: true, origin: true });
  if (process.env.NODE_ENV === 'development'){
   app.setGlobalPrefix('api');
  }

  const config = new DocumentBuilder()
    .setTitle('API Finance-k')
    // .setDescription('The cats API description')
    .setVersion('1.0')
    // .addTag('cats')
    // .addBearerAuth()
    .addServer('http://localhost:3000', 'Local development server')
    .addServer('http://94.228.117.48/api', 'Production server')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(3000);
}
bootstrap();
