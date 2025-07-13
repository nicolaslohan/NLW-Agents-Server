import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schema/index.ts'
import { eq, count } from 'drizzle-orm'

export const getRoomsRoute: FastifyPluginCallbackZod = (app) => {
    app.get('/rooms', async () => {
        const results = await db
            .select({
                id: schema.rooms.id,
                name: schema.rooms.name,
                created_at: schema.rooms.created_at,
                questionsCount: count(schema.questions.id)
            })
            .from(schema.rooms)
            .leftJoin(schema.questions, eq(schema.rooms.id, schema.questions.roomId))
            .groupBy(schema.rooms.id, schema.rooms.name)
            .orderBy(schema.rooms.created_at)

        return results
    })
}