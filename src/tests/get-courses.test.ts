import { test, expect } from 'vitest'
import request from 'supertest'
import { randomUUID } from 'node:crypto'

import { server } from '../app.ts'
import { makeCourse } from './factories/make-course.ts'

test('get all courses', async () => {
  await server.ready()

  const titleId = randomUUID()

  await makeCourse(titleId)

  const response = await request(server.server).get(
    `/courses?search=${titleId}`,
  )

  expect(response.status).toBe(200)
  expect(response.body).toEqual({
    total: 1,
    courses: [
      {
        id: expect.any(String),
        title: titleId,
        enrollments: 0,
      },
    ],
  })
})

// TODO: add test for pagination, LeftJoin, orderBy.
