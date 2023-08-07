import React, { useState, useEffect } from "react";
import { Form, Button } from 'antd';
import HomeSwitch from '../components/home/HomeSwitch'
import FormIndividual from '../components/forms/FormIndividual'
import FormLegal from '../components/forms/FormLegal'
import FormLoan from '../components/forms/FormLoan'
import FormDeposit from '../components/forms/FormDeposit'
import dayjs from 'dayjs';
import { dateClose } from "../service/dateService";
import PaymentSchedule from "../components/home/PaymentSchedule";
import capitalization from "../service/capitalization";
import { paymentSchedule } from "../http/reportAPI";
import { sendApplication } from "../http/applicationAPI"
import MessageAPI from "../components/MessageAPI"

function Home() {
  const [client, setClient] = useState(false)
  const [product, setProduct] = useState(true)
  const [loadingBtn, setLoadingBtn] = useState(false)
  const [periodCapitalization, setPeriodCapitalization] = useState("0")
  const [messageAPI, setMessageAPI] = useState([])
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});

  useEffect(() => {
    forceUpdate({});
  }, []);

  const [surnameIndividual, setSurnameIndividual] = useState()
  const [nameIndividual, setNameIndividual] = useState()
  const [patronymicIndividual, setPatronymicIndividual] = useState()
  const [dateBirth, setDateBirth] = useState()
  const [innIndividual, setInnIndividual] = useState()
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

  const innClear = async () => {
    form.setFieldValue('innOrg', "")
  }

  let clientData
  if (client) {
    clientData = {
      subject: 'legal',
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
      subject: 'individual',
      surnameIndividual,
      nameIndividual,
      patronymicIndividual,
      dateBirth: dateBirth?.split('.').reverse().join('-'),
      innIndividual,
      passport: {
        serial,
        number,
        dateIssue: dateIssue?.split('.').reverse().join('-')
      }
    }
  }
  let productData = {
    type: `${product ? 'loan' : 'deposit'}`,
    amount: `${product ? amountLoan : amountDeposit}`,
    rate: `${product ? process.env.REACT_APP_LOAN_RATE : rateDeposit}`,
    dateOpen: `${product ? dateOpenLoan?.split('.').reverse().join('-') : dateOpenDeposit?.split('.').reverse().join('-')}`,
    dateClose: `${product ? dateCloseLoan?.split('.').reverse().join('-') : dateCloseDeposit?.split('.').reverse().join('-')}`
  }

  const send = async () => {
    setLoadingBtn(true)
    sendApplication(clientData, productData).then(() => {
      form.resetFields();
      setDateOpenLoan(null)
      setDateCloseLoan(null)
      setPeriodLoan(null)
      setAmountLoan(null)
      setDateOpenDeposit(null)
      setDateCloseDeposit(null)
      setPeriodDeposit(null)
      setAmountDeposit(null)
      setRateDeposit(null)
      setLoadingBtn(false)
      setMessageAPI(['success', 'Заявка успешно отправлена'])
      setTimeout(() => {
        setMessageAPI([])
      }, 2500);
    }).catch((e) => {
      console.log(e);
      setLoadingBtn(false)
      setMessageAPI(['error', 'Ошибка отправки'])
      setTimeout(() => {
        setMessageAPI([])
      }, 2500);
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
                innClear={innClear}
              />
            : 
              <FormIndividual
                setSurnameIndividual={setSurnameIndividual} 
                setNameIndividual={setNameIndividual}
                setPatronymicIndividual={setPatronymicIndividual}
                setDateBirth={setDateBirth}
                setInnIndividual={setInnIndividual}
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
                      onClick={() => paymentSchedule(clientData, amountLoan, periodLoan, dateOpenLoan).then((data) => {
                        var file = new Blob([data.data], {
                          type: 'text/html'
                        })
                        let url = URL.createObjectURL(file);
                        var link = document.createElement('a');
                        link.href = url
                        link.download = 'report.html'
                        link.style = "display: none"
                        link.click()
                        link.remove()
                        URL.revokeObjectURL(url)
                      })}
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
      <MessageAPI messageAPI={messageAPI}/>
    </section>
  );
}

export default Home;