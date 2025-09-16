import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { eq } from 'drizzle-orm'
import { verify } from 'argon2'

import { db } from '../database/client.ts'
import { users } from '../database/schema.ts'

export const loginRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    '/sessions',
    {
      schema: {
        tags: ['auth'],
        summary: 'Login',
        body: z.object({
          email: z.email('Email inválido'),
          password: z
            .string()
            .min(6, 'A senha deve ter no mínimo 6 caracteres'),
        }),
        // response: {
        //   201: z.object({

        //   }),
        // },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body

      const result = await db.select().from(users).where(eq(users.email, email))

      if (result.length === 0) {
        return reply.status(400).send({
          message: 'Credenciais inválidas',
        })
      }

      const user = result[0]

      const doesPasswordsMatch = await verify(user.password, password)

      if (!doesPasswordsMatch) {
        return reply.status(400).send({
          message: 'Credenciais inválidas',
        })
      }

      return reply.status(200).send({
        message: 'Ok',
      })
    },
  )
}
