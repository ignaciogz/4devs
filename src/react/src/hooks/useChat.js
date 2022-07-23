import { schema } from 'normalizr'

const useChat = () => {
  // ↓ ****** START - NORMALIZE SCHEMAS ****** ↓
  const authorsSchema = new schema.Entity('authors', undefined, { idAttribute: 'email' })

  const messagesSchema = new schema.Entity('messages', {
    author: authorsSchema,
  })

  const chatSchema = new schema.Entity('chatSchema', {
    chat: [messagesSchema],
  })
  // ↑ ****** END - NORMALIZE SCHEMAS ****** ↑

  return {
    chatSchema,
  }
}

export default useChat
