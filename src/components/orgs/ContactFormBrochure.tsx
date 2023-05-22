import React from "react";
import ContactFormInputBrochure from "../mols/ContactFormInputBrochure";
import ContactHeader from "./ContactHeader";
import ContactFormConfirmBrochure from "../mols/ContactFormConfirmBrochure";
import { ContactBrochureData } from "@/pages/contact/brochure";
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
  contactBrochureData: ContactBrochureData;
  updateContactBrochureData: (data: ContactBrochureData) => void;
};

const ContactFormBrochure = (props: Props) => {
  const { contactBrochureData, updateContactBrochureData } = props;

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
      <ContactHeader step={step} ja="資料請求" en="Request" />
      <ContactFormInputBrochure step1={step.step1} handleStep={handleStep} contactBrochureData={contactBrochureData} updateContactBrochureData={updateContactBrochureData} />
      <ContactFormConfirmBrochure step2={step.step2} handleStep={handleStep} contactBrochureData={contactBrochureData} handleStatus={handleStatus} />
      {status === "loading" && <LoadingForm />}
      {status === "success" && <ThanksForm description="この度はお問い合わせいただき誠にありがとうございました。" />}
      {status === "error" && <ErrorForm />}
    </>
  );
};

export default ContactFormBrochure;
