import axios from 'axios'

export default async function fetchDataIfNotEmpty (url) {
  if (!url || typeof url !== 'string') {
    console.error('Invalid URL:', url)
    return {}
  }

  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    return {}
  }
}
