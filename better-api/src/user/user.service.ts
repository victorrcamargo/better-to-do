import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UserService {
    private readonly prisma;

    constructor() {
        this.prisma = new PrismaClient;
    }

    /**
     * This function will create a new user
     * @param createUserInput 
     * @returns 
     */
    async create(createUserInput: CreateUserInput) {
        try {
            const user = await this.prisma.user.create({
                data: {
                    name: createUserInput.name,
                    email: createUserInput.email,
                    password: bcrypt.hashSync(createUserInput.password, bcrypt.genSaltSync(10)),
                }
            });

            return user;
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * This function will return a user by email
     * @param email 
     * @returns 
     */
    async findByEmail(email: string) {
        try {
            const mail = await this.prisma.user.findFirstOrThrow({
                where: {
                    email,
                }
            })
            console.log(mail)
            return mail;
        } catch (error) {
            throw new Error(error);
        }
    }
}
