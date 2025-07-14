import { reset, seed } from 'drizzle-seed'
import { db, sql } from './connection.ts'
import { rooms } from './schema/rooms.ts'

const schema = { rooms }

await reset(db, schema)

await seed(db, schema).refine(f => {
    return {
        rooms: {
            count: 5,
            columns: {
                name: f.companyName(),
                description: f.loremIpsum(),
            },
        }
    }
})

await sql.end()


// biome-ignore lint/suspicious/noConsole: only used in dev mode
console.log('Database seeded successfully!')