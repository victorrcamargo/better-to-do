import { HttpException, HttpStatus } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
    constructor(private readonly userService: UserService) { }

    @Mutation('createUser')
    create(@Args('createUserInput') createUserInput: CreateUserInput) {
        try {
            return this.userService.create(createUserInput);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Query('userByMail')
    getByMail(@Args('email') email: string) {
        try {
            const findUser = this.userService.findByEmail(email);
            return findUser;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
