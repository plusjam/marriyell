import Styles from "@/styles/orgs/ContactForm.module.scss";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { Status } from "../../../libs/useApi";
import { ContactDataDetailFair } from "../orgs/DetailFairForm";
import { useRouter } from "next/router";

type Props = {
  handleStatus: (status: Status) => void;
  data: ContactDataDetailFair;
};

const DetailFairFormConfirmInput = (props: Props) => {
  const { handleStatus, data } = props;

  const router = useRouter();
  const { register, handleSubmit } = useForm<ContactDataDetailFair>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<ContactDataDetailFair> = async () => {
    try {
      // トップからreservationまでの高さを取得
      const reservationTopPosition = document.getElementById("reservation") as HTMLElement;
      const reservationTop = reservationTopPosition?.getBoundingClientRect().top + window.pageYOffset;

      // reservationTopの位置までスクロール
      window.scrollTo({ top: reservationTop - 100, behavior: "smooth" });

      if (handleStatus) handleStatus("loading");

      const res = await fetch(`/api/contact/fair`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, title: data.title.replaceAll("<br>", " ") }),
      });
      const json = await res.json();

      router.push("/fair/thanks");
    } catch (error) {
      console.log(error);
      if (handleStatus) handleStatus("error");
    }
  };

  const handleBack = () => {
    handleStatus("idle");
    // トップからreservationまでの高さを取得
    const reservationTopPosition = document.getElementById("reservation") as HTMLElement;
    const reservationTop = reservationTopPosition?.getBoundingClientRect().top + window.pageYOffset;

    // reservationTopの位置までスクロール
    window.scrollTo({ top: reservationTop - 100, behavior: "smooth" });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`${Styles.detailForm} ${Styles.confirm}`}>
      <div className={Styles.inputs}>
        <div className={Styles.inputBody}>
          <label className={`${Styles.label} ${Styles.require} ${Styles.disabled}`} htmlFor="title">
            フェア名
          </label>
          <div className={Styles.inputBlock}>
            <input className={Styles.input} id="title" {...register("title", {})} value={data.title} readOnly />
          </div>
        </div>
        <div className={Styles.inputBody}>
          <label className={`${Styles.label} ${Styles.require}`} htmlFor="name">
            お名前
          </label>
          <div className={Styles.inputBlock}>
            <input className={Styles.input} id="name" value={data.name} readOnly />
          </div>
        </div>
        <div className={Styles.inputBody}>
          <label className={`${Styles.label} ${Styles.require}`} htmlFor="furigana">
            お名前（フリガナ）
          </label>
          <div className={Styles.inputBlock}>
            <input className={Styles.input} id="furigana" value={data.furigana} readOnly />
          </div>
        </div>
        <div className={Styles.inputBody}>
          <label className={`${Styles.label} ${Styles.require}`} htmlFor="phone">
            電話番号
          </label>
          <div className={Styles.inputBlock}>
            <input className={Styles.input} id="phone" value={data.phone} readOnly />
          </div>
        </div>
        <div className={Styles.inputBody}>
          <label className={`${Styles.label} ${Styles.require}`} htmlFor="email">
            メールアドレス
          </label>
          <div className={Styles.inputBlock}>
            <input className={Styles.input} id="email" value={data.email} readOnly />
          </div>
        </div>
        <div className={Styles.inputBlockGrid}>
          <div className={`${Styles.inputBody} ${Styles.inputDate}`}>
            <label className={`${Styles.label} ${Styles.require}`} htmlFor="date">
              ご来館希望日
            </label>
            <div className={Styles.inputBlockWrap}>
              <input className={`${Styles.input} ${Styles.date}`} id="date" type="date" value={data.date} readOnly />
            </div>
          </div>

          <div className={`${Styles.inputBody} ${Styles.inputTime}`}>
            <label className={`${Styles.label} ${Styles.require}`} htmlFor="time">
              ご希望時間
            </label>
            <div className={Styles.inputBlockWrap}>
              <input className={`${Styles.input} ${Styles.time}`} id="time" type="text" value={data.time} readOnly />
            </div>
          </div>
        </div>
        <div className={`${Styles.inputBody}`}>
          <label className={`${Styles.label}`} htmlFor="inquiry">
            ご希望・ご質問など
          </label>
          <div className={Styles.inputBlock}>
            <textarea className={`${Styles.input} ${Styles.inputInquiry}`} id="inquiry" cols={50} rows={10} value={data.inquiry} readOnly></textarea>
          </div>
        </div>
      </div>

      <div className={Styles.button}>
        <div className={Styles.submit} onClick={() => handleBack()}>
          入力画面に戻る
        </div>
        <button className={Styles.submit} type="submit">
          この内容で送信する
        </button>
      </div>

      <div className={Styles.notes}>
        <p>※ 送信後、自動返信メールが届かない場合はご記入のアドレスが間違っている可能性がございます。メールのご確認をよろしくお願いいたします。</p>
        <p>※ メールソフト・プロバイダーによって、当式場からの返信メールが「迷惑メールフォルダ」や「削除済みアイテム」等に振り分けられている可能性がありますので、ご確認ください。</p>
      </div>

      <div className={Styles.buttons}>
        <Link className={`${Styles.action} ${Styles.toFair}`} href="/fair">
          他のフェアを探す
        </Link>
        <div className={`${Styles.action} ${Styles.toTop}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          もう一度詳細を見る
        </div>
      </div>
    </form>
  );
};

export default DetailFairFormConfirmInput;
