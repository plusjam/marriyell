import { ContactData, contactData } from "@/pages/contact";
import Styles from "@/styles/orgs/ContactForm.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { Status } from "../../../libs/useApi";
import ContactPolicy from "../atoms/ContactPolicy";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import Image from "next/image";

type Props = {
  handleStatus: (status: Status) => void;
};

const ContactFormConfirm = (props: Props) => {
  const { handleStatus } = props;

  const [R_contactData, setR_ContactData] = useRecoilState<ContactData>(contactData);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactData>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<ContactData> = async () => {
    try {
      handleStatus("loading");
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(R_contactData),
      });
      const json = await res.json();

      router.push("/contact/thanks");
    } catch (error) {
      handleStatus("error");
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
                <input disabled className={Styles.input} id="name" {...register("name", {})} placeholder="例　山田　花子" value={R_contactData.name} />
                {errors.name && <span className={Styles.error}>{errors.name.message as string}</span>}
              </div>
            </div>
            <div className={Styles.inputBody}>
              <label className={`${Styles.label} ${Styles.require}`} htmlFor="furigana">
                お名前（フリガナ）
              </label>
              <div className={`${Styles.inputBlock} ${Styles.confirm}`}>
                <input disabled className={Styles.input} id="furigana" {...register("furigana", {})} placeholder="例　ヤマダ　ハナコ" value={R_contactData.furigana} />
                {errors.furigana && <span className={Styles.error}>{errors.furigana.message as string}</span>}
              </div>
            </div>
            <div className={Styles.inputBody}>
              <label className={`${Styles.label} ${Styles.require}`} htmlFor="phone">
                電話番号
              </label>
              <div className={`${Styles.inputBlock} ${Styles.confirm}`}>
                <input disabled className={Styles.input} id="phone" {...register("phone", {})} placeholder="例　09012345678" value={R_contactData.phone} />
                {errors.phone && <span className={Styles.error}>{errors.phone.message as string}</span>}
              </div>
            </div>
            <div className={Styles.inputBody}>
              <label className={`${Styles.label} ${Styles.require}`} htmlFor="email">
                メールアドレス
              </label>
              <div className={`${Styles.inputBlock} ${Styles.confirm}`}>
                <input disabled className={Styles.input} id="email" {...register("email", {})} placeholder="例　abcd@marriyell" value={R_contactData.email} />
                {errors.email && <span className={Styles.error}>{errors.email.message as string}</span>}
              </div>
            </div>
            <div className={`${Styles.inputBody}`}>
              <label className={`${Styles.label} ${Styles.require}`} htmlFor="inquiry">
                お問いわせ内容
              </label>
              <div className={`${Styles.inputBlock} ${Styles.confirm}`}>
                <textarea
                  className={`${Styles.input} ${Styles.inputInquiry}`}
                  id="inquiry"
                  {...register("inquiry", {})}
                  placeholder="お問い合わせ内容をご記載ください。"
                  cols={50}
                  rows={5}
                  disabled
                  value={R_contactData.inquiry}
                ></textarea>
                {errors.inquiry && <span className={Styles.error}>{errors.inquiry.message as string}</span>}
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
              <Image src="/images/icon_note.svg" alt="" width={40} height={40} />
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

export default ContactFormConfirm;
