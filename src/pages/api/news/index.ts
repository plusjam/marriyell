import { NextApiRequest, NextApiResponse } from "next";
import { apricotClient } from "../../../../libs/cms";
import { NewsLists } from "../../../../typings/news";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const offset = req.body.offset;
  const q = req.body.q;

  const accessKey = process.env.API_KEY;
  const secretKey = process.env.API_SECRET;
  const token = await apricotClient(accessKey, secretKey);

  if (!token) return res.status(500).json({ statusCode: 500, message: "トークン取得エラー" });

  try {
    const newsUrl = `${process.env.CMS_URL}/api/v1/news?offset=${offset}&limit=5&q=${encodeURI(q)}`;
    const newsRes: { data: NewsLists } = await axios.get(newsUrl, {
      headers: {
        "Content-Type": "application/json",
        "account-access-key": accessKey,
        "account-secret-key": secretKey,
        authorization: `Bearer ${token.token}`,
      },
    });

    res.status(200).json(newsRes.data);
  } catch (e) {
    res.status(500).json({ statusCode: 500, message: e });
  }
}
