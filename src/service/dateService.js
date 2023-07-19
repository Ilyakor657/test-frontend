import dayjs from 'dayjs';

function dateString(date) {
  let month
  let day
  if ((date.get('month') + 1) < 10) {
    month = `0${date.get('month') + 1}`
  } else {
    month = date.get('month') + 1
  }
  if (date.get('date') < 10) {
    day = `0${date.get('date')}`
  } else {
    day = date.get('date') 
  }
  const dateString = `${day}.${month}.${date.get('year')}`
  return dateString
}

function dateClose(dateOpen, period) {
  let dateClose = dayjs(dateOpen, 'DD.MM.YYYY').add(period, 'month')
  while (true) {
    let i = 0
    if (dateClose.get('date') <= 8 && dateClose.get('month') === 0) {
      dateClose = dayjs(`09.01.${dateClose.get('year')}`, 'DD.MM.YYYY')
      i = 1
    } else if (dateClose.get('date') === 23 && dateClose.get('month') === 1) {
      dateClose = dayjs(`24.02.${dateClose.get('year')}`, 'DD.MM.YYYY')
      i = 1
    } else if (dateClose.get('date') === 8 && dateClose.get('month') === 3) {
      dateClose = dayjs(`09.03.${dateClose.get('year')}`, 'DD.MM.YYYY')
      i = 1
    } else if (dateClose.get('date') === 1 && dateClose.get('month') === 4) {
      dateClose = dayjs(`02.05.${dateClose.get('year')}`, 'DD.MM.YYYY')
      i = 1
    } else if (dateClose.get('date') === 9 && dateClose.get('month') === 4) {
      dateClose = dayjs(`10.05.${dateClose.get('year')}`, 'DD.MM.YYYY')
      i = 1
    } else if (dateClose.get('date') === 12 && dateClose.get('month') === 5) {
      dateClose = dayjs(`13.06.${dateClose.get('year')}`, 'DD.MM.YYYY')
      i = 1
    } else if (dateClose.get('date') === 4 && dateClose.get('month') === 10) {
      dateClose = dayjs(`05.11.${dateClose.get('year')}`, 'DD.MM.YYYY')
      i = 1
    } else if (dateClose.get('day') === 0) {
      let month
      let day
      if ((dateClose.get('month') + 1) < 10) {
        month = `0${dateClose.get('month') + 1}`
      } else {
        month = dateClose.get('month') + 1
      }

      if (dateClose.get('date') < 9) {
        day = `0${dateClose.get('date') + 1}`
      } else if (dateClose.get('date') === 9) {
        day = 10
      } else {
        day = dateClose.get('date') + 1
      }
      dateClose = dayjs(`${day}.${month}.${dateClose.get('year')}`, 'DD.MM.YYYY')
      i = 1
    }
    if (i === 0) break
  }

  return dateString(dateClose)
}

export {dateClose, dateString}