import dayjs from 'dayjs'
import { dateException } from './dateService'

function capitalization(amount, period, dateOpen, rate) {
  let percent = 0
  let dateLast
  let dateNow = dateOpen
  for (let i = 0; i < period; i++) {
    dateLast = dateNow
    dateNow = dateException(dayjs(dateLast, 'DD.MM.YYYY').add(1, 'month'))
    let dayInYear = dayjs(`${dateNow.split('.')[2]}-12-31`).diff(`${dateNow.split('.')[2]}-01-01`, 'day')
    let differenceDay = dayjs(dateNow.split('.').reverse().join('-')).diff(dateLast.split('.').reverse().join('-'), 'day')
    let percentMonth = (((amount*(rate/100))/(dayInYear + 1))*differenceDay)
    percent = (percent + percentMonth)
  }
  return percent.toFixed(2).split('.').join(',')
}

export default capitalization