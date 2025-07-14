import 'dotenv/config'
import { db, sql } from './connection.ts'
import { audioChunks } from './schema/audio-chunks.ts'
import { generateEmbbedings } from '../services/gemini.ts'

const roomId = '6147f866-1e94-49e6-8119-e116b63d0c20'

const chunks = [
    'JavaScript é uma linguagem de programação interpretada, muito utilizada no desenvolvimento web.',
    'Com JavaScript é possível manipular o DOM e criar interfaces dinâmicas.',
    'O JavaScript moderno suporta recursos como async/await e módulos ES6.',
    'Frameworks populares como React, Vue e Angular utilizam JavaScript como base.',
    'JavaScript pode ser executado tanto no navegador quanto no servidor com Node.js.'
]

for (const text of chunks) {
    const embbedings = await generateEmbbedings(text)
    await db.insert(audioChunks).values({
        roomId,
        text,
        embbedings
    })
}

await sql.end()

console.log('Audio chunks com embeddings inseridos manualmente com sucesso!')