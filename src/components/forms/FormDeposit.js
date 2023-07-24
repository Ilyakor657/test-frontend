import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Form, DatePicker, InputNumber } from 'antd';
import InputMask from 'react-input-mask';
import blackArrow from '../public/images/black-arrow.svg'
import { dateString } from '../../service/dateService';

const FormDeposit = (props) => {
  const [periodError, setPeriodError] = useState(false)
  const [rateError, setRateError] = useState(false)

  return (
    <>
      <div className='date'>
        <div className='date-open'>
          <Form.Item
            label="Дата открытия"
            name="dateOpenDeposit"
            rules={[
              { 
                required: true, 
                message: 'Укажите дату' 
              }
            ]}
          >
            <DatePicker 
              placeholder='Выберите дату' 
              format={'DD.MM.YYYY'}
              disabledDate={(current) => 
                (current.get('date') <= 8 && current.get('month') === 0) ||
                (current.get('date') === 23 && current.get('month') === 1) ||
                (current.get('date') === 8 && current.get('month') === 2) ||
                (current.get('date') === 1 && current.get('month') === 4) ||
                (current.get('date') === 9 && current.get('month') === 4) ||
                (current.get('date') === 12 && current.get('month') === 5) ||
                (current.get('date') === 4 && current.get('month') === 10) ||
                current < dayjs().startOf('day')
              }
              onChange={date => props.setDateOpenDeposit(dateString(date))}
            />
          </Form.Item>
  
          <Form.Item
            label="Срок (в месяцах)"
            name="periodDeposit"
            rules={[
              {
                validator: (_, value) => {
                  if(!(value === "")) {
                    setPeriodError(false)
                    return Promise.resolve()
                  } else {
                    setPeriodError(true)
                    return Promise.reject(new Error("Укажите срок"))
                  }
                }
              }
            ]}
            initialValue={""}
          >
            <InputMask 
              autoComplete="off"
              type="number"
              maskChar={null}
              className={`ant-input${periodError ? ' ant-input-status-error' : ''}`}
              onChange={e => props.setPeriodDeposit(e.target.value.replace(/ /g,''))}
            />
          </Form.Item>
        </div>

        <img className='black-arrow' src={blackArrow} alt='img'/>

        <div className='date-close-rate'>
          <Form.Item
            label="Дата закрытия"
            name="dateCloseDeposit"
          >
            <DatePicker 
              placeholder='' 
              format={'DD.MM.YYYY'}
              suffixIcon={false}
              disabled={true}
              onChange={date => props.setDateCloseDeposit(date)}
            />
          </Form.Item>
  
          <Form.Item
            label="Ставка"
            name="rate"
            rules={[
              {
                validator: (_, value) => {
                  if(!(value.length < 23 || value === "")) {
                    setRateError(false)
                    return Promise.resolve()
                  } else {
                    setRateError(true)
                    return Promise.reject(new Error(""))
                  }
                }
              }
            ]}
            initialValue={""}
          >
            <InputMask 
              autoComplete="off"
              type="tel"
              mask='999'
              maskChar={null}
              className={`ant-input${rateError ? ' ant-input-status-error' : ''}`}
              onChange={e => props.setRateDeposit(e.target.value)}
            />
          </Form.Item>
          <span className='symbol-percent'>%</span>
        </div>
      </div>

      <Form.Item
        label="Сумма вклада"
        name="amountDeposit"
        rules={[
          { 
            required: true, 
            message: 'Укажите сумму' 
          }
        ]}
        initialValue={""}
      >
        <InputNumber 
          formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
          controls={false}
          onChange={value => props.setAmountDeposit(value)}
          autoComplete="off"
        />
      </Form.Item>
    </>
  );
};

export default FormDeposit;