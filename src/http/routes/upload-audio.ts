import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { schema } from '../../db/schema/index.ts'
import { db } from '../../db/connection.ts'
import { generateEmbbedings, transcribeAudio } from '../../services/gemini.ts'

export const uploadAudioRoute: FastifyPluginCallbackZod = (app) => {

    app.post('/room/:roomId/audio', {
        schema: {
            params: z.object({
                roomId: z.string()
            })
        }
    },
        async (request, reply) => {
            const { roomId } = request.params
            const audio = await request.file()

            if (!audio) {
                throw new Error('No audio file provided.')
            }

            const audioBuffer = await audio.toBuffer()
            const audioAsBase64 = audioBuffer.toString('base64')

            // 1. Transcrever o áudio
            const transcription = await transcribeAudio(audioAsBase64, audio.mimetype)
            // 2. Gerar vetor semântico - embbedings
            const embbedings = await generateEmbbedings(transcription)
            // 3. Armazenar vetores no banco de dados
            const result = await db.insert(schema.audioChunks).values({
                roomId,
                text: transcription,
                embbedings
            }).returning({
                id: schema.audioChunks.id
            })

            const insertedAudioChunk = result[0]

            if (!insertedAudioChunk) {
                throw new Error('Failed to create new audio chunk.')
            }

            return reply.status(201).send({
                audioChunkId: insertedAudioChunk.id
            })

        })
}