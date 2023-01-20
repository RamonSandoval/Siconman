import { Button } from '@mantine/core'
import React from 'react'

const ModalPostponeCalendar = ({maintToPostpone}) => {

  var d = new Date();
  d.setDate(d.getDate()-5);
  var date5 = d.toLocaleDateString('en-CA')
  
  return (
    <>
    <div>ModalPostponeCalendar</div>
    <h4>{maintToPostpone}</h4>
    <Button onClick={()=> console.log(date5)}/>
  
    </>
  )
}

export default ModalPostponeCalendar