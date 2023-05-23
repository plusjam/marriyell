import React, { useState } from "react";
import Styles from "@/styles/orgs/ContactForm.module.scss";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { Status } from "../../../libs/useApi";

export type ContactDataDetailFair = {
  title: string;
  name: string;
  furigana: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  inquiry?: string;
};

type Props = {
  title: string;
  handleStatus: (status: Status) => void;
};

const DetailFairFormInput = (props: Props) => {
  const { title, handleStatus } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactDataDetailFair>({
    mode: "onChange",
  });

  // 今日の日付を取得
  const today = new Date();
  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);
  const todayDate = year + "-" + month + "-" + day;

  const [data, setData] = useState<ContactDataDetailFair>({
    title: title.replaceAll("<br>", " "),
    name: "",
    furigana: "",
    phone: "",
    email: "",
    date: todayDate,
    time: "",
    inquiry: "",
  });

  const validatePhone = (value: string) => {
    let boolean;
    if (value.match(/-/)) {
      boolean = value.match(/^0\d{1,3}-\d{2,4}-\d{3,4}$/);
    } else {
      boolean = value.match(/^0\d{9,10}$/);
    }
    return boolean !== null ? true : false;
  };

  const rules = {
    required: "未入力です。",
    maxLength: { value: 32, message: `32文字以内で入力してください。` },
    furiganaPattern: { value: /^[ァ-ヶー　]+$/i, message: "全角カタカナで入力してください。" },
    emailPattern: { value: /^\S+@\S+$/i, message: "メールアドレスを正しく入力してください。" },
    sameEmail: "メールアドレスが一致しません。",
    phone: "電話番号を正しく入力してください。",
  };

  const onSubmit: SubmitHandler<ContactDataDetailFair> = async (data) => {
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
        body: JSON.stringify({ ...data, title: title.replaceAll("<br>", " ") }),
      });
      const json = await res.json();

      if (handleStatus) handleStatus("success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={Styles.detailForm}>
      <div className={Styles.inputs}>
        <div className={Styles.inputBody}>
          <label className={`${Styles.label} ${Styles.require} ${Styles.disabled}`} htmlFor="title">
            フェア名
          </label>
          <div className={Styles.inputBlock}>
            <input className={Styles.input} id="title" {...register("title", {})} value={data.title} disabled />
            {errors.title && <span className={Styles.error}>{errors.title.message as string}</span>}
          </div>
        </div>
        <div className={Styles.inputBody}>
          <label className={`${Styles.label} ${Styles.require}`} htmlFor="name">
            お名前
          </label>
          <div className={Styles.inputBlock}>
            <input
              className={Styles.input}
              id="name"
              {...register("name", {
                required: rules.required,
                maxLength: rules.maxLength,
                onChange: (e) => {
                  setData({ ...data, name: e.target.value });
                },
              })}
              placeholder="例　山田　花子"
              value={data.name}
            />
            {errors.name && <span className={Styles.error}>{errors.name.message as string}</span>}
          </div>
        </div>
        <div className={Styles.inputBody}>
          <label className={`${Styles.label} ${Styles.require}`} htmlFor="furigana">
            お名前（フリガナ）
          </label>
          <div className={Styles.inputBlock}>
            <input
              className={Styles.input}
              id="furigana"
              {...register("furigana", {
                required: rules.required,
                maxLength: rules.maxLength,
                pattern: rules.furiganaPattern,
                onChange: (e) => {
                  setData({ ...data, furigana: e.target.value });
                },
              })}
              placeholder="例　ヤマダ　ハナコ"
              value={data.furigana}
            />
            {errors.furigana && <span className={Styles.error}>{errors.furigana.message as string}</span>}
          </div>
        </div>
        <div className={Styles.inputBody}>
          <label className={`${Styles.label} ${Styles.require}`} htmlFor="phone">
            電話番号
          </label>
          <div className={Styles.inputBlock}>
            <input
              className={Styles.input}
              id="phone"
              {...register("phone", {
                required: rules.required,
                validate: (value) => {
                  return validatePhone(value) || rules.phone;
                },
                onChange: (e) => {
                  setData({ ...data, phone: e.target.value });
                },
              })}
              placeholder="例　09012345678"
              value={data.phone}
            />
            {errors.phone && <span className={Styles.error}>{errors.phone.message as string}</span>}
          </div>
        </div>
        <div className={Styles.inputBody}>
          <label className={`${Styles.label} ${Styles.require}`} htmlFor="email">
            メールアドレス
          </label>
          <div className={Styles.inputBlock}>
            <input
              className={Styles.input}
              id="email"
              {...register("email", {
                required: rules.required,
                pattern: rules.emailPattern,
                onChange: (e) => {
                  setData({ ...data, email: e.target.value });
                },
              })}
              placeholder="例　abcd@lucrea"
              value={data.email}
            />
            {errors.email && <span className={Styles.error}>{errors.email.message as string}</span>}
          </div>
        </div>
        <div className={Styles.inputBlockGrid}>
          <div className={`${Styles.inputBody} ${Styles.inputDate}`}>
            <label className={`${Styles.label} ${Styles.require}`} htmlFor="date">
              ご来館希望日
            </label>
            <div className={Styles.inputBlockWrap}>
              <div className={`${Styles.inputBlock} ${Styles.triangle}`}>
                <input
                  className={`${Styles.input} ${Styles.date}`}
                  id="date"
                  {...register("date", {
                    required: rules.required,
                    onChange: (e) => {
                      setData({ ...data, date: e.target.value });
                    },
                  })}
                  type="date"
                  value={data.date}
                />
                {errors.date && <span className={Styles.error}>{errors.date.message as string}</span>}
              </div>
            </div>
          </div>

          <div className={`${Styles.inputBody} ${Styles.inputTime}`}>
            <label className={`${Styles.label} ${Styles.require}`} htmlFor="time">
              ご希望時間
            </label>
            <div className={Styles.inputBlockWrap}>
              <div className={`${Styles.inputBlock} ${Styles.triangle}`}>
                <input
                  className={`${Styles.input} ${Styles.time}`}
                  id="time"
                  {...register("time", {
                    required: rules.required,
                    onChange: (e) => {
                      setData({ ...data, time: e.target.value });
                    },
                  })}
                  type="time"
                  value={data.time}
                  list="data-time"
                />
                <datalist id="data-time">
                  <option value="09:00"></option>
                  <option value="09:30"></option>
                  <option value="10:00"></option>
                  <option value="10:30"></option>
                  <option value="11:00"></option>
                  <option value="11:30"></option>
                  <option value="12:00"></option>
                  <option value="12:30"></option>
                  <option value="13:00"></option>
                  <option value="13:30"></option>
                  <option value="14:00"></option>
                  <option value="14:30"></option>
                  <option value="15:00"></option>
                  <option value="15:30"></option>
                  <option value="16:00"></option>
                  <option value="16:30"></option>
                  <option value="17:00"></option>
                  <option value="17:30"></option>
                  <option value="18:00"></option>
                  <option value="18:30"></option>
                  <option value="19:00"></option>
                  <option value="19:30"></option>
                  <option value="20:00"></option>
                </datalist>

                {errors.time && <span className={Styles.error}>{errors.time.message as string}</span>}
              </div>
            </div>
          </div>
        </div>
        <div className={`${Styles.inputBody}`}>
          <label className={`${Styles.label}`} htmlFor="inquiry">
            ご希望・ご質問など
          </label>
          <div className={Styles.inputBlock}>
            <textarea
              className={`${Styles.input} ${Styles.inputInquiry}`}
              id="inquiry"
              {...register("inquiry", {
                onChange: (e) => {
                  setData({ ...data, inquiry: e.target.value });
                },
              })}
              placeholder="ご希望・ご質問などをご記載ください。"
              cols={50}
              rows={10}
              value={data.inquiry}
            ></textarea>
            {errors.inquiry && <span className={Styles.error}>{errors.inquiry.message as string}</span>}
          </div>
        </div>
      </div>

      <div className={Styles.button}>
        <button className={Styles.submit} type="submit">
          入力内容を確認
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

export default DetailFairFormInput;
