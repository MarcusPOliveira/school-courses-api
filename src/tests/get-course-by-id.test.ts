import { test, expect } from 'vitest'
import request from 'supertest'

import { server } from '../app.ts'
import { makeCourse } from './factories/make-course.ts'

test('get a course by id', async () => {
  await server.ready()

  const course = await makeCourse()

  const response = await request(server.server).get(`/courses/${course.id}`)

  expect(response.status).toBe(200)
  expect(response.body).toEqual({
    course: {
      id: expect.any(String),
      title: expect.any(String),
      description: null,
    },
  })
})

test('return 404 status for non existing courses', async () => {
  await server.ready()

  const response = await request(server.server).get(
    '/courses/dd7f75a4-0c98-47ca-b497-57dd028b473b',
  )

  expect(response.status).toBe(404)
})
