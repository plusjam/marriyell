import React from "react";
import ContactFormReservationInput from "../mols/ContactFormReservationInput";
import ContactHeader from "./ContactHeader";
import ContactFormReservationConfirm from "../mols/ContactFormReservationConfirm";

export type Step = {
  step1: boolean;
  step2: boolean;
  step3: boolean;
};

const ContactFormReservation = () => {
  const [step, setStep] = React.useState({
    step1: true,
    step2: false,
    step3: false,
  });

  const handleStep = (step: Step) => {
    setStep(step);
  };

  return (
    <>
      <ContactHeader step={step} ja="来館予約" en="Reservation" />
      <ContactFormReservationInput step1={step.step1} handleStep={handleStep} />
      <ContactFormReservationConfirm step2={step.step2} handleStep={handleStep} />
    </>
  );
};

export default ContactFormReservation;
