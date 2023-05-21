export type ContentBrides = {
  title: string;
  contentTitle?: string;
  caption: string;
  textAlignment?: boolean;
  flow?: string[];
  src: string;
  srcSp?: string;
};

export const STEP1: ContentBrides = {
  title: "結婚式当日<span>4-5</span>ヶ月前",
  contentTitle: "おふたりの結婚式への想いや期待<br>悩み・不安をお聞かせください",
  caption: "最初のお打ち合わせから結婚式当日まで、専任のウエディング<br>プランナーがおふたりをサポートさせていただきます。",
  flow: ["おふたりやゲストについてヒアリング", "結婚式のコンセプトや方向性のご相談", "衣裳のご検討・ご試着"],
  src: "/images/brides_01.jpg",
};

export const STEP2: ContentBrides = {
  title: "結婚式当日<span>3-4</span>ヶ月前",
  contentTitle: "挙式披露宴のアウトフレームを創り<br>招待状を準備しましょう",
  caption: "打ち合わせで伺った内容をもとに ウエディングプランナーがおふたりの思い描く結婚式のカタチを具現化<br>し 挙式披露宴のイメージをお話させていただきます",
  textAlignment: true,
  flow: ["招待客リストの作成", "招待状の作成", "引出物などギフトの検討", "演出ビデオ検討"],
  src: "/images/brides_02.jpg",
};

export const STEP3: ContentBrides = {
  title: "結婚式当日<span>2-3</span>ヶ月前",
  contentTitle: "ゲストの顔を思い浮かべながら</br>料理を決めていきます",
  caption: "専属シェフも参加して 参列ゲストにふるまう料理を決めていきます<br>ゲストの顔ぶれや年齢層に合わせてコースを選んだり アレルギーがある方やご年配の方への気遣いを考えたりします",
  textAlignment: true,
  flow: ["料理・ケーキのご紹介・決定", "食物アレルギーの確認", "席次表・席札の作成", "ヘアメイクリハーサルの相談", "列席者の着付け・ヘアセット・メイクの予約"],
  src: "/images/brides_03.jpg",
};

export const STEP4: ContentBrides = {
  title: "結婚式当日<span>1-2</span>ヶ月前",
  contentTitle: "テーマに合わせて、会場内の装花装飾を<br>考えていきましょう",
  caption: "これまでに伺ったおふたりの結婚式のテーマや ドレスの色やデザインなど 結婚式を形作る要素をもとに フラワーコーディネーターを交えて会場内の装花やブーケ 装飾を考えていきます",
  textAlignment: true,
  flow: ["装花・ブーケイメージの決定", "席次表の最終確認", "演出ビデオの準備"],
  src: "/images/brides_04.jpg",
};

export const STEP5: ContentBrides = {
  title: "結婚式まであと<span>1</span>ヶ月",
  contentTitle: "司会者を交えて 当日の進行スケジュールを<br>最終確認していきます",
  caption: "これまでにウエディングプランナーとともに創ってきた結婚式のアウトフレームを当日の流れに落とし込み 司会者を含めて最終確認をしていきます",
  textAlignment: true,
  flow: ["司会者との進行確認・BGM選定", "引出物・引菓子・プチギフトの個数決定", "ペーパーアイテム・内祝いの最終確認"],
  src: "/images/brides_05.jpg",
};

export const STEP6: ContentBrides = {
  title: "結婚式まであと<span>2</span>週間",
  contentTitle: "挙式披露宴のリハーサルでいよいよ<br>残すは当日だけに",
  caption: "挙式披露宴のリハーサルを通して これまでに決めた進行スケジュールやBGMの最終確認を行い おふたりが安心して過ごせるように準備をしていきます",
  textAlignment: true,
  flow: ["当日スケジュール・BGMの最終確認", "挙式披露宴のリハーサル", "搬入物や持ち物の確認"],
  src: "/images/brides_06.jpg",
};

export const STEP7: ContentBrides = {
  title: "結婚式当日",
  caption:
    "待ちに待った結婚式　一生懸命に準備を進めてきたものがついに形になる日です　睡眠をたっぷり取って 体調を万全に整えて 当日をお迎えください　おふたりの結婚式が素晴らしいものになりますよう 万全の体制でお待ちしております",
  src: "/images/brides_07.jpg",
  srcSp: "/images/brides_07-sp.jpg",
};

export const CONTENT = {
  title: "結婚式当日までのスケジュール",
  caption:
    "最初のお打ち合わせから結婚式当日まで 専任のウエディングプランナーがおふたりをサポートさせていただきます<br>おふたりのことを理解し おふたりの不安に寄り添い おふたりの状況に合わせて 当日まで柔軟に対応いたします<br>式場のご予約は1年前ほどのご予約が多くなっております　1年前には日程のご予約をお勧めいたします",
  section: [STEP1, STEP2, STEP3, STEP4, STEP5, STEP6, STEP7],
};
