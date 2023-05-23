import { ReplyToCustomer, ReplyToOperation } from "@/mail/contact";
import { transporter } from "@/mail/transporter";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // 送信用アカウントの設定
    const TRANSPORTER = await transporter();

    // 運営側へ送信
    await new Promise((resolve, reject) => {
      // メール送信
      TRANSPORTER.sendMail(ReplyToOperation(req.body), (err, info) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.log(info);
          resolve(info);
        }
      });
    });

    // お客様へ送信
    await new Promise((resolve, reject) => {
      // メール送信
      TRANSPORTER.sendMail(ReplyToCustomer(req.body), (err, info) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.log(info);
          resolve(info);
        }
      });
    });
    res.status(200).json({ statusCode: 200, message: "OK" });
  } catch (e) {
    res.status(500).json({ statusCode: 500, message: "e.message" });
  }
}
