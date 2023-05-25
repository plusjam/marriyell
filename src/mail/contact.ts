import { ContactData } from "@/pages/contact";

export const ReplyToOperation = (body: ContactData) => {
  return {
    from: "welcome@lu-crea.jp",
    to: process.env.MAIL_ADDRESS,
    subject: `【問い合わせ通知】公式ページよりお問い合わせがありました。`,
    // text: body.inquiry + " | Sent from: " + body.email,
    html: `
    <p>ご担当者様</p>
    <p></p>
    <p>公式ページよりお問い合わせがありました。</p>
    <p>下記ご確認の上、ご対応頂けますようよろしくお願いいたします。</p>
    <p></p>
    <p>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</p>
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
    <p><b>【問い合わせ内容】</b></p>
    <p>${body.inquiry}</p>
    <p></p>
    <p>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</p>
    <p>※本メールは、公式ホームページより問い合わせがあった際の自動配信メールです。</p>
    `,
  };
};

export const ReplyToCustomer = (body: ContactData) => {
  return {
    from: "welcome@lu-crea.jp",
    to: body.email,
    subject: `【マリエール高崎】お問い合わせいただきありがとうございます。`,
    // text: body.inquiry + " | Sent from: " + body.email,
    html: `
    <p><b>${body.name}　様</b></p>
    <p></p>
    <p>この度は、マリエール高崎にお問合せ頂き、<br>
    誠に有難うございます。</p>
    <p>このメールは自動送信をさせていただいております。<br>
    お問合せ内容につきましては、<br>
    当会場スタッフより追ってご連絡差し上げます。</p>
    <p>下記の内容にて承りました。ご確認下さい。</p>
    <p>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</p>
    <p><b>【問い合わせ内容】</b></p>
    <p>${body.inquiry}</p>
    <p></p>
    <p>------------------------------</p>
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
    <p>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</p>
    <p>ーーーーーーーーーーーーーーーーーーーーーーー</p>
    <p>マリエール高崎│群馬・高崎の結婚式場</p>
    <p>群馬県高崎市飯塚町1361</p>
    <p>TEL：0120-362-241</p>
    <p>mail：takasaki@marriyellclub.co.jp</p>
    <p>URL：https://www.marriyellclub.co.jp/takasaki/</p>
    <p>ーーーーーーーーーーーーーーーーーーーーーーー</p>
    `,
  };
};
