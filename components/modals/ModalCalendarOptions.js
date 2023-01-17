import React from 'react'
import { Tabs } from '@mantine/core';
import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons';
import Postpone from './ModalPostpone';
const ModalCalendarOptions = () => {
  return (
   <>
    <Tabs defaultValue="gallery">
      <Tabs.List>
        <Tabs.Tab value="gallery" icon={<IconPhoto size={14} />}>Realizar Manteniemiento</Tabs.Tab>
        <Tabs.Tab value="messages" icon={<IconMessageCircle size={14} />}>Otra opcion</Tabs.Tab>
        <Tabs.Tab value="settings" icon={<IconSettings size={14} />}>Posponer</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="gallery" pt="xs">
        Gallery tab content
      </Tabs.Panel>

      <Tabs.Panel value="messages" pt="xs">
        Messages tab content
      </Tabs.Panel>

      <Tabs.Panel value="settings" pt="xs">
       <Postpone/>
      </Tabs.Panel>
    </Tabs>
   </>
  )
}

export default ModalCalendarOptions