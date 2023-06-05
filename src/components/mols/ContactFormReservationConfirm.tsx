import { ContactReservationData, contactReservationData } from "@/pages/contact/reservation";
import Styles from "@/styles/orgs/ContactForm.module.scss";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { Status } from "../../../libs/useApi";
import ContactPolicy from "../atoms/ContactPolicy";

type Props = {
  handleStatus: (status: Status) => void;
};

const ContactFormReservationConfirm = (props: Props) => {
  const { handleStatus } = props;

  const router = useRouter();
  const [R_contactFormReservationData, setR_contactFormReservationData] = useRecoilState<ContactReservationData>(contactReservationData);
  const { register, handleSubmit } = useForm<ContactReservationData>({
    mode: "onChange",
  });

  // 2023-05-18 の形をyyyy年MM月dd日に変換
  const date = R_contactFormReservationData.date.split("-");
  const dateStr = `${date[0]}年${date[1]}月${date[2]}日`;

  const onSubmit: SubmitHandler<ContactReservationData> = async () => {
    try {
      handleStatus("loading");
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      const res = await fetch("/api/contact/reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(R_contactFormReservationData),
      });
      const json = await res.json();

      router.push("/contact/reservation/thanks");
    } catch (error) {
      console.log(error);
    }
  };

  const onBack = () => {
    handleStatus("idle");

    // ページトップにスムーズにスクロール
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className={Styles.section}>
      <div className={Styles.container}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={Styles.head}>
            <p className={Styles.description}>こちらの内容でよろしければ送信ボタンを押してください。</p>
          </div>
          <div className={Styles.inputs}>
            <div className={Styles.inputBody}>
              <label className={`${Styles.label} ${Styles.require}`} htmlFor="name">
                お名前
              </label>
              <div className={`${Styles.inputBlock} ${Styles.confirm}`}>
                <input disabled className={Styles.input} id="name" {...register("name", {})} value={R_contactFormReservationData.name} />
              </div>
            </div>
            <div className={Styles.inputBody}>
              <label className={`${Styles.label} ${Styles.require}`} htmlFor="furigana">
                お名前（フリガナ）
              </label>
              <div className={`${Styles.inputBlock} ${Styles.confirm}`}>
                <input disabled className={Styles.input} id="furigana" {...register("furigana", {})} value={R_contactFormReservationData.furigana} />
              </div>
            </div>
            <div className={Styles.inputBody}>
              <label className={`${Styles.label} ${Styles.require}`} htmlFor="phone">
                電話番号
              </label>
              <div className={`${Styles.inputBlock} ${Styles.confirm}`}>
                <input disabled className={Styles.input} id="phone" {...register("phone", {})} value={R_contactFormReservationData.phone} />
              </div>
            </div>
            <div className={Styles.inputBody}>
              <label className={`${Styles.label} ${Styles.require}`} htmlFor="email">
                メールアドレス
              </label>
              <div className={`${Styles.inputBlock} ${Styles.confirm}`}>
                <input disabled className={Styles.input} id="email" {...register("email", {})} value={R_contactFormReservationData.email} />
              </div>
            </div>
            <div className={`${Styles.inputBlockGrid} ${Styles.confirm}`}>
              <div className={`${Styles.inputBody} ${Styles.inputDate}`}>
                <label className={`${Styles.label} ${Styles.require}`} htmlFor="date">
                  ご希望日
                </label>
                <div className={Styles.inputBlockWrap}>
                  <div className={`${Styles.inputBlock} ${Styles.confirm}`}>
                    <input className={`${Styles.input} ${Styles.date}`} id="date" {...register("date", {})} value={dateStr} disabled />
                  </div>
                </div>
              </div>

              <div className={`${Styles.inputBody} ${Styles.inputTime}`}>
                <label className={`${Styles.label} ${Styles.require}`} htmlFor="time">
                  ご希望日時間
                </label>
                <div className={Styles.inputBlockFlex}>
                  <div className={Styles.inputBlockWrap}>
                    <div className={`${Styles.inputBlock} ${Styles.confirm}`}>
                      <input disabled className={Styles.input} id="time" {...register("hh", {})} value={`${R_contactFormReservationData.hh}時${R_contactFormReservationData.mm}分`} />
                    </div>
                  </div>
                </div>
              </div>

              <div className={Styles.phonenote}>
                ※ 当日をご希望の際は、
                <a className={Styles.phonea} href="tel:0050-1860-4937">
                  お電話（☎ 0050-1860-4937）
                </a>
                にてお問い合わせください。
              </div>
            </div>

            <div className={`${Styles.inputBody}`}>
              <label className={`${Styles.label}`} htmlFor="inquiry">
                ご希望・ご質問など
              </label>
              <div className={`${Styles.inputBlock} ${Styles.confirm}`}>
                <textarea className={`${Styles.input} ${Styles.inputInquiry}`} id="inquiry" {...register("inquiry", {})} disabled value={R_contactFormReservationData.inquiry}></textarea>
              </div>
            </div>
          </div>

          <ContactPolicy />

          <div className={Styles.button}>
            <div className={`${Styles.back} ${Styles.submit}`} onClick={() => onBack()}>
              入力画面に戻る
            </div>
            <button className={Styles.submit} type="submit">
              この内容で送信する
            </button>
          </div>

          <div className={Styles.note}>
            <div className={Styles.mark}>
              <img src="/images/icon_note.svg" alt="" />
            </div>
            <ul className={Styles.ul}>
              <li className={Styles.li}>送信後、自動返信メールが届かない場合はご記入のアドレスが間違っている可能性がございます。メールのご確認をよろしくお願い致します。</li>
              <li className={Styles.li}>
                メールソフト・プロバイダーによって、当式場からの返信メールが「迷惑メールフォルダ」や「削除済みアイテム」等に振り分けられている可能性がありますので、ご確認くださいませ。
              </li>
            </ul>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactFormReservationConfirm;
