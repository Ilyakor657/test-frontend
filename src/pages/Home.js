import React, { useState } from "react";
import HomeSwitch from '../components/HomeSwitch'

function Home() {
  const [client, setClient] = useState(false)
  const [product, setProduct] = useState(false)

  return (
    <section className="home">
      <div className="home__client">
        <HomeSwitch checked={'Физическое лицо'} unChecked={'Юридическое лицо'}/>
        {client ? 
          '' 
        : 
          ''
        }
      </div>
      <div className="home__product">
        <HomeSwitch checked={'Вклад'} unChecked={'Кредит'}/>
        {product ? 
          '' 
        : 
          ''
        }
      </div>
    </section>
  );
}

export default Home;