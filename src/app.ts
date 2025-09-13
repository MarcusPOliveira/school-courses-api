import fastify from 'fastify'
import {
  validatorCompiler,
  serializerCompiler,
  type ZodTypeProvider,
  jsonSchemaTransform,
} from 'fastify-type-provider-zod'
import { fastifySwagger } from '@fastify/swagger'
import scalarAPIReference from '@scalar/fastify-api-reference'

import { createCourseRoute } from './routes/create-course.ts'
import { getCourseByIdRoute } from './routes/get-course-by-id.ts'
import { getCoursesRoute } from './routes/get-courses.ts'

const server = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
}).withTypeProvider<ZodTypeProvider>()

if (process.env.NODE_ENV === 'development') {
  server.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'School API',
        description: 'API para gerenciar cursos',
        version: '1.0.0',
      },
    },
    transform: jsonSchemaTransform,
  })

  server.register(scalarAPIReference, {
    routePrefix: '/docs',
    configuration: {
      theme: 'kepler',
    },
  })
}

server.setSerializerCompiler(serializerCompiler)
server.setValidatorCompiler(validatorCompiler)

server.register(createCourseRoute)
server.register(getCourseByIdRoute)
server.register(getCoursesRoute)

export { server }
