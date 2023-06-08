import { ContactData } from "@/pages/contact";
import React from "react";
import useApi from "../../../libs/useApi";
import ContactFormConfirm from "../mols/ContactFormConfirm";
import ContactFormInput from "../mols/ContactFormInput";
import ErrorForm from "../mols/ErrorForm";
import LoadingForm from "../mols/LoadingForm";
import ContactHeader from "./ContactHeader";

const ContactForm = () => {
  const { status, handleStatus } = useApi();

  return (
    <>
      <ContactHeader status={status} ja="お問い合わせ" en="Contact" />
      {status === "idle" && <ContactFormInput handleStatus={handleStatus} />}
      {status === "confirm" && <ContactFormConfirm handleStatus={handleStatus} />}
      {status === "loading" && <LoadingForm />}
      {status === "error" && <ErrorForm />}
    </>
  );
};

export default ContactForm;
