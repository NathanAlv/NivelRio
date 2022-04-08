import { writeFileSync } from 'fs'
import { RiverReading } from '../models/RiverReading'

export const saveToCsvFile = (readings: RiverReading[], fileName: string) => {
  let csvContent = 'Cod. Estação,Rio,Data/Hora,Nível,Vazão,Chuva,\n'
  readings.forEach((r) => {
    var timestamp= `${r.dateTime.toLocaleDateString()}  ${r.dateTime.toLocaleTimeString()}`
    const line = `${r.stationCode},${r.riverName},${timestamp},${r.level}, ${r.flow}, ${r.rain}\n`
    csvContent = `${csvContent}${line}`
  
  })

  readings=readings.reverse()

  writeFileSync(fileName, csvContent)
}
