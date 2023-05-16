import React from "react";
import ContactFormInputBrochure from "../mols/ContactFormInputBrochure";
import ContactHeader from "./ContactHeader";
import ContactFormConfirmBrochure from "../mols/ContactFormConfirmBrochure";

export type Step = {
  step1: boolean;
  step2: boolean;
  step3: boolean;
};

const ContactFormBrochure = () => {
  const [option, setOption] = React.useState(true);

  const [step, setStep] = React.useState({
    step1: true,
    step2: false,
    step3: false,
  });

  const handleStep = (step: Step) => {
    setStep(step);
  };

  const handleOption = (option: boolean) => {
    setOption(option);
  };

  return (
    <>
      <ContactHeader step={step} ja="資料請求" en="Request" />
      <ContactFormInputBrochure option={option} step1={step.step1} handleStep={handleStep} handleOption={handleOption} />
      <ContactFormConfirmBrochure option={option} step2={step.step2} handleStep={handleStep} />
    </>
  );
};

export default ContactFormBrochure;
