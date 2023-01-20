import { Button } from '@mantine/core'
import React from 'react'

const ModalPostponeCalendar = ({maintToPostpone}) => {

  var date = new Date();
  d.setDate(d.getDate()-5);
  
  return (
    <>
    <div>ModalPostponeCalendar</div>
    <h4>{maintToPostpone}</h4>
    <Button onClick={()=> console.log(d.toLocaleDateString('en-CA'))}/>
  
    </>
  )
}

export default ModalPostponeCalendar