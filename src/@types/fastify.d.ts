import fastify from 'fastify'

declare module 'fastify' {
  export interface FastifyRequest {
    user?: {
      subject: string
      role: 'student' | 'manager'
    }
  }
}
