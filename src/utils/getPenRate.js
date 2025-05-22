import axios from "axios"

const getPenRate = async()=> {
  const response = await axios.get(
    'https://api.exchangerate-api.com/v4/latest/USD'
  )
  const usdToPenRate = response.data.rates.PEN
  return usdToPenRate
}
export default getPenRate
