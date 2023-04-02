import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: true });
	app.use(cookieParser());

	app.enableCors({
		origin: 'http://localhost:3000',
		credentials: true,
		methods: 'GET, HEAD, POST, PUT',
	});

	await app.listen(3000);
}
bootstrap();
