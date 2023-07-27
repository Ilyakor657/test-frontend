import React, { useState } from 'react';
import { Form, Input, DatePicker } from 'antd';
import InputMask from 'react-input-mask';
import { dateString } from '../../service/dateService';
import 'dayjs/locale/ru';
import locale from 'antd/es/date-picker/locale/ru_RU';

const FormIndividuals = (props) => {
  const [innError, setInnError] = useState(false)
  const [serialError, setSerialError] = useState(false)
  const [numberError, setNumberError] = useState(false)

  return (
    <>
      <div className='full-name'>
        <Form.Item
          label="Фамилия"
          name="surnameIndividuals"
          rules={[
            {
              required: true,
              message: 'Укажите фамилию',
            },
            {
              validator: (_, value) =>
                !value.includes(" ")
                  ? Promise.resolve()
                  : Promise.reject(new Error("Поле не должно содержать пробелы"))
            }
          ]}
          initialValue=""
        >
          <Input 
            autoComplete="off" 
            onChange={e => props.setSurnameIndividuals(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Имя"
          name="nameIndividuals"
          rules={[
            {
              required: true,
              message: 'Укажите имя',
            },
            {
              validator: (_, value) =>
                !value.includes(" ")
                  ? Promise.resolve()
                  : Promise.reject(new Error("Поле не должно содержать пробелы"))
            }
          ]}
          initialValue=""
        >
          <Input 
            autoComplete="off" 
            onChange={e => props.setNameIndividuals(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Отчество"
          name="patronymicIndividuals"
          rules={[
            {
              required: true,
              message: 'Укажите отчество',
            },
            {
              validator: (_, value) =>
                !value.includes(" ")
                  ? Promise.resolve()
                  : Promise.reject(new Error("Поле не должно содержать пробелы"))
            }
          ]}
          initialValue=""
        >
          <Input 
            autoComplete="off" 
            onChange={e => props.setPatronymicIndividuals(e.target.value)}
          />
        </Form.Item>
      </div>

      <Form.Item
        label="Дата рождения"
        name="dateBirth"
        rules={[
          {
            required: true,
            message: 'Укажите дату рождения',
          }
        ]}
      >
        <DatePicker 
          placeholder='Выберите дату' 
          format={'DD.MM.YYYY'} 
          onChange={date => props.setDateBirth(dateString(date))}
          locale={locale}
        />
      </Form.Item>

      <Form.Item
        label="ИНН"
        name="innIndividuals"
        rules={[
          {
            validator: (_, value) => {
              if(!(value.length < 23 || value === "")) {
                setInnError(false)
                return Promise.resolve()
              } else {
                setInnError(true)
                return Promise.reject(new Error("Укажите ИНН"))
              }
            }
          }
        ]}
        initialValue={""}
      >
        <InputMask 
          autoComplete="off"
          type="tel"
          mask='9 9 9 9 9 9 9 9 9 9 9 9'
          maskChar={null}
          className={`ant-input${innError ? ' ant-input-status-error' : ''}`}
          placeholder='X X X X X X X X X X X X'
          onChange={e => props.setInnIndividuals(e.target.value.replace(/ /g,''))}
        />
      </Form.Item>

      <span className='title-one-in-form'>Паспортные данные</span>

      <div className='passport-data'>
        <Form.Item
          label="Серия"
          name="serial"
          rules={[
            {
              validator: (_, value) => {
                if(!(value.length < 5 || value === "")) {
                  setSerialError(false)
                  return Promise.resolve()
                } else {
                  setSerialError(true)
                  return Promise.reject(new Error("Укажите серию"))
                }
              }
            }
          ]}
          initialValue={""}
        >
          <InputMask 
            autoComplete="off"
            type="tel"
            mask='99 99'
            maskChar={null}
            className={`ant-input${serialError ? ' ant-input-status-error' : ''}`}
            placeholder='XX XX'
            onChange={e => props.setSerial(e.target.value.replace(/ /g,''))}
          />
        </Form.Item>

        <Form.Item
          label="Номер"
          name="number"
          rules={[
            {
              validator: (_, value) => {
                if(!(value.length < 6 || value === "")) {
                  setNumberError(false)
                  return Promise.resolve()
                } else {
                  setNumberError(true)
                  return Promise.reject(new Error("Укажите номер"))
                }
              }
            }
          ]}
          initialValue={""}
        >
          <InputMask 
            autoComplete="off"
            type="tel"
            mask='999999'
            maskChar={null}
            className={`ant-input${numberError ? ' ant-input-status-error' : ''}`}
            placeholder='XXXXXX'
            onChange={e => props.setNumber(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Дата выдачи"
          name="dateIssue"
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
            onChange={date => props.setDateIssue(dateString(date))}
            locale={locale}
          />
        </Form.Item>
      </div>
    </>
  );
};

export default FormIndividuals;