import { IgApiClient } from "instagram-private-api";
import { NextApiRequest, NextApiResponse } from "next";

const ig = new IgApiClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  async function loginToInstagram(username: string, password: string) {
    console.log("1!!!!!!!!!!!!!!!!!");
    ig.state.generateDevice(username);
    console.log("2!!!!!!!!!!!!!!!!!");
    process.nextTick(async () => await ig.simulate.postLoginFlow());
    console.log("3!!!!!!!!!!!!!!!!!");
    const loggedInUser = await ig.account.login(username, password);
    console.log("4!!!!!!!!!!!!!!!!!");
    process.nextTick(async () => await ig.simulate.postLoginFlow());
    console.log("5!!!!!!!!!!!!!!!!!");
    return loggedInUser;
  }

  async function getUserPosts(username: string) {
    const userId = await ig.user.getIdByUsername(username);
    const userFeed = ig.feed.user(userId);
    const posts = await userFeed.items();
    return posts;
  }

  async function displayImages() {
    try {
      const username = process.env.IG_USERNAME;
      const password = process.env.IG_PASSWORD;

      if (!username || !password) throw new Error("Missing IG_USERNAME or IG_PASSWORD env var");

      await loginToInstagram(username, password);
      const posts = await getUserPosts(username);

      res.json(posts.map((post, index) => post.image_versions2.candidates[0].url));
    } catch (e) {
      console.log("エラーーーーーー", console.log(e));
    }
  }

  displayImages().catch(console.error);
}
