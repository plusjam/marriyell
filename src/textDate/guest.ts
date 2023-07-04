export type Content = {
  title: string;
  contentTitle: string;
  caption: string;
  table: {
    title: string;
    prices: {
      title: string;
      price: number;
      just: boolean;
    }[];
    isIrregular?: boolean;
  }[];
  src: string;
  banners: string[];
};

export const DRESS: Content = {
  title: "レンタル衣装",
  contentTitle: "衣裳のレンタルはコスチュームサロンにて<br>承っております",
  caption: "衣裳のレンタルは当館にございます<br>コスチュームサロンにて承っております<br>親御様の留袖やモーニングをはじめ<br>ご親族やお子様の衣裳など 幅広く取り揃えております",
  table: [
    {
      title: "内容",
      prices: [
        {
          title: "江戸褄",
          price: 22000,
          just: false,
        },
        {
          title: "モーニング",
          price: 22000,
          just: true,
        },
        {
          title: "お父様紋服",
          price: 44000,
          just: false,
        },
        {
          title: "ゲスト中振袖",
          price: 66000,
          just: false,
        },
        {
          title: "お子様衣装",
          price: 5500,
          just: true,
        },
      ],
    },
  ],
  src: "/images/guest_dress.jpg",
  banners: ["/images/banner_costume.jpg", "/images/banner_costume_contact.png"],
};

export const HAIR: Content = {
  title: "着付け・ヘアメイク",
  contentTitle: "ご列席される方の着付けやヘアセットは<br>ご予約にて承っております",
  caption: "挙式披露宴の3週間前までにお申し込みください<br>なお、小物のレンタルもございます<br>※予約状況により人数制限をさせていただく場合がございます",
  table: [
    {
      title: "着付料金",
      prices: [
        {
          title: "江戸褄（マリエール衣装）",
          price: 6600,
          just: true,
        },
        {
          title: "江戸褄（持込衣装）",
          price: 7700,
          just: true,
        },
        {
          title: "訪問着",
          price: 7700,
          just: false,
        },
        {
          title: "振袖",
          price: 16500,
          just: true,
        },
        {
          title: "男性袴",
          price: 11000,
          just: true,
        },
      ],
    },
    {
      title: "ヘアメイク",
      prices: [
        {
          title: "アップスタイル",
          price: 4950,
          just: true,
        },
        {
          title: "ハーフアップ",
          price: 4400,
          just: true,
        },
        {
          title: "ショート・ブロー",
          price: 3850,
          just: true,
        },
        {
          title: "お子様ヘア<br>（未就学・小学生）",
          price: 2200,
          just: true,
        },
        {
          title: "髪飾りレンタル",
          price: 4950,
          just: false,
        },
        {
          title: "フルメイク",
          price: 3300,
          just: true,
        },
        {
          title: "ポイントメイク",
          price: 2200,
          just: false,
        },
      ],
      isIrregular: true,
    },
  ],
  src: "/images/guest_hair.jpg",
  banners: ["/images/banner_salon.jpg", "/images/banner_salon_contact.png"],
};

export const CONTENT = {
  title: "ご列席される方へ",
  caption:
    "ご列席いただく皆様の衣裳のレンタルや着付け・ヘアメイクなどもご予約承っております<br>また、安心して当日お過ごしいただくための設備やサービスもございます<br>気になることがございましたら会場までお問い合わせくださいませ",
  section: [DRESS, HAIR],
  service: {
    title: "設備・サービス",
    contents: [
      {
        title: "コスチュームサロン",
        caption: "最新の流行からいつまでも色あせないご衣裳まで、豊富なラインナップを取り揃えています",
        src: "/images/icon_guest_costume.svg",
      },
      {
        title: "ビューティサロン",
        caption: "ヘア＆メイクや着付け、ブライダルエステなどのビューティサポート。新郎新婦がリラックスいただくためのプライズルームも完備しております",
        src: "/images/icon_guest_beauty.svg",
      },
      {
        title: "フォトスペース",
        caption: "挙式の前後、ご家族や親しいゲストとともにご利用いただける、フォトスペースです",
        src: "/images/icon_guest_photo.svg",
      },
      {
        title: "駐車場",
        caption: "200台の専用駐車場がございます<br>大勢のゲストをお招きいただくおふたりも安心です",
        src: "/images/icon_guest_parking.svg",
      },
      {
        title: "宿泊施設",
        caption: "遠方からお越しいただくゲストのための宿泊施設として、ベルセゾン近隣のホテルをご紹介しています",
        src: "/images/icon_guest_hotel.svg",
      },
      {
        title: "ゲスト専用更衣室",
        caption: "ゲストの皆さまにご利用いただける更衣室がございますので、身軽な服装でご来館いただけます",
        src: "/images/icon_guest_room.svg",
      },
      {
        title: "ラウンジ",
        caption: "ゲストの皆さまがくつろいでお過ごしいただけるティーラウンジがございます",
        src: "/images/icon_guest_lounge.svg",
      },
      {
        title: "バス送迎",
        caption: "結婚式当日は、貸切バス送迎を行っています<br>お酒を飲まれるゲストやご年配のゲストも安心してご出席いただけます",
        src: "/images/icon_guest_bus.svg",
      },
    ],
  },
};
