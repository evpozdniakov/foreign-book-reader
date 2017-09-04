import md5 from 'md5'

export function getRandomHash(length=10) {
  const now = new Date()
  const hash = md5(now)

  return hash.substr(0, length)
}
