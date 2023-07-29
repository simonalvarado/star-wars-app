export default function transform (string) {
  const url = string
  console.log('url', url)
  const parts = url.split('/')
  const number = parts[parts.length - 2]
  return parseInt(number)
}
