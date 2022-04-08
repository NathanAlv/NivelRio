import axios from 'axios'
import { parseStringPromise } from 'xml2js'
import { find } from 'xml2js-xpath'

import { RiverReading } from '../models/RiverReading'
import { API_URL } from '../config/api'
import { toDateString } from '../utils/date_utils'

export const fetchRiverReadingData = async (
  stationCode: string,
  riverName: string,
  initialDate: Date,
  finalDate: Date
) => {
  
  let readings: RiverReading[] = []

  const url = API_URL.replace('STATION_CODE', stationCode)
    .replace('INITIAL_DATE', toDateString(initialDate))
    .replace('FINAL_DATE', toDateString(finalDate))

  console.log(url)

  const response = await axios.get(url)

  const jsonObj = await parseStringPromise(response.data)

  const results = find(jsonObj, '//DadosHidrometereologicos')
  if (results) {
    results.forEach((r) => {
      const stationCode = r.CodEstacao[0]
      const level = parseFloat(r.Nivel[0]) || 0
      const flow = parseFloat(r.Vazao[0]) || 0
      const rain = parseFloat(r.Chuva[0])|| 0
      const dateTime = new Date(r.DataHora[0].trim())

      const reading: RiverReading = {
        stationCode,
        riverName,
        level,
        flow,
        rain,
        dateTime,
      }

      readings.push(reading)
    })
  }
  return readings
}
