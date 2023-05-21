import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log("req.body", req.body);
    res.status(200).json({ statusCode: 200, message: "OK" });

    // 送信用アカウントの設定（ここではGmail）
    // const transporter = nodemailer.createTransport({
    //   host: process.env.MAIL_HOST,
    //   port: 465,
    //   secure: true,
    //   auth: {
    //     user: process.env.MAIL_ADDRESS,
    //     pass: process.env.MAIL_PASSWORD,
    //   },
    // });

    // await new Promise((resolve, reject) => {
    //   // verify connection configuration
    //   transporter.verify(function (error, success) {
    //     if (error) {
    //       console.log("エラーです", error);
    //       reject(error);
    //     } else {
    //       console.log("Server is ready to take our messages");
    //       resolve(success);
    //     }
    //   });
    // });

    // await new Promise((resolve, reject) => {
    //   // メール送信
    //   transporter.sendMail(
    //     {
    //       from: "info@test.jp",
    //       to: process.env.MAIL_ADDRESS,
    //       subject: `【ホームページよりお問い合わせ】${req.body.name}様より`,
    //       text: req.body.inquiry + " | Sent from: " + req.body.email,
    //       html: `
    //     <p>
    //       ホームページよりお問い合わせがありました。
    //     </p>
    //     <p>-----------------------------------------</p>
    //     <h2>お問い合わせ内容</h2>
    //     <p>名前：${req.body.name}</p>
    //     <p>フリガナ：${req.body.furigana}</p>
    //     <p>メールアドレス：${req.body.email}</p>
    //     <p>電話番号：${req.body.phone}</p>
    //     <p>問い合わせ内容：</p>
    //     <p>${req.body.inquiry}</p>
    //     <p>-----------------------------------------</p>
    //   `,
    //     },
    //     (err, info) => {
    //       if (err) {
    //         console.error(err);
    //         reject(err);
    //       } else {
    //         console.log(info);
    //         resolve(info);
    //       }
    //     }
    //   );
    // });

    // await new Promise((resolve, reject) => {
    //   // メール送信
    //   transporter.sendMail(
    //     {
    //       from: "info@test.jp",
    //       to: `${req.body.email}`,
    //       subject: `株式会社test お問い合わせ自動受付メール`,
    //       text: req.body.inquiry + " | Sent from: " + req.body.email,
    //       html: `
    //   <p>株式会社testへのお問合せが完了しました。</p>
    //   <p>お問合せ内容を確認し担当者よりご連絡いたします。</p>
    //   <p>-----------------------------------------</p>
    //   <h2>お問い合わせ内容</h2>
    //   <p>名前：${req.body.name}</p>
    //   <p>フリガナ：${req.body.furigana}</p>
    //   <p>メールアドレス：${req.body.email}</p>
    //   <p>電話番号：${req.body.phone}</p>
    //   <p>問い合わせ内容：</p>
    //   <p>${req.body.inquiry}</p>
    //   <p>-----------------------------------------</p>
    //   <p>※こちらは自動送信メールです。</p>
    // `,
    //     },
    //     (err, info) => {
    //       if (err) {
    //         console.error(err);
    //         reject(err);
    //       } else {
    //         console.log(info);
    //         resolve(info);
    //       }
    //     }
    //   );
    // });
  } catch (e) {
    res.status(500).json({ statusCode: 500, message: e.message });
  }
}
