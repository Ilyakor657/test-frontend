import React, { useState } from 'react';
import { Form, Input } from 'antd';
import InputMask from 'react-input-mask';

const FormIndividuals = () => {
  const [innError, setInnError] = useState(false)
  const [ogrnError, setOgrnError] = useState(false)
  const [orgInnError, setOrgInnError] = useState(false)
  const [kppError, setKppError] = useState(false)

  return (
    <>
      <span className='title-one-in-form'>Данные руководителя</span>

      <div className='full-name'>
        <Form.Item
          label="Фамилия"
          name="surnameLegal"
          rules={[
            {
              required: true,
              message: 'Укажите фамилию',
            }
          ]}
        >
          <Input autoComplete="off" />
        </Form.Item>

        <Form.Item
          label="Имя"
          name="nameLegal"
          rules={[
            {
              required: true,
              message: 'Укажите имя',
            }
          ]}
        >
          <Input autoComplete="off" />
        </Form.Item>

        <Form.Item
          label="Отчество"
          name="patronymicLegal"
          rules={[
            {
              required: true,
              message: 'Укажите отчество',
            }
          ]}
        >
          <Input autoComplete="off" />
        </Form.Item>
      </div>

      <Form.Item
        label="ИНН"
        name="innLegal"
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
        />
      </Form.Item>

      <span className='title-one-in-form'>Данные организации</span>

      <div className='organization'>
        <Form.Item
          label="Название организации"
          name="nameOrganization"
          rules={[
            {
              required: true,
              message: 'Укажите название',
            }
          ]}
        >
          <Input autoComplete="off" />
        </Form.Item>

        <Form.Item
          label="ОГРН"
          name="ogrn"
          rules={[
            {
              validator: (_, value) => {
                if(!(value.length < 25 || value === "")) {
                  setOgrnError(false)
                  return Promise.resolve()
                } else {
                  setOgrnError(true)
                  return Promise.reject(new Error("Укажите ОГРН"))
                }
              }
            }
          ]}
          initialValue={""}
        >
          <InputMask 
            autoComplete="off"
            type="tel"
            mask='9 9 9 9 9 9 9 9 9 9 9 9 9'
            maskChar={null}
            className={`ant-input${ogrnError ? ' ant-input-status-error' : ''}`}
            placeholder='X X X X X X X X X X X X X'
          />
        </Form.Item>

        <Form.Item
          label="ИНН"
          name="orgInn"
          rules={[
            {
              validator: (_, value) => {
                if(!(value.length < 19 || value === "")) {
                  setOrgInnError(false)
                  return Promise.resolve()
                } else {
                  setOrgInnError(true)
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
            className={`ant-input${orgInnError ? ' ant-input-status-error' : ''}`}
            placeholder='X X X X X X X X X X'
          />
        </Form.Item>

        <Form.Item
          label="КПП"
          name="kpp"
          rules={[
            {
              validator: (_, value) => {
                if(!(value.length < 17 || value === "")) {
                  setKppError(false)
                  return Promise.resolve()
                } else {
                  setKppError(true)
                  return Promise.reject(new Error("Укажите КПП"))
                }
              }
            }
          ]}
          initialValue={""}
        >
          <InputMask 
            autoComplete="off"
            type="tel"
            mask='9 9 9 9 9 9 9 9 9'
            maskChar={null}
            className={`ant-input${kppError ? ' ant-input-status-error' : ''}`}
            placeholder='X X X X X X X X X'
          />
        </Form.Item>

        <span className='title-two-in-form'>Адрес организации</span>

        <div className='address'>
          <Form.Item
            label="Регион"
            name="region"
            rules={[
              {
                required: true,
                message: 'Укажите регион',
              }
            ]}
          >
            <Input autoComplete="off" />
          </Form.Item>

          <Form.Item
            label="Город"
            name="city"
            rules={[
              {
                required: true,
                message: 'Укажите город',
              }
            ]}
          >
            <Input autoComplete="off" />
          </Form.Item>

          <Form.Item
            label="Улица"
            name="street"
            rules={[
              {
                required: true,
                message: 'Укажите улицу',
              }
            ]}
          >
            <Input autoComplete="off" />
          </Form.Item>
          
          <Form.Item
            label="Дом"
            name="house"
            rules={[
              {
                required: true,
                message: 'Укажите дом',
              }
            ]}
          >
            <Input type='number' autoComplete="off" />
          </Form.Item>
        </div>
      </div>
    </>
  );
};

export default FormIndividuals;