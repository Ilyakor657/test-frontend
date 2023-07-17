import React from 'react';
import dayjs from 'dayjs';
import { Form, Input, DatePicker } from 'antd';
import blackArrow from '../public/images/black-arrow.svg'

const FormIndividuals = () => {
  return (
    <>
      <div className='date'>
        <Form.Item
          label="Дата открытия"
          name="dateOpen"
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
            disabledDate={(current) => current < dayjs().startOf('day')}
          />
        </Form.Item>

        <img className='black-arrow' src={blackArrow} alt='img'/>

        <Form.Item
          label="Дата закрытия"
          name="dateClose"
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
            disabledDate={(current) => current < dayjs().endOf('day')}
          />
        </Form.Item>
      </div>

      
    </>
  );
};

export default FormIndividuals;