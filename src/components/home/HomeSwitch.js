import React from 'react';
import { Switch } from 'antd';

const HomeSwitch = (props) => {
  const onChange = (checked) => {
    if (props.switch === 'client') {
      props.setClient(checked)
    } else {
      props.setProduct(checked)
    }
  };

  return (
    <Switch 
      checkedChildren={props.checked} 
      unCheckedChildren={props.unChecked}
      defaultChecked={props.default}
      onChange={onChange}
    />
  )
}

export default HomeSwitch;