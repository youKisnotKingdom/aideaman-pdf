import { persistentAtom } from '@nanostores/persistent'

export const filePath = persistentAtom('filePath', '', {
    encode: JSON.stringify,
    decode: JSON.parse,
})