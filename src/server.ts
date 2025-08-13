import fastify from 'fastify'

const server = fastify()

const courses = [
  {
    id: 1,
    name: 'Node.js Basics',
  },
  {
    id: 2,
    name: 'Advanced JavaScript',
  },
  {
    id: 3,
    name: 'Web Development with React',
  },
]

server.get('/courses', async (request, reply) => {
  return courses
})

server.listen({ port: 3333 }).then(() => {
  console.log('Server is running on http://localhost:3333')
})
