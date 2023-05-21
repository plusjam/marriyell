export type Recruit = {
  title: string;
  caption: string;
  links: {
    title: string;
    to: string;
  }[];
  contents: {
    id: string;
    title: string;
    src: string;
    subtitle: string;
    caption: string;
    link: {
      label: string;
      to: string;
    };
  }[];
  banners: string[];
};

export const RECRUIT: Recruit = {
  title: "lu CREA Members",
  caption: "採用に関するボディコピーが入ります。テキストなど量などを確認するために<br>適当な文章が入っています。採用に関する<br>ボディコピーが入ります。テキストなど量などを確認するために",
  links: [
    { title: "新卒採用", to: "new" },
    { title: "中途採用", to: "mid" },
    { title: "アルバイト採用", to: "parttime" },
  ],
  contents: [
    {
      id: "new",
      title: "新卒採用の方へのメッセージ",
      src: "/images/recruit_01.jpg",
      subtitle: "“人生でいちばん大切な記念日”を<br>みんなで創り上げませんか",
      caption: "採用に関するボディコピーが入ります。テキストなど量などを確認するために<br>適当な文章が入っています。採用に関する<br>ボディコピーが入ります。",
      link: {
        label: "サイトへリンク",
        to: "",
      },
    },
    {
      id: "mid",
      title: "中途採用の方へのメッセージ",
      src: "/images/recruit_02.jpg",
      subtitle: "“人生でいちばん大切な記念日”を<br>みんなで創り上げませんか",
      caption: "採用に関するボディコピーが入ります。テキストなど量などを確認するために<br>適当な文章が入っています。採用に関する<br>ボディコピーが入ります。",
      link: {
        label: "サイトへリンク",
        to: "",
      },
    },
    {
      id: "parttime",
      title: "アルバイトスタッフの方へのメッセージ",
      src: "/images/recruit_03.jpg",
      subtitle: "“人生でいちばん大切な記念日”を<br>みんなで創り上げませんか",
      caption: "採用に関するボディコピーが入ります。テキストなど量などを確認するために<br>適当な文章が入っています。採用に関する<br>ボディコピーが入ります。",
      link: {
        label: "サイトへリンク",
        to: "",
      },
    },
  ],
  banners: ["/images/banner_recruit_01.jpg", "/images/banner_recruit_02.jpg"],
};
