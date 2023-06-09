import useApi from "../../../libs/useApi";
import ContactFormReservationConfirm from "../mols/ContactFormReservationConfirm";
import ContactFormReservationInput from "../mols/ContactFormReservationInput";
import ErrorForm from "../mols/ErrorForm";
import LoadingForm from "../mols/LoadingForm";
import ThanksForm from "../mols/ThanksForm";
import ContactHeader from "./ContactHeader";

const ContactFormReservation = () => {
  const { status, handleStatus } = useApi();

  return (
    <>
      <ContactHeader status={status} ja="来館予約" en="Reservation" />
      {status === "idle" && <ContactFormReservationInput handleStatus={handleStatus} />}
      {status === "confirm" && <ContactFormReservationConfirm handleStatus={handleStatus} />}
      {status === "loading" && <LoadingForm />}
      {status === "success" && <ThanksForm description="この度はお問い合わせいただき誠にありがとうございました。" />}
      {status === "error" && <ErrorForm />}
    </>
  );
};

export default ContactFormReservation;
