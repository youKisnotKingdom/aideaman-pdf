import { persistentAtom } from '@nanostores/persistent'

export const filePath = persistentAtom('これよこれ', '', {
    encode: JSON.stringify,
    decode: JSON.parse,
})