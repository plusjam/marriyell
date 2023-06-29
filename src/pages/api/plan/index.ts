import { NextApiRequest, NextApiResponse } from "next";
export type PlanLists = {
  id: number;
  src: string;
  title: string;
  member: number;
  price: number;
  categories: {
    selected: boolean;
    label: string;
    slug: string;
  }[];
  term: string;
}[];

const Body: PlanLists = [
  {
    id: 1,
    src: "/images/plan_1.png",
    title: "挙式料＆衣裳無料！40名約215万円⇒135万円<br>特別演出もプレゼント",
    member: 40,
    price: 1352100,
    categories: [
      {
        selected: false,
        label: "大人数可",
        slug: "many",
      },
      {
        selected: true,
        label: "家族婚・少人数",
        slug: "less",
      },
      {
        selected: false,
        label: "フォト婚",
        slug: "photo",
      },
      {
        selected: false,
        label: "期間限定",
        slug: "limited",
      },
    ],
    term: "10名よりご利用いただけます　※1名様増減　16,940円",
  },
  {
    id: 2,
    src: "/images/plan_1.png",
    title: "挙式料＆衣裳無料！40名約215万円⇒135万円<br>特別演出もプレゼント",
    member: 40,
    price: 1352100,
    categories: [
      {
        selected: false,
        label: "大人数可",
        slug: "many",
      },
      {
        selected: true,
        label: "家族婚・少人数",
        slug: "less",
      },
      {
        selected: false,
        label: "フォト婚",
        slug: "photo",
      },
      {
        selected: false,
        label: "期間限定",
        slug: "limited",
      },
    ],
    term: "10名よりご利用いただけます　※1名様増減　16,940円",
  },
  {
    id: 3,
    src: "/images/plan_1.png",
    title: "挙式料＆衣裳無料！40名約215万円⇒135万円<br>特別演出もプレゼント",
    member: 40,
    price: 1352100,
    categories: [
      {
        selected: false,
        label: "大人数可",
        slug: "many",
      },
      {
        selected: true,
        label: "家族婚・少人数",
        slug: "less",
      },
      {
        selected: false,
        label: "フォト婚",
        slug: "photo",
      },
      {
        selected: false,
        label: "期間限定",
        slug: "limited",
      },
    ],
    term: "10名よりご利用いただけます　※1名様増減　16,940円",
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const categories = req.body;
    let newArray = [...Body];

    // if (categories !== '["all"]' && categories !== "[]") {
    //   const json: string[] = JSON.parse(categories);

    //   const filterd = newArray.filter((item) => {
    //     return item.categories.some((category) => {
    //       if (!json.includes(category.slug)) return;
    //       return category.selected;
    //     });
    //   });

    //   newArray = filterd;
    // }

    res.status(200).json(newArray);
  } catch (e) {
    res.status(500).json({ status: 500, message: e });
  }
}
