import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  email: text().notNull().unique(),
})

export const courses = pgTable('courses', {
  id: uuid().primaryKey().defaultRandom(),
  title: text().notNull().unique(),
  description: text(),
})

// Relation N-N between users and courses, so need a pivot table:
export const enrollments = pgTable('enrollments', {
  userId: uuid()
    .notNull()
    .references(() => users.id),
  courseId: uuid()
    .notNull()
    .references(() => courses.id),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
})
