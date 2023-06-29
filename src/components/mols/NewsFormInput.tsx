import Styles from "@/styles/orgs/ContactForm.module.scss";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { Status } from "../../../libs/useApi";
import { NewsList } from "../../../typings/news";
import { ContactDataNews } from "@/pages/news/[id]";

type Props = {
  handleStatus: (status: Status) => void;
  data: ContactDataNews;
  handleData: (data: ContactDataNews) => void;
  time?: NewsList["time"];
  date?: NewsList["date"];
  formType: NewsList["form"]["select"][0];
};

const NewsFormInput = (props: Props) => {
  const { handleStatus, data, handleData, time, date, formType } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactDataNews>({
    mode: "onChange",
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

  const onSubmit: SubmitHandler<ContactDataNews> = async () => {
    // トップからreservationまでの高さを取得
    const reservationTopPosition = document.getElementById("reservation") as HTMLElement;
    const reservationTop = reservationTopPosition?.getBoundingClientRect().top + window.pageYOffset;

    // reservationTopの位置までスクロール
    window.scrollTo({ top: reservationTop - 80, behavior: "smooth" });

    if (handleStatus) handleStatus("confirm");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={Styles.detailForm}>
      <div className={Styles.inputs}>
        <div className={Styles.inputBody}>
          <label className={`${Styles.label} ${Styles.require} ${Styles.disabled}`} htmlFor="title">
            イベント名
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
                  handleData({ ...data, name: e.target.value });
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
                  handleData({ ...data, furigana: e.target.value });
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
                  handleData({ ...data, phone: e.target.value });
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
                  handleData({ ...data, email: e.target.value });
                },
              })}
              placeholder="例　abcd@marriyell"
              value={data.email}
            />
            {errors.email && <span className={Styles.error}>{errors.email.message as string}</span>}
          </div>
        </div>
        {formType === "フォームあり 日付け[有]" && (
          <div className={Styles.inputBlockGrid}>
            <div className={`${Styles.inputBody} ${Styles.inputDate}`}>
              <label className={`${Styles.label} ${Styles.require}`} htmlFor="date">
                ご来館希望日
              </label>
              <div className={Styles.inputBlockWrap}>
                <div className={`${Styles.inputBlock} ${Styles.triangle}`}>
                  <select
                    {...register("date", {
                      required: rules.required,
                      onChange: (e) => {
                        handleData({ ...data, date: e.target.value });
                      },
                    })}
                    className={`${Styles.input} ${Styles.select}`}
                  >
                    {data
                      ? date?.values.map((option, index) => {
                          // 今日の日付よりも前の日付の場合はreturn
                          const today = new Date();
                          const optionDate = new Date(option);
                          if (optionDate < today) return;
                          return (
                            <option value={option} key={`${index}`} selected={data.date === option}>
                              {option}
                            </option>
                          );
                        })
                      : null}
                  </select>
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
                  <select
                    {...register("time", {
                      required: rules.required,
                      onChange: (e) => {
                        handleData({ ...data, time: e.target.value });
                      },
                    })}
                    className={`${Styles.input} ${Styles.select}`}
                    value={data.time}
                  >
                    {time
                      ? time.map((option, index) => {
                          return (
                            <option value={`${option.values.hour}:${option.values.minutes}`} key={`${index}`}>
                              {`${option.values.hour}:${option.values.minutes}`}
                            </option>
                          );
                        })
                      : null}
                  </select>

                  {errors.time && <span className={Styles.error}>{errors.time.message as string}</span>}
                </div>
              </div>
            </div>
          </div>
        )}
        <div className={`${Styles.inputBody}`}>
          <label className={`${Styles.label}`} htmlFor="inquiry">
            ご質問・ご要望
          </label>
          <div className={Styles.inputBlock}>
            <textarea
              className={`${Styles.input} ${Styles.inputInquiry}`}
              id="inquiry"
              {...register("inquiry", {
                onChange: (e) => {
                  handleData({ ...data, inquiry: e.target.value });
                },
              })}
              placeholder="ご質問・ご要望をご記載ください。"
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
    </form>
  );
};

export default NewsFormInput;
