import axios from 'axios'
import { BUS_ENDPOINT } from '../settings'

const getBusArrivals = async (busStopCode: string, serviceNo: string) => {
  return axios.get(
    `${BUS_ENDPOINT}/bus-arrivals?busStopCode=${busStopCode}&serviceNo=${serviceNo}`
  )
}

export { getBusArrivals as default }
