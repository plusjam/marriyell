import { ContactReservationData } from "@/pages/contact/reservation";

export const ReplyToOperation = (body: ContactReservationData) => {
  return {
    from: "welcome@lu-crea.jp",
    to: process.env.MAIL_ADDRESS,
    subject: `【来館予約通知】公式ページより来場予約がありました。`,
    // text: body.inquiry + " | Sent from: " + body.email,
    html: `
    <p>ご担当者様</p>
    <p></p>
    <p>公式ページより来館予約がありました。</p>
    <p>下記、ご対応の程よろしくお願いいたします。</p>
    <p></p>
    <p>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</p>
    <p><b>【お名前】</b></p>
    <p>　${body.name}　様</p>
    <p></p>
    <p><b>【お名前（フリガナ）】</b></p>
    <p>　${body.furigana}　様</p>
    <p></p>
    <p><b>【電話番号】</b></p>
    <p>　${body.phone}</p>
    <p></p>
    <p><b>【メールアドレス】</b></p>
    <p>　${body.email}</p>
    <p></p>
    <p><b>【ご来場希望日】</b></p>
    <p>　${body.date}　${body.hh}時 ${body.mm}分</p> 
    <p></p>
    <p><b>【ご希望・ご質問など】</b></p>
    <p>　${body.inquiry}</p>
    <p></p>
    <p>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</p>
    <p>※本メールは、公式ホームページより来場予約があった際の自動配信メールです。</p>
    `,
  };
};

export const ReplyToCustomer = (body: ContactReservationData) => {
  return {
    from: "welcome@lu-crea.jp",
    to: body.email,
    subject: `【ル・クレア】来館のご予約ありがとうございます。`,
    // text: body.inquiry + " | Sent from: " + body.email,
    html: `
    <p>${body.name}　様</p>
    <p></p>
    <p>この度は、ル・クレアへ来館のご予約、</p>
    <p>誠にありがとうございます。</p>
    <p>このメールは自動送信をさせていただいております。</p>
    <p>ご予約内容の確認・確定の為、追ってご連絡申し上げます。</p>
    <p>下記の内容にて承りました。ご確認ください。</p>
    <p></p>
    <p>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</p>
    <p><b>【ご来場希望日】</b></p>
    <p>　${body.date}　${body.hh}時 ${body.mm}分</p> 
    <p></p>
    <p><b>【ご希望・ご質問など】</b></p>
    <p>　${body.inquiry}</p>
    <p></p>
    <p>------------------------------</p>
    <p><b>【お名前】</b></p>
    <p>　${body.name}　様</p>
    <p></p>
    <p><b>【フリガナ】</b></p>
    <p>　${body.furigana}　様</p>
    <p></p>
    <p><b>【電話番号】</b></p>
    <p>　${body.phone}</p>
    <p></p>
    <p><b>【メールアドレス】</b></p>
    <p>　${body.email}</p>
    <p></p>
    <p>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</p>
    <p>ご予約は、当会場スタッフからの返信をもって</p>
    <p>正式に受付完了とさせていただきます。</p>
    <p></p>
    <p>尚、こちらの予約フォームから前日、当日のご予約をされた場合、</p>
    <p>ご案内が出来ない場合がございます。大変お手数ではございますが、</p>
    <p>お電話にて当会場までご連絡をお願いいたします。</p>
    <p></p>
    <p>何卒よろしくお願いいたします。</p>
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
