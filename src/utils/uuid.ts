import { customAlphabet } from 'nanoid'

export const genUUID = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyj!@#$%^&*', 16)
