import React from "react";
import ContactFormReservationInput from "../mols/ContactFormReservationInput";
import ContactHeader from "./ContactHeader";
import ContactFormReservationConfirm from "../mols/ContactFormReservationConfirm";
import { ContactReservationData } from "@/pages/contact/reservation";
import LoadingForm from "../mols/LoadingForm";
import ThanksForm from "../mols/ThanksForm";
import ErrorForm from "../mols/ErrorForm";
import useApi from "../../../libs/useApi";

export type Step = {
  step1: boolean;
  step2: boolean;
  step3: boolean;
};

type Props = {
  contactReservationData: ContactReservationData;
  updateContactReservationData: (data: ContactReservationData) => void;
};

const ContactFormReservation = (props: Props) => {
  const { contactReservationData, updateContactReservationData } = props;

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
      <ContactHeader step={step} ja="来館予約" en="Reservation" />
      <ContactFormReservationInput step1={step.step1} handleStep={handleStep} contactReservationData={contactReservationData} updateContactReservationData={updateContactReservationData} />
      <ContactFormReservationConfirm step2={step.step2} handleStep={handleStep} contactReservationData={contactReservationData} handleStatus={handleStatus} />
      {status === "loading" && <LoadingForm />}
      {status === "success" && <ThanksForm description="この度はお問い合わせいただき誠にありがとうございました。" />}
      {status === "error" && <ErrorForm />}
    </>
  );
};

export default ContactFormReservation;
