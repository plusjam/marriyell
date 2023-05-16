import Styles from "@/styles/orgs/ContactForm.module.scss";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { ContactData, contactData } from "../../pages/_app";
import { Step } from "../orgs/ContactForm";
import { ContactReservationData, contactReservationData } from "@/pages/contact/reservation";

type Props = {
  step2: boolean;
  handleStep: (step: Step) => void;
};

const ContactFormReservationConfirm = (props: Props) => {
  const { step2, handleStep } = props;

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ContactReservationData>({
    mode: "onChange",
  });

  const [data, setData] = useRecoilState(contactReservationData);

  // 2023-05-18 の形をyyyy年MM月dd日に変換
  const date = data.date.split("-");
  const dateStr = `${date[0]}年${date[1]}月${date[2]}日`;

  const onSubmit: SubmitHandler<ContactReservationData> = async (data) => {
    alert("送信");

    // await fetch("/api/contact", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then((res) => {
    //     if (res.status === 200) {
    //       // Router.push(`/contact/thanks`);
    //       handleStep({ step1: false, step2: false, step3: true });
    //     // ページトップにスムーズにスクロール
    // window.scrollTo({
    //   top: 0,
    //   behavior: "smooth",
    // });
    //     } else {
    //       // Router.push(`/contact/error`);
    //     }
    //   })
    //   .then((data) => console.log("データ", data))
    //   .catch((err) => console.log("エラーerr", err));
  };

  const onBack = () => {
    setData(data);
    handleStep({ step1: true, step2: false, step3: false });

    // ページトップにスムーズにスクロール
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Router.push(`/contact/`);
  };

  // useEffect(() => {
  //   if ((data.name === "", data.email === "", data.furigana === "", data.inquiry === "",  data.phone === "")) {
  //     Router.push("/contact");
  //   }
  // }, []);

  return (
    <section className={step2 ? `${Styles.section} ${Styles.on}` : Styles.section}>
      <div className={Styles.container}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={Styles.head}>
            <p className={Styles.description}>こちらの内容でよろしければ送信ボタンを押してください。</p>
          </div>
          {/* <div className={Styles.preview}>
            <p className={"check-text"}>
              こちらの内容でよろしければ
              <br className={"sp"} />
              送信ボタンを押してください。
            </p>
          </div> */}
          <div className={Styles.inputs}>
            <div className={Styles.inputBody}>
              <label className={`${Styles.label} ${Styles.require}`} htmlFor="name">
                お名前
              </label>
              <div className={`${Styles.inputBlock} ${Styles.confirm}`}>
                <input disabled className={Styles.input} id="name" {...register("name", {})} value={data.name} />
              </div>
            </div>
            <div className={Styles.inputBody}>
              <label className={`${Styles.label} ${Styles.require}`} htmlFor="furigana">
                お名前（フリガナ）
              </label>
              <div className={`${Styles.inputBlock} ${Styles.confirm}`}>
                <input disabled className={Styles.input} id="furigana" {...register("furigana", {})} value={data.furigana} />
              </div>
            </div>
            <div className={Styles.inputBody}>
              <label className={`${Styles.label} ${Styles.require}`} htmlFor="phone">
                電話番号
              </label>
              <div className={`${Styles.inputBlock} ${Styles.confirm}`}>
                <input disabled className={Styles.input} id="phone" {...register("phone", {})} value={data.phone} />
              </div>
            </div>
            <div className={Styles.inputBody}>
              <label className={`${Styles.label} ${Styles.require}`} htmlFor="email">
                メールアドレス
              </label>
              <div className={`${Styles.inputBlock} ${Styles.confirm}`}>
                <input disabled className={Styles.input} id="email" {...register("email", {})} value={data.email} />
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
                      <input disabled className={Styles.input} id="time" {...register("hh", {})} value={`${data.hh}時${data.mm}分`} />
                    </div>
                  </div>
                </div>
              </div>

              <div className={Styles.phonenote}>
                ※ 当日をご希望の際は、
                <a className={Styles.phonea} href="tel:0120-18-2217">
                  お電話（☎ 0120-18-2217）
                </a>
                にてお問い合わせください。
              </div>
            </div>

            <div className={`${Styles.inputBody}`}>
              <label className={`${Styles.label}`} htmlFor="inquiry">
                ご希望・ご質問など
              </label>
              <div className={`${Styles.inputBlock} ${Styles.confirm}`}>
                <textarea className={`${Styles.input} ${Styles.inputInquiry}`} id="inquiry" {...register("inquiry", {})} disabled value={data.inquiry}></textarea>
              </div>
            </div>
          </div>
          <p className={Styles.policy}>
            <Link href="" target="_blank" rel="noopener noreferrer" className={Styles.link}>
              プライバシーポリシー
            </Link>
            をよくお読みいただき同意いただけましたら下のボタンを押してください。
            <br /> ご不明点やご質問に関しては、
            <Link href="/" className={Styles.link} target="_brank" rel="noopener noreferrer">
              よくあるご質問
            </Link>
            のページもご参照ください。
          </p>

          <div className={Styles.button}>
            <div className={`${Styles.back} ${Styles.submit}`} onClick={() => onBack()}>
              入力画面に戻る
            </div>
            <button className={Styles.submit} type="submit">
              入力内容を確認する
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
