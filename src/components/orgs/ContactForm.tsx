import React from "react";
import ContactFormInput from "../mols/ContactFormInput";
import ContactHeader from "./ContactHeader";
import ContactFormConfirm from "../mols/ContactFormConfirm";

export type Step = {
  step1: boolean;
  step2: boolean;
  step3: boolean;
};

const ContactForm = () => {
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
      <ContactHeader step={step} ja="お問い合わせ" en="Contact" />
      <ContactFormInput step1={step.step1} handleStep={handleStep} />
      <ContactFormConfirm step2={step.step2} handleStep={handleStep} />
    </>
  );
};

export default ContactForm;
