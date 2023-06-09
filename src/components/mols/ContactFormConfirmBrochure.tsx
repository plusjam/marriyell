import { ContactBrochureData, contactBrochureData } from "@/pages/contact/brochure";
import Styles from "@/styles/orgs/ContactForm.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { Status } from "../../../libs/useApi";
import ContactPolicy from "../atoms/ContactPolicy";
import { useRouter } from "next/router";

type Props = {
  handleStatus: (status: Status) => void;
};

const ContactFormConfirmBrochure = (props: Props) => {
  const { handleStatus } = props;

  const router = useRouter();
  const [R_contactBrochureData, setR_contactBrochureData] = useRecoilState<ContactBrochureData>(contactBrochureData);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactBrochureData>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<ContactBrochureData> = async () => {
    try {
      handleStatus("loading");
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      const res = await fetch("/api/contact/brochure", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(R_contactBrochureData),
      });
      const json = await res.json();

      if (json.status === 200) {
        router.push("/contact/brochure/thanks");
      } else {
        handleStatus("error");
      }
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
                <input disabled className={Styles.input} id="name" {...register("name", {})} placeholder="例　山田　花子" value={R_contactBrochureData.name} />
                {errors.name && <span className={Styles.error}>{errors.name.message as string}</span>}
              </div>
            </div>
            <div className={Styles.inputBody}>
              <label className={`${Styles.label} ${Styles.require}`} htmlFor="furigana">
                お名前（フリガナ）
              </label>
              <div className={`${Styles.inputBlock} ${Styles.confirm}`}>
                <input disabled className={Styles.input} id="furigana" {...register("furigana", {})} placeholder="例　ヤマダ　ハナコ" value={R_contactBrochureData.furigana} />
                {errors.furigana && <span className={Styles.error}>{errors.furigana.message as string}</span>}
              </div>
            </div>
            <div className={Styles.inputBody}>
              <label className={`${Styles.label} ${Styles.require}`} htmlFor="phone">
                電話番号
              </label>
              <div className={`${Styles.inputBlock} ${Styles.confirm}`}>
                <input disabled className={Styles.input} id="phone" {...register("phone", {})} placeholder="例　09012345678" value={R_contactBrochureData.phone} />
                {errors.phone && <span className={Styles.error}>{errors.phone.message as string}</span>}
              </div>
            </div>
            <div className={Styles.inputBody}>
              <label className={`${Styles.label} ${Styles.require}`} htmlFor="email">
                メールアドレス
              </label>
              <div className={`${Styles.inputBlock} ${Styles.confirm}`}>
                <input disabled className={Styles.input} id="email" {...register("email", {})} placeholder="例　abcd@lucrea" value={R_contactBrochureData.email} />
                {errors.email && <span className={Styles.error}>{errors.email.message as string}</span>}
              </div>
            </div>
            <div className={Styles.inputBody}>
              <label className={`${Styles.label} ${Styles.require}`} htmlFor="email">
                郵便番号
              </label>
              <div className={`${Styles.inputBlock} ${Styles.confirm}`}>
                <input disabled className={`${Styles.input} ${Styles.half}`} id="zipcode" {...register("zipcode", {})} placeholder="例　abcd@lucrea" value={R_contactBrochureData.zipcode} />
                {errors.zipcode && <span className={Styles.error}>{errors.zipcode.message as string}</span>}
              </div>
            </div>
            <div className={Styles.inputBody}>
              <label className={`${Styles.label} ${Styles.require}`} htmlFor="address">
                住所
              </label>
              <div className={`${Styles.inputBlock} ${Styles.confirm}`}>
                <input disabled className={Styles.input} id="address" {...register("address", {})} placeholder="例　abcd@lucrea" value={R_contactBrochureData.address} />
                {errors.address && <span className={Styles.error}>{errors.address.message as string}</span>}
              </div>
            </div>
            <div className={`${Styles.inputBody}`}>
              <label className={`${Styles.label}`} htmlFor="inquiry">
                ご希望・ご質問など
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
                  value={R_contactBrochureData.inquiry}
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

export default ContactFormConfirmBrochure;
