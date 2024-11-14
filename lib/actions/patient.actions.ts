"use server"

import { ID, Query } from "node-appwrite"
import { users } from "../appwrite.config"

export const createUser = async (user: CreateUserParams) => {
    try {
        console.log('Antes de crear el usuario')
        const newUser = await users.create(
            ID.unique(),
            user.email,
            user.phone,
            undefined,
            user.name)
        console.log('Después de crear el usuario')
        console.log({ newUser });
        return newUser
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log(error);

        if (error && error?.code === 409) {
            const existingUser = await users.list([Query.equal('email', [user.email])])
            return existingUser?.users[0]
        }
    }
}