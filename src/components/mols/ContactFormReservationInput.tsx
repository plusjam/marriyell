import { ContactReservationData, contactReservationData } from "@/pages/contact/reservation";
import Styles from "@/styles/orgs/ContactForm.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { Status } from "../../../libs/useApi";
import ContactPolicy from "../atoms/ContactPolicy";

type Props = {
  handleStatus: (status: Status) => void;
};

const ContactFormReservationInput = (props: Props) => {
  const { handleStatus } = props;

  const [R_contactFormReservationData, setR_contactFormReservationData] = useRecoilState<ContactReservationData>(contactReservationData);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactReservationData>({
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

  const onSubmit: SubmitHandler<ContactReservationData> = (data) => {
    setR_contactFormReservationData(data);
    handleStatus("confirm");

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
            <p className={Styles.description}>
              各項目をご入力後、「確認画面に進む」ボタンを押してください。
              <br /> 「<span className={Styles.color}>※</span>」の項目は必須事項です。
            </p>
          </div>
          <div className={Styles.inputs}>
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
                      setR_contactFormReservationData({ ...R_contactFormReservationData, name: e.target.value });
                    },
                  })}
                  placeholder="例　山田　花子"
                  value={R_contactFormReservationData.name}
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
                      setR_contactFormReservationData({ ...R_contactFormReservationData, furigana: e.target.value });
                    },
                  })}
                  placeholder="例　ヤマダ　ハナコ"
                  value={R_contactFormReservationData.furigana}
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
                      setR_contactFormReservationData({ ...R_contactFormReservationData, phone: e.target.value });
                    },
                  })}
                  placeholder="例　09012345678"
                  value={R_contactFormReservationData.phone}
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
                      setR_contactFormReservationData({ ...R_contactFormReservationData, email: e.target.value });
                    },
                  })}
                  placeholder="例　abcd@lucrea"
                  value={R_contactFormReservationData.email}
                />
                {errors.email && <span className={Styles.error}>{errors.email.message as string}</span>}
              </div>
            </div>
            <div className={Styles.inputBlockGrid}>
              <div className={`${Styles.inputBody} ${Styles.inputDate}`}>
                <label className={`${Styles.label} ${Styles.require}`} htmlFor="date">
                  ご希望日
                </label>
                <div className={Styles.inputBlockWrap}>
                  <div className={Styles.inputBlock}>
                    <div className={Styles.dateWrap}>
                      <input
                        className={`${Styles.input} ${Styles.date}`}
                        id="date"
                        {...register("date", {
                          required: rules.required,
                          onChange: (e) => {
                            setR_contactFormReservationData({ ...R_contactFormReservationData, date: e.target.value });
                          },
                        })}
                        type="date"
                        value={R_contactFormReservationData.date}
                      />
                      <img src="/images/icon_calendar.svg" alt="" width={30} height={30} />
                    </div>
                    {errors.date && <span className={Styles.error}>{errors.date.message as string}</span>}
                  </div>
                </div>
              </div>

              <div className={`${Styles.inputBody} ${Styles.inputTime}`}>
                <label className={`${Styles.label} ${Styles.require}`} htmlFor="hh">
                  ご希望日時間
                </label>
                <div className={Styles.inputBlockFlex}>
                  <div className={Styles.inputBlockWrap}>
                    <div className={Styles.inputBlock}>
                      <select
                        {...register("hh", {
                          required: rules.required,
                          onChange: (e) => {
                            setR_contactFormReservationData({ ...R_contactFormReservationData, hh: e.target.value });
                          },
                        })}
                        className={`${Styles.input} ${Styles.select}`}
                      >
                        <option value="9" selected>
                          9
                        </option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                      </select>
                      {errors.hh && <span className={Styles.error}>{errors.hh.message as string}</span>}
                    </div>
                    時
                  </div>
                  <div className={Styles.inputBlockWrap}>
                    <div className={Styles.inputBlock}>
                      <select
                        {...register("mm", {
                          required: rules.required,
                          onChange: (e) => {
                            setR_contactFormReservationData({ ...R_contactFormReservationData, hh: e.target.value });
                          },
                        })}
                        className={`${Styles.input} ${Styles.select}`}
                      >
                        <option value="00" selected>
                          00
                        </option>
                        <option value="30">30</option>
                      </select>
                      {errors.mm && <span className={Styles.error}>{errors.mm.message as string}</span>}
                    </div>
                    分
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
                お問いわせ内容
              </label>
              <div className={Styles.inputBlock}>
                <textarea
                  className={`${Styles.input} ${Styles.inputInquiry}`}
                  id="inquiry"
                  {...register("inquiry", {
                    onChange: (e) => {
                      setR_contactFormReservationData({ ...R_contactFormReservationData, inquiry: e.target.value });
                    },
                  })}
                  placeholder="お問い合わせ内容をご記載ください。"
                  cols={50}
                  rows={5}
                  value={R_contactFormReservationData.inquiry}
                ></textarea>
                {errors.inquiry && <span className={Styles.error}>{errors.inquiry.message as string}</span>}
              </div>
            </div>
          </div>

          <ContactPolicy />

          <div className={Styles.button}>
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

export default ContactFormReservationInput;
