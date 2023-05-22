import nodemailer from "nodemailer";

export const transporter = async () => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    await new Promise((resolve, reject) => {
      // verify connection configuration
      transporter.verify(function (error, success) {
        if (error) {
          console.log("メール認証でエラーが発生しました。", error);
          reject(error);
        } else {
          console.log("メール認証が成功しました。");
          resolve(success);
        }
      });
    });

    return transporter;
  } catch (error) {
    console.log("メール認証でエラーが発生しました。", error);
    throw error;
  }
};
