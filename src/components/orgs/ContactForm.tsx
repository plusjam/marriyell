import React from "react";
import ContactFormInput from "../mols/ContactFormInput";
import ContactHeader from "./ContactHeader";
import ContactFormConfirm from "../mols/ContactFormConfirm";
import { ContactData } from "@/pages/contact";
import useApi from "../../../libs/useApi";
import LoadingForm from "../mols/LoadingForm";
import ThanksForm from "../mols/ThanksForm";
import ErrorForm from "../mols/ErrorForm";

export type Step = {
  step1: boolean;
  step2: boolean;
  step3: boolean;
};

type Props = {
  contactData: ContactData;
  updateContactData: (data: ContactData) => void;
};

const ContactForm = (props: Props) => {
  const { contactData, updateContactData } = props;

  const [step, setStep] = React.useState({
    step1: true,
    step2: false,
    step3: false,
  });

  const { status, handleStatus } = useApi();

  const handleStep = (step: Step) => {
    setStep(step);
  };

  return (
    <>
      <ContactHeader step={step} ja="お問い合わせ" en="Contact" />
      <ContactFormInput step1={step.step1} handleStep={handleStep} contactData={contactData} updateContactData={updateContactData} />
      <ContactFormConfirm step2={step.step2} handleStep={handleStep} contactData={contactData} handleStatus={handleStatus} />
      {status === "loading" && <LoadingForm />}
      {status === "success" && <ThanksForm description="この度はお問い合わせいただき誠にありがとうございました。" />}
      {status === "error" && <ErrorForm />}
    </>
  );
};

export default ContactForm;
