import { useState } from 'react';
import { Stepper, Button, Group, TextInput } from '@mantine/core';

function ModalAddDeviceSteps() {
  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      <Stepper active={active} onStepClick={setActive} breakpoint="sm">
        <Stepper.Step label="Paso 1" description="Agregar Dispositivo">
          <TextInput label="ID del Dispositivo"/>
          <TextInput label="Modelo"/>
        </Stepper.Step>
        <Stepper.Step label="Paso 2" description="Asignar Departamento">
          Step 2 content: Verify email
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Get full access">
          Step 3 content: Get full access
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>

      <Group position="center" mt="xl">
        <Button variant="default" onClick={prevStep}>Back</Button>
        <Button onClick={nextStep}>Next step</Button>
      </Group>
    </>
  );
}

export default ModalAddDeviceSteps