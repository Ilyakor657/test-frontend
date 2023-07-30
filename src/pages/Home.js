import React, { useState, useEffect } from "react";
import { Form, Button } from 'antd';
import HomeSwitch from '../components/home/HomeSwitch'
import FormIndividuals from '../components/forms/FormIndividuals'
import FormLegal from '../components/forms/FormLegal'
import FormLoan from '../components/forms/FormLoan'
import FormDeposit from '../components/forms/FormDeposit'
import dayjs from 'dayjs';
import { dateClose } from "../service/dateService";
import PaymentSchedule from "../components/home/PaymentSchedule";
import capitalization from "../service/capitalization";
import report from "../service/report";
import { sendApplication } from "../http/API"

function Home() {
  const [client, setClient] = useState(false)
  const [product, setProduct] = useState(true)
  const [loadingBtn, setLoadingBtn] = useState(false)
  const [periodCapitalization, setPeriodCapitalization] = useState("0")
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});

  useEffect(() => {
    forceUpdate({});
  }, []);

  const [surnameIndividuals, setSurnameIndividuals] = useState()
  const [nameIndividuals, setNameIndividuals] = useState()
  const [patronymicIndividuals, setPatronymicIndividuals] = useState()
  const [dateBirth, setDateBirth] = useState()
  const [innIndividuals, setInnIndividuals] = useState()
  const [serial, setSerial] = useState()
  const [number, setNumber] = useState()
  const [dateIssue, setDateIssue] = useState()

  const [surnameLegal, setSurnameLegal] = useState()
  const [nameLegal, setNameLegal] = useState()
  const [patronymicLegal, setPatronymicLegal] = useState()
  const [innLegal, setInnLegal] = useState()
  const [nameOrg, setNameOrg] = useState()
  const [ogrn, setOgrn] = useState()
  const [innOrg, setInnOrg] = useState()
  const [kpp, setKpp] = useState()
  const [region, setRegion] = useState()
  const [city, setCity] = useState()
  const [street, setStreet] = useState()
  const [house, setHouse] = useState()

  const [dateOpenLoan, setDateOpenLoan] = useState(null)
  const [dateCloseLoan, setDateCloseLoan] = useState(null)
  const [periodLoan, setPeriodLoan] = useState(null)
  const [amountLoan, setAmountLoan] = useState(null)

  const [dateOpenDeposit, setDateOpenDeposit] = useState(null)
  const [dateCloseDeposit, setDateCloseDeposit] = useState(null)
  const [periodDeposit, setPeriodDeposit] = useState(null)
  const [amountDeposit, setAmountDeposit] = useState(null)
  const [rateDeposit, setRateDeposit] = useState(null)

  useEffect(() => {
    if (periodLoan !== null && periodLoan !== "" && dateOpenLoan !== null) {
      const date = dateClose(dateOpenLoan, periodLoan)
      setDateCloseLoan(date)
      form.setFieldValue('dateCloseLoan', dayjs(date, 'DD.MM.YYYY'))
    } else {
      setDateCloseLoan(null)
      form.setFieldValue('dateCloseLoan', null)
    }
  }, [dateOpenLoan, periodLoan]);

  useEffect(() => {
    if (periodDeposit !== null && periodDeposit !== "" && dateOpenDeposit !== null) {
      const date = dateClose(dateOpenDeposit, periodDeposit)
      setDateCloseDeposit(date)
      form.setFieldValue('dateCloseDeposit', dayjs(date, 'DD.MM.YYYY'))
    } else {
      setDateCloseDeposit(null)
      form.setFieldValue('dateCloseDeposit', null)
    }
  }, [dateOpenDeposit, periodDeposit]);

  useEffect(() => {
    if (
      amountDeposit !== null && 
      periodDeposit !== null && 
      periodDeposit !== "" && 
      dateOpenDeposit !== null &&
      rateDeposit !== null &&
      rateDeposit !== ""
    ) {
      setPeriodCapitalization(capitalization(
        amountDeposit, 
        periodDeposit, 
        dateOpenDeposit, 
        rateDeposit
      ))
    } else {
      setPeriodCapitalization("0")
    }
  }, [dateOpenDeposit, periodDeposit, amountDeposit, rateDeposit]);

  let clientData
  if (client) {
    clientData = {
      type: 'legal',
      chief: {
        surnameLegal,
        nameLegal,
        patronymicLegal,
        innLegal,
      },
      org: {
        nameOrg,
        ogrn,
        innOrg,
        kpp,
        address: {
          region,
          city,
          street,
          house
        }
      }
    }
  } else {
    clientData = {
      type: 'individual',
      surnameIndividuals,
      nameIndividuals,
      patronymicIndividuals,
      dateBirth: dateBirth.split('.').reverse().join('-'),
      innIndividuals,
      passport: {
        serial,
        number,
        dateIssue: dateIssue.split('.').reverse().join('-')
      }
    }
  }
  let productData = {
    type: `${product ? 'loan' : 'deposit'}`,
    amount: `${product ? amountLoan : amountDeposit}`,
    rate: `${product ? process.env.REACT_APP_LOAN_RATE : rateDeposit}`,
    dateOpen: `${product ? dateOpenLoan.split('.').reverse().join('-') : dateOpenDeposit.split('.').reverse().join('-')}`,
    dateClose: `${product ? dateCloseLoan.split('.').reverse().join('-') : dateCloseDeposit.split('.').reverse().join('-')}`
  }

  const send = async () => {
    setLoadingBtn(true)
    sendApplication(clientData, productData).then(() => {
      setLoadingBtn(false)
    }).catch((e) => {
      console.log(e);
      setLoadingBtn(false)
    })
  }

  return (
    <section className="home">
      <Form
        name="form"
        layout="vertical"
        onFinish={send}
        form={form}
      >
        <div className='forms'>
          <div className="client">
            <HomeSwitch 
              checked={'Физическое лицо'} 
              unChecked={'Юридическое лицо'}
              switch={'client'}
              default={client}
              setClient={setClient}
            />
            {client ? 
              <FormLegal
                setSurnameLegal={setSurnameLegal}
                setNameLegal={setNameLegal}
                setPatronymicLegal={setPatronymicLegal}
                setInnLegal={setInnLegal}
                setNameOrg={setNameOrg}
                setOgrn={setOgrn}
                setInnOrg={setInnOrg}
                setKpp={setKpp}
                setRegion={setRegion}
                setCity={setCity}
                setStreet={setStreet}
                setHouse={setHouse}
              />
            : 
              <FormIndividuals
                setSurnameIndividuals={setSurnameIndividuals} 
                setNameIndividuals={setNameIndividuals}
                setPatronymicIndividuals={setPatronymicIndividuals}
                setDateBirth={setDateBirth}
                setInnIndividuals={setInnIndividuals}
                setSerial={setSerial}
                setNumber={setNumber}
                setDateIssue={setDateIssue}
              /> 
            }
          </div>
          <div className="product">
            <HomeSwitch 
              checked={'Вклад'} 
              unChecked={'Кредит'}
              switch={'product'}
              default={product}
              setProduct={setProduct}
            />
            {product ? 
              <>
                <FormLoan
                  setDateOpenLoan={setDateOpenLoan}
                  setDateCloseLoan={setDateCloseLoan}
                  setAmountLoan={setAmountLoan}
                  setPeriodLoan={setPeriodLoan}
                />
                <PaymentSchedule
                  amountLoan={amountLoan}
                  periodLoan={periodLoan}
                  dateOpenLoan={dateOpenLoan}
                />
                <Form.Item shouldUpdate>
                  {() => (
                    <Button
                      type="button"
                      className='btn'
                      onClick={() => report(client, clientData, productData, periodLoan)}
                      disabled={
                        Object.values(form.getFieldsValue()).includes(undefined) ||
                        Object.values(form.getFieldsValue()).includes(null) ||
                        Object.values(form.getFieldsValue()).includes("") ||
                        Object.values(form.getFieldsValue()).length === 0 ||
                        !!form.getFieldsError().filter(({ errors }) => errors.length).length
                      }
                    >
                      Отчет
                    </Button>
                  )}
                </Form.Item>
              </>
            : 
              <>
                <FormDeposit 
                  setDateOpenDeposit={setDateOpenDeposit}
                  setDateCloseDeposit={setDateCloseDeposit}
                  setAmountDeposit={setAmountDeposit}
                  setPeriodDeposit={setPeriodDeposit}
                  setRateDeposit={setRateDeposit}
                />
                <div className="interest-payments">
                  <span className="title-two-in-form">Начисленные проценты (в конце срока):</span>
                  <span className="percent">{periodCapitalization}</span>
                </div>
              </>
            }
          </div>
        </div>

        <Form.Item shouldUpdate>
          {() => (
            <Button 
              type="primary" 
              htmlType="submit" 
              className='btn'
              loading={loadingBtn}
              disabled={
                Object.values(form.getFieldsValue()).includes(undefined) ||
                Object.values(form.getFieldsValue()).includes(null) ||
                Object.values(form.getFieldsValue()).includes("") ||
                Object.values(form.getFieldsValue()).length === 0 ||
                !!form.getFieldsError().filter(({ errors }) => errors.length).length
              }
            >
              {loadingBtn ? '' : 'Отправить'}
            </Button> 
          )}
        </Form.Item>
      </Form>
    </section>
  );
}

export default Home;