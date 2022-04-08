import { RiverReading } from './models/RiverReading'
import { fetchRiverReadingData } from './services/river_reading_service'
import { saveToCsvFile } from './utils/file_utils'


import moment from 'moment'

const getRiverReadingList= async (
  rivers:any,
  initialDate: Date,
  finalDate: Date
  ) => {

    var riverReadingList= []
    for (let river of rivers){
      const readings: RiverReading[] = await fetchRiverReadingData(
    river.stationCode,
    river.riverName,
    initialDate,
    finalDate
    )

    riverReadingList.push(readings)
  }
  return riverReadingList.flat() 
}

const generateRiverDataFiles = async (
 readings: RiverReading[]
) => {
  saveToCsvFile(readings, 'leituras.csv')
  console.log('Mal feito desfeito')
}

const mainFunction= async () =>{
  let lastWeek= moment().subtract(1, 'week').toDate();
  let today= moment().toDate();

 let readings= await getRiverReadingList(rivers, lastWeek, today);
 console.log(readings)
 generateRiverDataFiles(readings);
}

var rivers = [
  {
    stationCode:'66945000',
    riverName: 'Rio Aquidauana'
  },

  {
    stationCode:'66870000',
    riverName: 'Rio Taquari'
  },

  {
    stationCode:'66825000',
    riverName: 'Rio Paraguai'
  },

  {
    stationCode:'66900000',
    riverName: 'Rio Miranda'
  },

  {
    stationCode:'63970000',
    riverName: 'Rio Pardo'
  }
];

mainFunction();
