import { NextApiRequest, NextApiResponse } from "next";
export type FairList = {
  id: number;
  title: string;
  src: string;
  categories: {
    selected: boolean;
    src: string;
    label: string;
    slug: string;
  }[];
  events: {
    date: string;
  }[];
  description: string;
}[];

const Body: FairList = [
  {
    id: 1,
    title: "【新型コロナウイルス感染症対策】",
    src: "/images/bridal_fair02.jpg",
    description: "適当な説明文が入ります。文字数が長い場合は自動で長さ調整を行うように設定します。",
    categories: [
      {
        selected: false,
        src: "/images/icon_fair_new.svg",
        label: "初めての見学",
        slug: "new",
      },
      {
        selected: false,
        src: "/images/icon_fair_food.svg",
        label: "試食会つき",
        slug: "food",
      },
      {
        selected: false,
        src: "/images/icon_fair_season.svg",
        label: "季節・期間限定",
        slug: "season",
      },
      {
        selected: false,
        src: "/images/icon_fair_ceremony.svg",
        label: "挙式体験",
        slug: "ceremony",
      },
      {
        selected: true,
        src: "/images/icon_fair_dress.svg",
        label: "ドレス試着",
        slug: "dress",
      },
      {
        selected: false,
        src: "/images/icon_fair_weekends.svg",
        label: "土日祝開催",
        slug: "weekends",
      },
      {
        selected: true,
        src: "/images/icon_fair_weekdays.svg",
        label: "平日限定開催",
        slug: "weekdays",
      },
      {
        selected: false,
        src: "/images/icon_fair_online.svg",
        label: "オンライン相談会",
        slug: "online",
      },
    ],
    events: [{ date: "2023-05-20" }, { date: "2023-05-21" }, { date: "2023-06-03" }],
  },
  {
    id: 1,
    title: "【春のウェディングフェア】",
    src: "/images/bridal_fair02.jpg",
    description: "適当な説明文が入ります。文字数が長い場合は自動で長さ調整を行うように設定します。",
    categories: [
      {
        selected: false,
        src: "/images/icon_fair_new.svg",
        label: "初めての見学",
        slug: "new",
      },
      {
        selected: false,
        src: "/images/icon_fair_food.svg",
        label: "試食会つき",
        slug: "food",
      },
      {
        selected: false,
        src: "/images/icon_fair_season.svg",
        label: "季節・期間限定",
        slug: "season",
      },
      {
        selected: false,
        src: "/images/icon_fair_ceremony.svg",
        label: "挙式体験",
        slug: "ceremony",
      },
      {
        selected: true,
        src: "/images/icon_fair_dress.svg",
        label: "ドレス試着",
        slug: "dress",
      },
      {
        selected: false,
        src: "/images/icon_fair_weekends.svg",
        label: "土日祝開催",
        slug: "weekends",
      },
      {
        selected: true,
        src: "/images/icon_fair_weekdays.svg",
        label: "平日限定開催",
        slug: "weekdays",
      },
      {
        selected: true,
        src: "/images/icon_fair_online.svg",
        label: "オンライン相談会",
        slug: "online",
      },
    ],
    events: [{ date: "2023-05-03" }, { date: "2023-05-04" }],
  },
  {
    id: 1,
    title: "【オンライン見学会】",
    src: "/images/bridal_fair02.jpg",
    description: "適当な説明文が入ります。文字数が長い場合は自動で長さ調整を行うように設定します。",
    categories: [
      {
        selected: true,
        src: "/images/icon_fair_new.svg",
        label: "初めての見学",
        slug: "new",
      },
      {
        selected: false,
        src: "/images/icon_fair_food.svg",
        label: "試食会つき",
        slug: "food",
      },
      {
        selected: false,
        src: "/images/icon_fair_season.svg",
        label: "季節・期間限定",
        slug: "season",
      },
      {
        selected: false,
        src: "/images/icon_fair_ceremony.svg",
        label: "挙式体験",
        slug: "ceremony",
      },
      {
        selected: true,
        src: "/images/icon_fair_dress.svg",
        label: "ドレス試着",
        slug: "dress",
      },
      {
        selected: false,
        src: "/images/icon_fair_weekends.svg",
        label: "土日祝開催",
        slug: "weekends",
      },
      {
        selected: true,
        src: "/images/icon_fair_weekdays.svg",
        label: "平日限定開催",
        slug: "weekdays",
      },
      {
        selected: true,
        src: "/images/icon_fair_online.svg",
        label: "オンライン相談会",
        slug: "online",
      },
    ],
    events: [{ date: "2023-05-05" }, { date: "2023-05-06" }],
  },
  {
    id: 1,
    title: "【フードフェスティバル】",
    src: "/images/bridal_fair02.jpg",
    description: "適当な説明文が入ります。文字数が長い場合は自動で長さ調整を行うように設定します。",
    categories: [
      {
        selected: true,
        src: "/images/icon_fair_new.svg",
        label: "初めての見学",
        slug: "new",
      },
      {
        selected: false,
        src: "/images/icon_fair_food.svg",
        label: "試食会つき",
        slug: "food",
      },
      {
        selected: false,
        src: "/images/icon_fair_season.svg",
        label: "季節・期間限定",
        slug: "season",
      },
      {
        selected: false,
        src: "/images/icon_fair_ceremony.svg",
        label: "挙式体験",
        slug: "ceremony",
      },
      {
        selected: true,
        src: "/images/icon_fair_dress.svg",
        label: "ドレス試着",
        slug: "dress",
      },
      {
        selected: false,
        src: "/images/icon_fair_weekends.svg",
        label: "土日祝開催",
        slug: "weekends",
      },
      {
        selected: true,
        src: "/images/icon_fair_weekdays.svg",
        label: "平日限定開催",
        slug: "weekdays",
      },
      {
        selected: true,
        src: "/images/icon_fair_online.svg",
        label: "オンライン相談会",
        slug: "online",
      },
    ],
    events: [{ date: "2023-05-07" }, { date: "2023-05-08" }, { date: "2023-06-03" }],
  },
  {
    id: 1,
    title: "【ドレス試着会】",
    src: "/images/bridal_fair02.jpg",
    description: "適当な説明文が入ります。文字数が長い場合は自動で長さ調整を行うように設定します。",
    categories: [
      {
        selected: false,
        src: "/images/icon_fair_new.svg",
        label: "初めての見学",
        slug: "new",
      },
      {
        selected: false,
        src: "/images/icon_fair_food.svg",
        label: "試食会つき",
        slug: "food",
      },
      {
        selected: false,
        src: "/images/icon_fair_season.svg",
        label: "季節・期間限定",
        slug: "season",
      },
      {
        selected: false,
        src: "/images/icon_fair_ceremony.svg",
        label: "挙式体験",
        slug: "ceremony",
      },
      {
        selected: false,
        src: "/images/icon_fair_dress.svg",
        label: "ドレス試着",
        slug: "dress",
      },
      {
        selected: false,
        src: "/images/icon_fair_weekends.svg",
        label: "土日祝開催",
        slug: "weekends",
      },
      {
        selected: true,
        src: "/images/icon_fair_weekdays.svg",
        label: "平日限定開催",
        slug: "weekdays",
      },
      {
        selected: false,
        src: "/images/icon_fair_online.svg",
        label: "オンライン相談会",
        slug: "online",
      },
    ],
    events: [{ date: "2023-05-09" }, { date: "2023-05-10" }],
  },
  {
    id: 1,
    title: "【フードフェスティバル】",
    src: "/images/bridal_fair02.jpg",
    description: "適当な説明文が入ります。文字数が長い場合は自動で長さ調整を行うように設定します。",
    categories: [
      {
        selected: true,
        src: "/images/icon_fair_new.svg",
        label: "初めての見学",
        slug: "new",
      },
      {
        selected: false,
        src: "/images/icon_fair_food.svg",
        label: "試食会つき",
        slug: "food",
      },
      {
        selected: false,
        src: "/images/icon_fair_season.svg",
        label: "季節・期間限定",
        slug: "season",
      },
      {
        selected: false,
        src: "/images/icon_fair_ceremony.svg",
        label: "挙式体験",
        slug: "ceremony",
      },
      {
        selected: true,
        src: "/images/icon_fair_dress.svg",
        label: "ドレス試着",
        slug: "dress",
      },
      {
        selected: false,
        src: "/images/icon_fair_weekends.svg",
        label: "土日祝開催",
        slug: "weekends",
      },
      {
        selected: true,
        src: "/images/icon_fair_weekdays.svg",
        label: "平日限定開催",
        slug: "weekdays",
      },
      {
        selected: true,
        src: "/images/icon_fair_online.svg",
        label: "オンライン相談会",
        slug: "online",
      },
    ],
    events: [{ date: "2023-05-20" }],
  },
  {
    id: 1,
    title: "【ドレス試着会】",
    src: "/images/bridal_fair02.jpg",
    description: "適当な説明文が入ります。文字数が長い場合は自動で長さ調整を行うように設定します。",
    categories: [
      {
        selected: false,
        src: "/images/icon_fair_new.svg",
        label: "初めての見学",
        slug: "new",
      },
      {
        selected: false,
        src: "/images/icon_fair_food.svg",
        label: "試食会つき",
        slug: "food",
      },
      {
        selected: false,
        src: "/images/icon_fair_season.svg",
        label: "季節・期間限定",
        slug: "season",
      },
      {
        selected: false,
        src: "/images/icon_fair_ceremony.svg",
        label: "挙式体験",
        slug: "ceremony",
      },
      {
        selected: false,
        src: "/images/icon_fair_dress.svg",
        label: "ドレス試着",
        slug: "dress",
      },
      {
        selected: false,
        src: "/images/icon_fair_weekends.svg",
        label: "土日祝開催",
        slug: "weekends",
      },
      {
        selected: true,
        src: "/images/icon_fair_weekdays.svg",
        label: "平日限定開催",
        slug: "weekdays",
      },
      {
        selected: false,
        src: "/images/icon_fair_online.svg",
        label: "オンライン相談会",
        slug: "online",
      },
    ],
    events: [{ date: "2023-05-21" }, { date: "2023-05-28" }],
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const categories = req.body;
    let newArray = [...Body];

    // if (categories !== '["all"]' || categories !== "[]") {
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
