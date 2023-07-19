import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Form, DatePicker } from 'antd';
import InputMask from 'react-input-mask';
import blackArrow from '../public/images/black-arrow.svg'
import { dateString } from '../../service/dateService';

const FormCredit = (props) => {
  const [amountError, setAmountError] = useState(false)
  const [periodError, setPeriodError] = useState(false)

  return (
    <>
      <div className='date'>
        <div className='dateOpenCredit'>
          <Form.Item
            label="Дата открытия"
            name="dateOpenCredit"
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
              onChange={date => props.setDateOpenCredit(dateString(date))}
            />
          </Form.Item>
  
          <Form.Item
            label="Срок (в месяцах)"
            name="periodCredit"
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
              onChange={e => props.setPeriodCredit(e.target.value.replace(/ /g,''))}
            />
          </Form.Item>
        </div>

        <img className='black-arrow' src={blackArrow} alt='img'/>

        <Form.Item
          label="Дата закрытия"
          name="dateCloseCredit"
        >
          <DatePicker 
            placeholder='' 
            format={'DD.MM.YYYY'}
            suffixIcon={false}
            disabled={true}
            onChange={date => props.setDateCloseCredit(date)}
          />
        </Form.Item>
      </div>

      <Form.Item
        label="Сумма кредита"
        name="amountCredit"
        rules={[
          {
            validator: (_, value) => {
              if(!(value === "")) {
                setAmountError(false)
                return Promise.resolve()
              } else {
                setAmountError(true)
                return Promise.reject(new Error("Укажите сумму"))
              }
            }
          }
        ]}
        initialValue={""}
      >
        <InputMask 
          autoComplete="off"
          type="tel"
          mask='999 999 999'
          maskChar={null}
          className={`ant-input${amountError ? ' ant-input-status-error' : ''}`}
          onChange={e => props.setAmountCredit(e.target.value.replace(/ /g,''))}
        />
      </Form.Item>
    </>
  );
};

export default FormCredit;