import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const igMediaId = process.env.IG_MEDIA_ID;
    const igToken = process.env.IG_TOKEN;
    const version = `17.0`;
    const url = `https://graph.facebook.com/v${version}/${igMediaId}/?fields=id,followers_count,media_count,ig_id,media.limit(6){caption,media_url,thumbnail_url,permalink,media_type,like_count,comments_count,timestamp,id}&access_token=${igToken}`;

    const reportRes = await axios.get(url);
    const data = reportRes.data;

    res.status(200).json(data.media.data);
  } catch (e) {
    res.status(500).json({ status: 500, message: e });
  }
}
