import { Magic } from 'magic-sdk'

export default function ({ $config: { magicApiSecret, baseURL } }, inject) {
  const createMagic = (key) => {
    return typeof window !== 'undefined' && new Magic(key)
  }

  const magic = createMagic(magicApiSecret)
  inject('magic', magic)
}
