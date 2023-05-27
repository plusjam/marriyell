import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { ReportLists } from "../../../../typings/report";
import { apricotClient } from "../../../../libs/cms";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const offset = req.body.offset;

  console.log("offset", offset);

  const accessKey = process.env.API_KEY;
  const secretKey = process.env.API_SECRET;
  const token = await apricotClient(accessKey, secretKey);

  try {
    const reportUrl = `${process.env.CMS_URL}/api/v1/report?limit=12&offset=${offset}`;
    const reportRes: { data: ReportLists } = await axios.get(reportUrl, {
      headers: {
        "Content-Type": "application/json",
        "account-access-key": accessKey,
        "account-secret-key": secretKey,
        authorization: `Bearer ${token.token}`,
      },
    });

    res.status(200).json(reportRes.data);
  } catch (e) {
    res.status(500).json({ statusCode: 500, message: "e.message" });
  }
}
