import { pgTable, text, timestamp, uuid, vector } from 'drizzle-orm/pg-core'
import { rooms } from './rooms.ts'

export const audioChunks = pgTable('audio_chunks', {
    id: uuid().primaryKey().defaultRandom(),
    roomId: uuid().references(() => rooms.id).notNull(),
    text: text().notNull(),
    embbedings: vector({ dimensions: 768 }).notNull(),
    created_at: timestamp().defaultNow().notNull()
})