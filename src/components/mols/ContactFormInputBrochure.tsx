import { ContactBrochureData } from "@/pages/contact/brochure";
import Styles from "@/styles/orgs/ContactForm.module.scss";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { Step } from "../orgs/ContactForm";
import ContactPolicy from "../atoms/ContactPolicy";

type Props = {
  step1: boolean;
  handleStep: (step: Step) => void;
  contactBrochureData: ContactBrochureData;
  updateContactBrochureData: (data: ContactBrochureData) => void;
};

const ContactFormInputBrochure = (props: Props) => {
  const { step1, handleStep, contactBrochureData, updateContactBrochureData } = props;

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ContactBrochureData>({
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
    zipcodePattern: { value: /^\d{3}-?\d{4}$/, message: "郵便番号を正しく入力してください。" },
    sameEmail: "メールアドレスが一致しません。",
    phone: "電話番号を正しく入力してください。",
  };

  const onSubmit: SubmitHandler<ContactBrochureData> = (data) => {
    updateContactBrochureData(contactBrochureData);
    handleStep({ step1: false, step2: true, step3: false });

    // ページトップにスムーズにスクロール
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className={step1 ? `${Styles.section} ${Styles.on}` : Styles.section}>
      <div className={Styles.container}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={Styles.head}>
            <p className={Styles.p}>
              式場のパンフレットを
              <br className={Styles.sp} />
              無料でご提供しております。
            </p>
            <div className={Styles.document}>
              <figure className={Styles.figure}>
                <img src="/images/brochure_image.jpg" alt="scene's-pamphlet" loading="lazy" />
                <figcaption className={Styles.figcaption}>&lt; SCENE&apos;S PAMPHLET &gt;</figcaption>
              </figure>
            </div>
            <p className={Styles.description}>
              各項目をご入力後、「確認画面に進む」ボタンを押してください。
              <br /> 「<span className={Styles.color}>※</span>」の項目は必須事項です。
            </p>
          </div>
          <div className={Styles.option}>
            <dl className={Styles.optionInner}>
              <dt className={`${Styles.label} ${Styles.require}`}>資料請求方法</dt>
              <dd className={Styles.radio}>
                <label className={Styles.radioLabel} onClick={() => updateContactBrochureData({ ...contactBrochureData, type: "download" })}>
                  <input className={Styles.radioInput} type="radio" name="option" checked={contactBrochureData.type === "download"} />
                  <span className={Styles.radioText}>ダウンロード</span>
                </label>
                <label className={Styles.radioLabel} onClick={() => updateContactBrochureData({ ...contactBrochureData, type: "post" })}>
                  <input className={Styles.radioInput} type="radio" name="option" checked={contactBrochureData.type === "post"} />
                  <span className={Styles.radioText}>郵送</span>
                </label>
              </dd>
            </dl>
            <p className={Styles.radionote}>
              ※「ダウンロード」をお選び頂いた方は、入力完了画面にて資料をダウンロード頂けます。
              <br /> また、あわせてメールアドレス宛にダウンロードURLをお送りいたします。
              <br /> ※「郵送」をお選びいただいた方には、下記にてご記入いただいた住所にパンフレットをお送りいたします。
            </p>
          </div>

          {/* option ===  true*/}
          {contactBrochureData.type === "download" && (
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
                        updateContactBrochureData({ ...contactBrochureData, name: e.target.value });
                      },
                    })}
                    placeholder="例　山田　花子"
                    value={contactBrochureData.name}
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
                        updateContactBrochureData({ ...contactBrochureData, furigana: e.target.value });
                      },
                    })}
                    placeholder="例　ヤマダ　ハナコ"
                    value={contactBrochureData.furigana}
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
                        updateContactBrochureData({ ...contactBrochureData, phone: e.target.value });
                      },
                    })}
                    placeholder="例　09012345678"
                    value={contactBrochureData.phone}
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
                        updateContactBrochureData({ ...contactBrochureData, email: e.target.value });
                      },
                    })}
                    placeholder="例　abcd@marriyell"
                    value={contactBrochureData.email}
                  />
                  {errors.email && <span className={Styles.error}>{errors.email.message as string}</span>}
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
                        updateContactBrochureData({ ...contactBrochureData, inquiry: e.target.value });
                      },
                    })}
                    placeholder="ご希望・ご質問などをご記載ください。"
                    cols={50}
                    rows={5}
                    value={contactBrochureData.inquiry}
                  ></textarea>
                  {errors.inquiry && <span className={Styles.error}>{errors.inquiry.message as string}</span>}
                </div>
              </div>
            </div>
          )}
          {/* option === false */}
          {contactBrochureData.type === "post" && (
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
                        updateContactBrochureData({ ...contactBrochureData, name: e.target.value });
                      },
                    })}
                    placeholder="例　山田　花子"
                    value={contactBrochureData.name}
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
                        updateContactBrochureData({ ...contactBrochureData, furigana: e.target.value });
                      },
                    })}
                    placeholder="例　ヤマダ　ハナコ"
                    value={contactBrochureData.furigana}
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
                        updateContactBrochureData({ ...contactBrochureData, phone: e.target.value });
                      },
                    })}
                    placeholder="例　09012345678"
                    value={contactBrochureData.phone}
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
                        updateContactBrochureData({ ...contactBrochureData, email: e.target.value });
                      },
                    })}
                    placeholder="例　abcd@marriyell"
                    value={contactBrochureData.email}
                  />
                  {errors.email && <span className={Styles.error}>{errors.email.message as string}</span>}
                </div>
              </div>
              <div className={Styles.inputBody}>
                <label className={`${Styles.label} ${Styles.require}`} htmlFor="zipcode">
                  郵便番号
                </label>
                <div className={Styles.inputBlock}>
                  <input
                    className={`${Styles.input} ${Styles.half}`}
                    id="zipcode"
                    {...register("zipcode", {
                      required: rules.required,
                      pattern: rules.zipcodePattern,
                      onChange: (e) => {
                        updateContactBrochureData({ ...contactBrochureData, zipcode: e.target.value });
                      },
                    })}
                    placeholder="例　123-4567"
                    value={contactBrochureData.zipcode}
                  />
                  {errors.zipcode && <span className={Styles.error}>{errors.zipcode.message as string}</span>}
                </div>
              </div>
              <div className={Styles.inputBody}>
                <label className={`${Styles.label} ${Styles.require}`} htmlFor="address">
                  ご住所
                </label>
                <div className={Styles.inputBlock}>
                  <input
                    className={Styles.input}
                    id="address"
                    {...register("address", {
                      required: rules.required,
                      maxLength: rules.maxLength,
                      onChange: (e) => {
                        updateContactBrochureData({ ...contactBrochureData, address: e.target.value });
                      },
                    })}
                    placeholder="東京都千代田区千代田1-1"
                    value={contactBrochureData.address}
                  />
                  {errors.address && <span className={Styles.error}>{errors.address.message as string}</span>}
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
                        updateContactBrochureData({ ...contactBrochureData, inquiry: e.target.value });
                      },
                    })}
                    placeholder="ご希望・ご質問などをご記載ください。"
                    cols={50}
                    rows={5}
                    value={contactBrochureData.inquiry}
                  ></textarea>
                  {errors.inquiry && <span className={Styles.error}>{errors.inquiry.message as string}</span>}
                </div>
              </div>
            </div>
          )}

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

export default ContactFormInputBrochure;
