import { NewsCategory, NewsContents } from "../../typings/news";

export const NEWS: { category: NewsCategory[]; contents: NewsContents[] } = {
  category: [
    {
      label: "すべて",
      slug: "all",
      checked: true,
    },
    {
      label: "お知らせ",
      slug: "news",
      checked: false,
    },
    {
      label: "イベント",
      slug: "event",
      checked: false,
    },
    {
      label: "メディア情報",
      slug: "media",
      checked: false,
    },
    {
      label: "コロナ対策",
      slug: "covid",
      checked: false,
    },
  ],
  contents: [
    {
      id: 1,
      src: "/images/sample124.jpg",
      category: [
        {
          label: "お知らせ",
          slug: "news",
        },
        {
          label: "イベント",
          slug: "event",
        },
      ],
      publishDate: "2021-01-01",
      createdDate: "2021-01-01",
      updatedDate: "2021-01-01",
      title: "【結婚式場でランチ】　5月17日12：00　大人1,500円",
      description: "シーンズランチ1月OPEN 月に１度だけのランチを開催5月17日（水曜日）12:00 「結婚式だけでなく、シーンズに食べに行ける機会があれば嬉しい！！」「結婚式…",
    },
    {
      id: 2,
      src: "/images/sample124.jpg",
      category: [
        {
          label: "お知らせ",
          slug: "news",
        },
        {
          label: "イベント",
          slug: "event",
        },
      ],
      publishDate: "2021-01-02",
      createdDate: "2021-01-02",
      updatedDate: "2021-01-02",
      title: "【結婚式場でディナー】　5月18日18：00　大人2,500円",
      description: "シーンズディナー1月OPEN 月に１度だけのディナーを開催5月18日（木曜日）18:00 「結婚式だけでなく、シーンズに食べに行ける機会があれば嬉しい！！」「結婚式…",
    },
    {
      id: 3,
      src: "/images/sample124.jpg",
      category: [
        {
          label: "お知らせ",
          slug: "news",
        },
        {
          label: "メディア情報",
          slug: "media",
        },
      ],
      publishDate: "2021-02-05",
      createdDate: "2021-02-05",
      updatedDate: "2021-02-05",
      title: "【メディア掲載】雑誌「ウェディング」4月号に掲載されました！",
      description: "ウェディング雑誌「ウェディング」4月号にシーンズが掲載されました！ 素敵なページで紹介されておりますので、ぜひご覧ください。",
    },
    {
      id: 4,
      src: "/images/sample124.jpg",
      category: [
        {
          label: "イベント",
          slug: "event",
        },
      ],
      publishDate: "2021-03-15",
      createdDate: "2021-03-15",
      updatedDate: "2021-03-15",
      title: "【ブライダルフェア】4月10日開催！結婚式の準備を一緒に始めましょう！",
      description: "4月10日にブライダルフェアを開催いたします。当日は、会場見学や料理試食、ドレス試着などができます。ぜひお越しください。",
    },
    {
      id: 5,
      src: "/images/sample124.jpg",
      category: [
        {
          label: "コロナ対策",
          slug: "covid",
        },
      ],
      publishDate: "2021-04-20",
      createdDate: "2021-04-20",
      updatedDate: "2021-04-20",
      title: "【コロナ対策】シーンズの安全対策について",
      description: "シーンズでは、新型コロナウイルスの感染拡大防止対策として、徹底した消毒・換気を行っております。お客様に安心してご来場いただけるよう、努めてまいります。",
    },
    {
      id: 6,
      src: "/images/sample124.jpg",
      category: [
        {
          label: "イベント",
          slug: "event",
        },
      ],
      publishDate: "2021-05-25",
      createdDate: "2021-05-25",
      updatedDate: "2021-05-25",
      title: "【夏のスペシャルフェア】8月1日開催！素敵な夏の結婚式を一緒に計画しましょう！",
      description: "8月1日に夏のスペシャルフェアを開催いたします。当日は、会場見学や料理試食、ドレス試着などができます。ぜひお越しください。",
    },
    {
      id: 7,
      src: "/images/sample124.jpg",
      category: [
        {
          label: "お知らせ",
          slug: "news",
        },
      ],
      publishDate: "2021-06-10",
      createdDate: "2021-06-10",
      updatedDate: "2021-06-10",
      title: "【新プラン】シーンズの新しい結婚式プランが登場！",
      description: "シーンズでは、お客様のご要望に応じて新しい結婚式プランをご用意いたしました。詳細はお問い合わせください。",
    },
    {
      id: 8,
      src: "/images/sample124.jpg",
      category: [
        {
          label: "メディア情報",
          slug: "media",
        },
      ],
      publishDate: "2021-07-15",
      createdDate: "2021-07-15",
      updatedDate: "2021-07-15",
      title: "【テレビ出演】シーンズが地元テレビ局で紹介されました！",
      description: "地元テレビ局にて、シーンズが紹介されました！放送内容はウェブサイトでご覧いただけます。",
    },
    {
      id: 9,
      src: "/images/sample124.jpg",
      category: [
        {
          label: "お知らせ",
          slug: "news",
        },
        {
          label: "イベント",
          slug: "event",
        },
      ],
      publishDate: "2021-08-30",
      createdDate: "2021-08-30",
      updatedDate: "2021-08-30",
      title: "【秋のブライダルフェア】9月15日開催！美しい秋の結婚式を一緒に計画しましょう！",
      description: "9月15日に秋のブライダルフェアを開催いたします。当日は、会場見学や料理試食、ドレス試着などができます。ぜひお越しください。",
    },
    {
      id: 10,
      src: "/images/sample124.jpg",
      category: [
        {
          label: "コロナ対策",
          slug: "covid",
        },
      ],
      publishDate: "2021-09-20",
      createdDate: "2021-09-20",
      updatedDate: "2021-09-20",
      title: "【コロナ対策】シーンズの対策強化について",
      description: "シーンズでは、新型コロナウイルスの感染拡大防止対策をさらに強化しました。お客様に安心してご来場いただけるよう、最善を尽くしてまいります。",
    },
  ],
};
