import { ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloDriver } from '@nestjs/apollo/dist/drivers';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        PassportModule,
        UserModule,
        AuthModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            playground: true,
            typePaths: ['./**/*.graphql'],
            cors: {
                origin: 'http://localhost:3000',
                credentials: true,
                methods: 'GET, HEAD, POST, PUT',
            },
        }),
    ],
    controllers: [AppController],
    providers: [
        AppService
    ],
})
export class AppModule { }
