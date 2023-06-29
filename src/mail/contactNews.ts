import { ContactDataNews } from "@/pages/news/[id]";

export const ReplyToOperation = (body: ContactDataNews) => {
  return {
    from: "takasaki@marriyellclub.co.jp",
    to: process.env.MAIL_ADDRESS,
    subject: `【イベント予約通知】公式ページよりイベントのご予約がありました。`,
    // text: body.inquiry + " | Sent from: " + body.email,
    html: `
      <p>ご担当者様</p>
      <p></p>
      <p>公式ページよりイベントのご予約がありました。</p>
      <p>ご対応の程よろしくお願いいたします。</p>
      <p>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</p>
      <p></p>
      <p><b>【イベント名】</b></p>
      <p>　${body.title}</p>
      <p></p>
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
      ${
        body.date &&
        body.time &&
        `
          <p><b>【ご来場希望日】</b></p>
          <p>　${body.date}　${body.time}</p>
          <p></p>
          `
      }
      <p><b>【ご質問・ご要望】</b></p>
      <p>　${body.inquiry}</p>
      <p></p>
      <p>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</p>
      <p></p>
      <p>※本メールは、公式ホームページよりイベントのご予約があった際の自動配信メールです。</p>
    `,
  };
};

export const ReplyToCustomer = (body: ContactDataNews) => {
  return {
    from: "takasaki@marriyellclub.co.jp",
    to: body.email,
    subject: `【マリエール高崎】イベントのご予約ありがとうございました。`,
    // text: body.inquiry + " | Sent from: " + body.email,
    html: `
    <p>${body.name}　様</p>
    <p></p>
    <p>この度は、マリエール高崎ブライダルイベントのご予約、</p>
    <p>誠にありがとうございます。</p>
    <p></p>
    <p>このメールは自動送信をさせていただいております。</p>
    <p>ご予約内容の確認・確定の為、当会場スタッフより</p>
    <p>追ってご連絡申し上げます。</p>
    <p></p>
    <p>下記の内容にて承りました。ご確認下さい。</p>
    <p>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</p>
    <p></p>
    <p><b>【イベント名】</b></p>
    <p>　${body.title}</p>
    <p></p>
    ${
      body.date &&
      body.time &&
      `
          <p><b>【ご来場希望日】</b></p>
          <p>　${body.date}　${body.time}</p>
          <p></p>
        `
    }
    <p><b>【ご質問・ご要望】</b></p>
    <p>　${body.inquiry}</p>
    <p></p>
    <p>------------------------------</p>
    <p></p>
    <p><b>【ご予約のお名前】</b></p>
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
    <p>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</p>
    <p></p>
    <p>ご予約は、当会場スタッフからの返信をもって</p>
    <p>正式に受付完了とさせていただきます。</p>
    <p></p>
    <p>尚、こちらの予約フォームから前日、当日のご予約をされた場合、</p>
    <p>ご案内できない場合がございます。大変お手数ではございますが、</p>
    <p>お電話にて当会場までご連絡をお願いいたします。</p>
    <p></p>
    <p>何卒よろしくお願いいたします。</p>
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
