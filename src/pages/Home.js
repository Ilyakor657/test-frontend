import React, { useState, useEffect } from "react";
import { Form, Button } from 'antd';
import HomeSwitch from '../components/home/HomeSwitch'
import FormIndividuals from '../components/forms/FormIndividuals'
import FormLegal from '../components/forms/FormLegal'
import FormCredit from '../components/forms/FormCredit'
import dayjs from 'dayjs';
import { dateClose } from "../service/dateService";
//import FormContribution from '../components/forms/FormContribution'

function Home() {
  const [client, setClient] = useState(false)
  const [product, setProduct] = useState(true)
  const [loadingBtn, setLoadingBtn] = useState(false)
  const [form] = Form.useForm();

  //Физическое лицо
  const [surnameIndividuals, setSurnameIndividuals] = useState()
  const [nameIndividuals, setNameIndividuals] = useState()
  const [patronymicIndividuals, setPatronymicIndividuals] = useState()
  const [dateBirth, setDateBirth] = useState()
  const [innIndividuals, setInnIndividuals] = useState()
  const [serial, setSerial] = useState()
  const [number, setNumber] = useState()
  const [dateIssue, setDateIssue] = useState()

  //Юридическое лицо
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

  //Кредит
  const [dateOpenCredit, setDateOpenCredit] = useState(null)
  const [dateCloseCredit, setDateCloseCredit] = useState(null)
  const [periodCredit, setPeriodCredit] = useState(null)
  const [amountCredit, setAmountCredit] = useState()

  useEffect(() => {
    if (periodCredit !== null && periodCredit !== "" && dateOpenCredit !== null) {
      const date = dateClose(dateOpenCredit, periodCredit)
      setDateCloseCredit(date)
      form.setFieldValue('dateCloseCredit', dayjs(date, 'DD.MM.YYYY'))
    } else {
      form.setFieldValue('dateCloseCredit', null)
    }
  }, [dateOpenCredit, periodCredit]);

  const send = async () => {
    try {
      setLoadingBtn(true)
      if (client) {
        console.log({
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
        });
      } else {
        console.log({
          surnameIndividuals,
          nameIndividuals,
          patronymicIndividuals,
          dateBirth,
          innIndividuals,
          passport: {
            serial,
            number,
            dateIssue
          }
        });
      }
      if (product) {
        console.log({
          dateOpenCredit,
          dateCloseCredit,
          amountCredit
        });
      } else {
        console.log({
          
        });
      }
      setLoadingBtn(false)
    } catch (e) {
      console.log(e);
      setLoadingBtn(false)
    }
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
              <FormCredit
                setDateOpenCredit={setDateOpenCredit}
                setDateCloseCredit={setDateCloseCredit}
                setAmountCredit={setAmountCredit}
                setPeriodCredit={setPeriodCredit}
              />
            : 
              ''
              //<FormContribution /> 
            }
          </div>
        </div>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loadingBtn}
          >
            {loadingBtn ? '' : 'Отправить'}
          </Button> 
        </Form.Item>
      </Form>
    </section>
  );
}

export default Home;