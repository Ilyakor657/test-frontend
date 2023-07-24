import dayjs from 'dayjs'
import { dateException } from './dateService'

function monthlyPayment(amount, period, dateOpen) {
  let payments = []
  const rateMonth = process.env.REACT_APP_LOAN_RATE/(100*12)
  let key = 0
  let number = 0
  let dateLast
  let dateNow = dateOpen
  let balance = amount.toFixed(2)
  let amountPayment = (amount*(
    (rateMonth*Math.pow((1 + rateMonth), period))/
    (Math.pow((1 + rateMonth), period) - 1))
  ).toFixed(2)
  for (let i = 0; i < period; i++) {
    let payment = {}
    let percent = 0
    let debt = 0
    key++
    number++
    dateLast = dateNow
    dateNow = dateException(dayjs(dateLast, 'DD.MM.YYYY').add(1, 'month'))
    if (
      dayjs(`${dateNow.split('.')[2]}-12-31`).diff(`${dateNow.split('.')[2]}-01-01`, 'day') !== 
      dayjs(`${dateLast.split('.')[2]}-12-31`).diff(`${dateLast.split('.')[2]}-01-01`, 'day')
    ) {
      let dayInYear1 = dayjs(`${dateLast.split('.')[2]}-12-31`).diff(`${dateLast.split('.')[2]}-01-01`, 'day')
      let differenceDay1 = dayjs(`${dayjs(dateLast, 'DD.MM.YYYY').get('year')}-12-31`).diff(dateLast.split('.').reverse().join('-'), 'day')
      let percent1 = (((balance*(process.env.REACT_APP_LOAN_RATE/100))/(dayInYear1 + 1))*differenceDay1).toFixed(2)
      let dayInYear2 = dayjs(`${dateNow.split('.')[2]}-12-31`).diff(`${dateNow.split('.')[2]}-01-01`, 'day')
      let differenceDay2 = dayjs(dateNow.split('.').reverse().join('-')).diff(`${dayjs(dateNow, 'DD.MM.YYYY').get('year')}-01-01`, 'day')
      let percent2 = (((balance*(process.env.REACT_APP_LOAN_RATE/100))/(dayInYear2 + 1))*(differenceDay2 + 1)).toFixed(2)
      percent = (JSON.parse(percent1) + JSON.parse(percent2)).toFixed(2)
    } else {
      let dayInYear = dayjs(`${dateNow.split('.')[2]}-12-31`).diff(`${dateNow.split('.')[2]}-01-01`, 'day')
      let differenceDay = dayjs(dateNow.split('.').reverse().join('-')).diff(dateLast.split('.').reverse().join('-'), 'day')
      percent = (((balance*(process.env.REACT_APP_LOAN_RATE/100))/(dayInYear + 1))*differenceDay).toFixed(2)
    }
    if (i === (period - 1)) {
      amountPayment = (JSON.parse(balance) + JSON.parse(percent)).toFixed(2)
      debt = balance
    } else {
      debt = (amountPayment - percent).toFixed(2)
      balance = (balance - debt).toFixed(2)
    }
    payment = {
      key,
      number,
      date: dateNow,
      amountPayment: amountPayment.split('.').join(','),
      percent: percent.split('.').join(','),
      debt: debt.split('.').join(',')
    }
    payments.push(payment)
  }
  return payments
}

export default monthlyPayment;