import React, { useState } from "react";
import Styles from "@/styles/orgs/ContactForm.module.scss";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { Status } from "../../../libs/useApi";
import { ContactDataDetailPlan } from "../orgs/DetailPlanForm";
import { useRouter } from "next/router";

type Props = {
  title: string;
  handleStatus?: (status: Status) => void;
  data: ContactDataDetailPlan;
};

const DetailPlanFormConfirmInput = (props: Props) => {
  const { handleStatus, data } = props;

  const router = useRouter();
  const { register, handleSubmit } = useForm<ContactDataDetailPlan>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<ContactDataDetailPlan> = async () => {
    try {
      // トップからreservationまでの高さを取得
      const reservationTopPosition = document.getElementById("reservation") as HTMLElement;
      const reservationTop = reservationTopPosition?.getBoundingClientRect().top + window.pageYOffset;

      // reservationTopの位置までスクロール
      window.scrollTo({ top: reservationTop - 100, behavior: "smooth" });

      if (handleStatus) handleStatus("loading");

      const res = await fetch(`/api/contact/plan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, title: data.title.replaceAll("<br>", " ") }),
      });
      const json = await res.json();

      router.push("/plan/thanks");
    } catch (error) {
      console.log(error);
      if (handleStatus) handleStatus("error");
    }
  };

  const handleBack = () => {
    if (handleStatus) handleStatus("idle");
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
            プラン名
          </label>
          <div className={Styles.inputBlock}>
            <input className={Styles.input} id="title" {...register("title", {})} value={data.title} readOnly />
          </div>
        </div>
        <div className={Styles.inputBody}>
          <label className={`${Styles.label} ${Styles.require}`} htmlFor="name">
            相談方法
          </label>
          <div className={Styles.inputBlock}>
            <input
              className={Styles.input}
              id="type"
              value={data.type === "direct" ? "来館して直接相談する" : data.type === "online" ? "オンラインで相談する" : "その他（電話、メールなど）"}
              readOnly
            />
          </div>
        </div>
        <div className={Styles.inputBody}>
          <label className={`${Styles.label} ${Styles.require}`} htmlFor="name">
            お名前
          </label>
          <div className={Styles.inputBlock}>
            <input className={Styles.input} id="name" placeholder="例　山田　花子" value={data.name} readOnly />
          </div>
        </div>
        <div className={Styles.inputBody}>
          <label className={`${Styles.label} ${Styles.require}`} htmlFor="furigana">
            お名前（フリガナ）
          </label>
          <div className={Styles.inputBlock}>
            <input className={Styles.input} id="furigana" placeholder="例　ヤマダ　ハナコ" value={data.furigana} readOnly />
          </div>
        </div>
        <div className={Styles.inputBody}>
          <label className={`${Styles.label} ${Styles.require}`} htmlFor="phone">
            電話番号
          </label>
          <div className={Styles.inputBlock}>
            <input className={Styles.input} id="phone" placeholder="例　09012345678" value={data.phone} readOnly />
          </div>
        </div>
        <div className={Styles.inputBody}>
          <label className={`${Styles.label} ${Styles.require}`} htmlFor="email">
            メールアドレス
          </label>
          <div className={Styles.inputBlock}>
            <input className={Styles.input} id="email" placeholder="例　example@marriyellclub.co.jp" value={data.email} readOnly />
          </div>
        </div>
        <div className={Styles.inputBlockGrid}>
          <div className={`${Styles.inputBody} ${Styles.inputDate}`}>
            <label className={`${Styles.label} ${Styles.require}`} htmlFor="date">
              ご来館希望日
            </label>
            <div className={Styles.inputBlockWrap}>
              <div className={`${Styles.inputBlock}`}>
                <input className={`${Styles.input} ${Styles.date}`} id="date" type="text" value={data.date} readOnly />
              </div>
            </div>
          </div>

          <div className={`${Styles.inputBody} ${Styles.inputTime}`}>
            <label className={`${Styles.label} ${Styles.require}`} htmlFor="time">
              ご希望時間
            </label>
            <div className={Styles.inputBlockWrap}>
              <div className={`${Styles.inputBlock}`}>
                <input className={`${Styles.input} ${Styles.time}`} id="time" type="text" value={data.time} readOnly />
              </div>
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
        <Link className={`${Styles.action} ${Styles.toFair}`} href="/plan">
          他のプランを探す
        </Link>
        <div className={`${Styles.action} ${Styles.toTop}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          もう一度詳細を見る
        </div>
      </div>
    </form>
  );
};

export default DetailPlanFormConfirmInput;
