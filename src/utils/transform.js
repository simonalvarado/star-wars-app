export default function transform (string) {
  const url = string
  const parts = url.split('/')
  const number = parts[parts.length - 2]
  return parseInt(number)
}
