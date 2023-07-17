import React, { useState } from "react";
import { Form, Button } from 'antd';
import HomeSwitch from '../components/home/HomeSwitch'
import FormIndividuals from '../components/forms/FormIndividuals'
import FormLegal from '../components/forms/FormLegal'
import FormCredit from '../components/forms/FormCredit'
//import FormContribution from '../components/forms/FormContribution'

function Home() {
  const [client, setClient] = useState(false)
  const [product, setProduct] = useState(true)
  const [loadingBtn, setLoadingBtn] = useState(false)

  const send = async () => {
    try {
      setLoadingBtn(true)
      setTimeout(() => {
        setLoadingBtn(false)
      }, 1000);
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
              <FormLegal />
            : 
              <FormIndividuals /> 
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
              <FormCredit />
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