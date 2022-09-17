import axios from 'axios'
import { BUS_ENDPOINT } from '../settings'

const getBusArrivals = async (busStopCode: string, serviceNo: string) => {
  const resp = await axios.get(
    `${BUS_ENDPOINT}/busarrivals?busStopCode=${busStopCode}&serviceNo=${serviceNo}`
  )
  return resp.data;
}

export { getBusArrivals as default }
