import { ContactBrochureData } from "@/pages/contact/brochure";

export const ReplyToOperation = (body: ContactBrochureData) => {
  return {
    from: "welcome@lu-crea.jp",
    to: process.env.MAIL_ADDRESS,
    subject: `【資料請求通知】公式ページより資料請求がありました。`,
    // text: body.inquiry + " | Sent from: " + body.email,
    html: `
    <p>ご担当者様</p>
    <p></p>
    <p>公式ページより資料請求がありました。</p>
    <p>下記ご確認の上、ご対応頂けますようよろしくお願いいたします。</p>
    <p></p>
    <p>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</p>
    <p><b>【ご希望の資料受取方法】</b></p>
    <p>${body.type === "download" ? "ダウンロード" : "資料請求"}</p>
    <p></p>
    <p><b>【お名前】</b></p>
    <p>${body.name}　様</p>
    <p></p>
    <p><b>【お名前（フリガナ）】</b></p>
    <p>${body.furigana}　様</p>
    <p></p>
    <p><b>【電話番号】</b></p>
    <p>${body.phone}</p>
    <p></p>
    <p><b>【メールアドレス】</b></p>
    <p>${body.email}</p>
    <p></p>
    <p><b>【ご住所】</b></p>
    <p>〒${body.zipcode}</p>
    <p>${body.address}</p>
    <p></p>
    <p><b>【ご希望・ご質問など】</b></p>
    <p>${body.inquiry}</p>
    <p></p>
    <p>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</p>
    <p>※本メールは、公式ホームページより資料請求があった際の自動配信メールです。</p>
    `,
  };
};

export const ReplyToCustomer = (body: ContactBrochureData) => {
  return {
    from: "welcome@lu-crea.jp",
    to: body.email,
    subject: `【ル・クレア】資料のご請求ありがとうございました。`,
    // text: body.inquiry + " | Sent from: " + body.email,
    html: `
    <p>${body.name}　様</p>
    <p></p>
    <p>この度は、ル・クレアへ</p>
    <p>資料のご請求を頂き、誠にありがとうございます。</p>
    <p></p>
    <p>このメールは自動送信をさせていただいております。</p>
    <p>お客様がご希望の資料請求方法にて、</p>
    <p>手配をさせていただきます。</p>
    <p></p>
    <p></p>
    <p><b>※ 資料のダウンロードをご希望のお客様 ※</b></p>
    <p>ダウンロードは下記のURLからダウンロードすることができます。</p>
    <p>＜ パンフレット＞　※8Mb</p>
    <p><a href="https://lu-crea.jp/images/pdf/pamphlet.pdf" download>pamphlet.pdf</a></p>
    <p></p>
    <p></p>
    <p><b>※ 資料の郵送をご希望のお客様 ※</b></p>
    <p>郵送の場合、資料の到着までに1週間前後かかる場合がございますが、</p>
    <p>何卒ご了承くださいますようお願い致します。</p>
    <p></p>
    <p>ーーーーーーーーーーーーーーーーーーーーーーー</p>
    <p>lu CREA -ル・クレア- │京都 福知山の結婚式場</p>
    <p>京都府福知山市駅南町3-52</p>
    <p>TEL：0773-24-1101</p>
    <p>mail：welcome@lu-crea.jp</p>
    <p>URL：https://lu-crea.jp/</p>
    <p>ーーーーーーーーーーーーーーーーーーーーーーー</p>
    `,
  };
};
