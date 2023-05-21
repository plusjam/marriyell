import axios from "axios";

export const apricotClient = async (accessKey: string | undefined, secretKey: string | undefined) => {
  // const accessKey = process.env.API_KEY;
  // const secretKey = process.env.API_SECRET;

  if (!accessKey || !secretKey) {
    throw new Error("Access key or Secret key is missing");
  }

  try {
    const cms = await axios.post(
      `${process.env.CMS_URL}/api/v1/authentication`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          "account-access-key": accessKey,
          "account-secret-key": secretKey,
        },
      }
    );

    return await cms.data;
  } catch (error) {
    console.log("トークン取得エラー", error);
  }
};
