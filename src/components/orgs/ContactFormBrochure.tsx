import useApi from "../../../libs/useApi";
import ContactFormConfirmBrochure from "../mols/ContactFormConfirmBrochure";
import ContactFormInputBrochure from "../mols/ContactFormInputBrochure";
import ErrorForm from "../mols/ErrorForm";
import LoadingForm from "../mols/LoadingForm";
import ThanksForm from "../mols/ThanksForm";
import ContactHeader from "./ContactHeader";

const ContactFormBrochure = () => {
  const { status, handleStatus } = useApi();

  return (
    <>
      <ContactHeader status={status} ja="資料請求" en="Request" />
      {status === "idle" && <ContactFormInputBrochure handleStatus={handleStatus} />}
      {status === "confirm" && <ContactFormConfirmBrochure handleStatus={handleStatus} />}
      {status === "loading" && <LoadingForm />}
      {status === "success" && <ThanksForm description="この度はお問い合わせいただき誠にありがとうございました。" />}
      {status === "error" && <ErrorForm />}
    </>
  );
};

export default ContactFormBrochure;
