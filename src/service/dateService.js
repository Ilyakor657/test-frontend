import dayjs from 'dayjs';

function dateString(date) {
  let month
  let day
  if ((date?.get('month') + 1) < 10) {
    month = `0${date?.get('month') + 1}`
  } else {
    month = date?.get('month') + 1
  }
  if (date?.get('date') < 10) {
    day = `0${date?.get('date')}`
  } else {
    day = date?.get('date') 
  }
  const dateString = `${day}.${month}.${date?.get('year')}`
  return dateString
}

function dateException(date) {
  let dateNew = date
  while (true) {
    let i = 0
    if (dateNew.get('date') <= 8 && dateNew.get('month') === 0) {
      dateNew = dayjs(`09.01.${dateNew.get('year')}`, 'DD.MM.YYYY')
      i = 1
    } else if (dateNew.get('date') === 23 && dateNew.get('month') === 1) {
      dateNew = dayjs(`24.02.${dateNew.get('year')}`, 'DD.MM.YYYY')
      i = 1
    } else if (dateNew.get('date') === 29 && dateNew.get('month') === 1) {
      dateNew = dayjs(`01.03.${dateNew.get('year')}`, 'DD.MM.YYYY')
      i = 1
    } else if (dateNew.get('date') === 8 && dateNew.get('month') === 3) {
      dateNew = dayjs(`09.03.${dateNew.get('year')}`, 'DD.MM.YYYY')
      i = 1
    } else if (dateNew.get('date') === 1 && dateNew.get('month') === 4) {
      dateNew = dayjs(`02.05.${dateNew.get('year')}`, 'DD.MM.YYYY')
      i = 1
    } else if (dateNew.get('date') === 9 && dateNew.get('month') === 4) {
      dateNew = dayjs(`10.05.${dateNew.get('year')}`, 'DD.MM.YYYY')
      i = 1
    } else if (dateNew.get('date') === 12 && dateNew.get('month') === 5) {
      dateNew = dayjs(`13.06.${dateNew.get('year')}`, 'DD.MM.YYYY')
      i = 1
    } else if (dateNew.get('date') === 4 && dateNew.get('month') === 10) {
      dateNew = dayjs(`05.11.${dateNew.get('year')}`, 'DD.MM.YYYY')
      i = 1
    } else if (dateNew.get('day') === 0) {
      let month
      let day
      if ((dateNew.get('month') + 1) < 10) {
        month = `0${dateNew.get('month') + 1}`
      } else {
        month = dateNew.get('month') + 1
      }

      if (dateNew.get('date') < 9) {
        day = `0${dateNew.get('date') + 1}`
      } else if (dateNew.get('date') === 9) {
        day = 10
      } else {
        day = dateNew.get('date') + 1
      }
      dateNew = dayjs(`${day}.${month}.${dateNew.get('year')}`, 'DD.MM.YYYY')
      i = 1
    }
    if (i === 0) break
  }
  return dateString(dateNew)
}

function dateClose(dateOpen, period) {
  let dateClose = null
  if (dateOpen !== null && period !== null) {
    dateClose = dateOpen
    for (let i = 0; i < period; i++) {
      dateClose = dateException(dayjs(dateClose, 'DD.MM.YYYY').add(1, 'month'))
    }
  }
  return dateClose
}

export {dateClose, dateString, dateException}