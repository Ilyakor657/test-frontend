import React, { useState } from 'react';
import { Form, Input, Select } from 'antd';
import InputMask from 'react-input-mask';

const FormIndividuals = (props) => {
  const [innError, setInnError] = useState(false)
  const [ogrnError, setOgrnError] = useState(false)
  const [orgInnError, setOrgInnError] = useState(false)
  const [kppError, setKppError] = useState(false)
  const [innSelect, setInnSelect] = useState()

  const handleChange = (value) => {
    props.setAbbreviation(value)
    setInnSelect('success')
    props.innClear()
  };

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
            onChange={e => props.setSurnameLegal(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Имя"
          name="nameLegal"
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
            onChange={e => props.setNameLegal(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Отчество"
          name="patronymicLegal"
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
            onChange={e => props.setPatronymicLegal(e.target.value)}
          />
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
          onChange={e => props.setInnLegal(e.target.value.replace(/ /g,''))}
        />
      </Form.Item>

      <span className='title-one-in-form'>Данные организации</span>

      <div className='organization'>
        <div className='name-organization'>
          <Form.Item 
            label=" "
            name="abbreviation"
            validateStatus={innSelect}
            rules={[
              {
                required: true,
                message: '',
              }
            ]}
          >
            <Select onChange={handleChange}>
              <Select.Option value="ip">ИП</Select.Option>
              <Select.Option value="legal">ЮЛ</Select.Option>
            </Select>
          </Form.Item>
  
          <Form.Item
            label="Название организации"
            name="nameOrg"
            rules={[
              {
                required: true,
                message: 'Укажите название',
              }
            ]}
          >
            <Input 
              autoComplete="off" 
              onChange={e => props.setNameOrg(e.target.value)}
            />
          </Form.Item>
        </div>

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
            onChange={e => props.setOgrn(e.target.value.replace(/ /g,''))}
          />
        </Form.Item>

        <Form.Item
          label="ИНН"
          name="innOrg"
          rules={[
            {
              validator: (_, value) => {
                if(props.abbreviation === 'ip' ? !(value.length < 23 || value === "") : !(value.length < 19 || value === "")) {
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
          onClick={() => {props.abbreviation !== "" ? '' : setInnSelect('error')}}
        >
          <InputMask 
            autoComplete="off"
            type="tel"
            mask={props.abbreviation === 'ip' ? '9 9 9 9 9 9 9 9 9 9 9 9' : '9 9 9 9 9 9 9 9 9 9'}
            maskChar={null}
            className={`ant-input${orgInnError ? ' ant-input-status-error' : ''}`}
            placeholder={props.abbreviation === "" ? "" : `${props.abbreviation === 'ip' ? 'X X X X X X X X X X X X' : 'X X X X X X X X X X'}`}
            onChange={e => props.setInnOrg(e.target.value.replace(/ /g,''))}
            disabled={props.abbreviation === ""}
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
            onChange={e => props.setKpp(e.target.value.replace(/ /g,''))}
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
            <Input 
              autoComplete="off" 
              onChange={e => props.setRegion(e.target.value)}
            />
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
            <Input 
              autoComplete="off" 
              onChange={e => props.setCity(e.target.value)}
            />
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
            <Input 
              autoComplete="off" 
              onChange={e => props.setStreet(e.target.value)}
            />
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
            <Input 
              type='number' 
              autoComplete="off" 
              onChange={e => props.setHouse(e.target.value)}
            />
          </Form.Item>
        </div>
      </div>
    </>
  );
};

export default FormIndividuals;