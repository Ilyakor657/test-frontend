import React from 'react';
import { Switch } from 'antd';

const HomeSwitch = (props) => {
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  return (
    <Switch 
      checkedChildren={props.checked} 
      unCheckedChildren={props.unChecked}
    />
  )
}

export default HomeSwitch;