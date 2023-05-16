import { NextApiRequest, NextApiResponse } from "next";
import { NewsCategory, NewsContents } from "../../../../typings/news";

export type ReportContents = {
  id: string;
  category: string;
  title: string;
  description: string;
  member: number;
  publishDate: string;
  createdDate: string;
  updatedDate: string;
};

const REPORT: ReportContents[] = [
  {
    id: "V2Q6aajSyFM",
    category: "1THE TOP x GRAND DINING",
    title: "2023.3月挙式 scene「Time Leap」",
    description:
      "Time Leap － 時間跳躍<br>結婚式は久しぶりに会う<br>大切な友人がいたり<br>友人同士も久しぶりに会ったりと<br>まるで昔に戻ったような空気になる<br><br>そんな昔にタイムリープして<br>楽しくワイワイと飛び跳ね<br>今までに味わったことのない楽しみ<br>喜びを感じ 跳躍しよう<br><br>これから 楽しいことだけではない<br>辛く悲しい時も 力強く蹴って<br>飛び超えてほしい<br>そんな願いを込めて<br><br>planner:奴田原志織<br>creator:明坂泰葉<br>presenter:松川駿<br>stylist:川田砂和<br>",
    member: 98,
    publishDate: "2021-01-01",
    createdDate: "2021-01-01",
    updatedDate: "2021-01-01",
  },
  {
    id: "V2Q6aajSyFM",
    category: "2THE TOP x GRAND DINING",
    title: "2023.3月挙式 scene「Time Leap」",
    description:
      "Time Leap － 時間跳躍<br>結婚式は久しぶりに会う<br>大切な友人がいたり<br>友人同士も久しぶりに会ったりと<br>まるで昔に戻ったような空気になる<br><br>そんな昔にタイムリープして<br>楽しくワイワイと飛び跳ね<br>今までに味わったことのない楽しみ<br>喜びを感じ 跳躍しよう<br><br>これから 楽しいことだけではない<br>辛く悲しい時も 力強く蹴って<br>飛び超えてほしい<br>そんな願いを込めて<br><br>planner:奴田原志織<br>creator:明坂泰葉<br>presenter:松川駿<br>stylist:川田砂和<br>",
    member: 98,
    publishDate: "2021-01-01",
    createdDate: "2021-01-01",
    updatedDate: "2021-01-01",
  },
  {
    id: "V2Q6aajSyFM",
    category: "3THE TOP x GRAND DINING",
    title: "2023.3月挙式 scene「Time Leap」",
    description:
      "Time Leap － 時間跳躍<br>結婚式は久しぶりに会う<br>大切な友人がいたり<br>友人同士も久しぶりに会ったりと<br>まるで昔に戻ったような空気になる<br><br>そんな昔にタイムリープして<br>楽しくワイワイと飛び跳ね<br>今までに味わったことのない楽しみ<br>喜びを感じ 跳躍しよう<br><br>これから 楽しいことだけではない<br>辛く悲しい時も 力強く蹴って<br>飛び超えてほしい<br>そんな願いを込めて<br><br>planner:奴田原志織<br>creator:明坂泰葉<br>presenter:松川駿<br>stylist:川田砂和<br>",
    member: 98,
    publishDate: "2021-01-01",
    createdDate: "2021-01-01",
    updatedDate: "2021-01-01",
  },
  {
    id: "V2Q6aajSyFM",
    category: "4THE TOP x GRAND DINING",
    title: "2023.3月挙式 scene「Time Leap」",
    description:
      "Time Leap － 時間跳躍<br>結婚式は久しぶりに会う<br>大切な友人がいたり<br>友人同士も久しぶりに会ったりと<br>まるで昔に戻ったような空気になる<br><br>そんな昔にタイムリープして<br>楽しくワイワイと飛び跳ね<br>今までに味わったことのない楽しみ<br>喜びを感じ 跳躍しよう<br><br>これから 楽しいことだけではない<br>辛く悲しい時も 力強く蹴って<br>飛び超えてほしい<br>そんな願いを込めて<br><br>planner:奴田原志織<br>creator:明坂泰葉<br>presenter:松川駿<br>stylist:川田砂和<br>",
    member: 98,
    publishDate: "2021-01-01",
    createdDate: "2021-01-01",
    updatedDate: "2021-01-01",
  },
  {
    id: "V2Q6aajSyFM",
    category: "5THE TOP x GRAND DINING",
    title: "2023.3月挙式 scene「Time Leap」",
    description:
      "Time Leap － 時間跳躍<br>結婚式は久しぶりに会う<br>大切な友人がいたり<br>友人同士も久しぶりに会ったりと<br>まるで昔に戻ったような空気になる<br><br>そんな昔にタイムリープして<br>楽しくワイワイと飛び跳ね<br>今までに味わったことのない楽しみ<br>喜びを感じ 跳躍しよう<br><br>これから 楽しいことだけではない<br>辛く悲しい時も 力強く蹴って<br>飛び超えてほしい<br>そんな願いを込めて<br><br>planner:奴田原志織<br>creator:明坂泰葉<br>presenter:松川駿<br>stylist:川田砂和<br>",
    member: 98,
    publishDate: "2021-01-01",
    createdDate: "2021-01-01",
    updatedDate: "2021-01-01",
  },
  {
    id: "V2Q6aajSyFM",
    category: "6THE TOP x GRAND DINING",
    title: "2023.3月挙式 scene「Time Leap」",
    description:
      "Time Leap － 時間跳躍<br>結婚式は久しぶりに会う<br>大切な友人がいたり<br>友人同士も久しぶりに会ったりと<br>まるで昔に戻ったような空気になる<br><br>そんな昔にタイムリープして<br>楽しくワイワイと飛び跳ね<br>今までに味わったことのない楽しみ<br>喜びを感じ 跳躍しよう<br><br>これから 楽しいことだけではない<br>辛く悲しい時も 力強く蹴って<br>飛び超えてほしい<br>そんな願いを込めて<br><br>planner:奴田原志織<br>creator:明坂泰葉<br>presenter:松川駿<br>stylist:川田砂和<br>",
    member: 98,
    publishDate: "2021-01-01",
    createdDate: "2021-01-01",
    updatedDate: "2021-01-01",
  },
  {
    id: "V2Q6aajSyFM",
    category: "7THE TOP x GRAND DINING",
    title: "2023.3月挙式 scene「Time Leap」",
    description:
      "Time Leap － 時間跳躍<br>結婚式は久しぶりに会う<br>大切な友人がいたり<br>友人同士も久しぶりに会ったりと<br>まるで昔に戻ったような空気になる<br><br>そんな昔にタイムリープして<br>楽しくワイワイと飛び跳ね<br>今までに味わったことのない楽しみ<br>喜びを感じ 跳躍しよう<br><br>これから 楽しいことだけではない<br>辛く悲しい時も 力強く蹴って<br>飛び超えてほしい<br>そんな願いを込めて<br><br>planner:奴田原志織<br>creator:明坂泰葉<br>presenter:松川駿<br>stylist:川田砂和<br>",
    member: 98,
    publishDate: "2021-01-01",
    createdDate: "2021-01-01",
    updatedDate: "2021-01-01",
  },
  {
    id: "V2Q6aajSyFM",
    category: "8THE TOP x GRAND DINING",
    title: "2023.3月挙式 scene「Time Leap」",
    description:
      "Time Leap － 時間跳躍<br>結婚式は久しぶりに会う<br>大切な友人がいたり<br>友人同士も久しぶりに会ったりと<br>まるで昔に戻ったような空気になる<br><br>そんな昔にタイムリープして<br>楽しくワイワイと飛び跳ね<br>今までに味わったことのない楽しみ<br>喜びを感じ 跳躍しよう<br><br>これから 楽しいことだけではない<br>辛く悲しい時も 力強く蹴って<br>飛び超えてほしい<br>そんな願いを込めて<br><br>planner:奴田原志織<br>creator:明坂泰葉<br>presenter:松川駿<br>stylist:川田砂和<br>",
    member: 98,
    publishDate: "2021-01-01",
    createdDate: "2021-01-01",
    updatedDate: "2021-01-01",
  },
  {
    id: "V2Q6aajSyFM",
    category: "8THE TOP x GRAND DINING",
    title: "2023.3月挙式 scene「Time Leap」",
    description:
      "Time Leap － 時間跳躍<br>結婚式は久しぶりに会う<br>大切な友人がいたり<br>友人同士も久しぶりに会ったりと<br>まるで昔に戻ったような空気になる<br><br>そんな昔にタイムリープして<br>楽しくワイワイと飛び跳ね<br>今までに味わったことのない楽しみ<br>喜びを感じ 跳躍しよう<br><br>これから 楽しいことだけではない<br>辛く悲しい時も 力強く蹴って<br>飛び超えてほしい<br>そんな願いを込めて<br><br>planner:奴田原志織<br>creator:明坂泰葉<br>presenter:松川駿<br>stylist:川田砂和<br>",
    member: 98,
    publishDate: "2021-01-01",
    createdDate: "2021-01-01",
    updatedDate: "2021-01-01",
  },
  {
    id: "V2Q6aajSyFM",
    category: "8THE TOP x GRAND DINING",
    title: "2023.3月挙式 scene「Time Leap」",
    description:
      "Time Leap － 時間跳躍<br>結婚式は久しぶりに会う<br>大切な友人がいたり<br>友人同士も久しぶりに会ったりと<br>まるで昔に戻ったような空気になる<br><br>そんな昔にタイムリープして<br>楽しくワイワイと飛び跳ね<br>今までに味わったことのない楽しみ<br>喜びを感じ 跳躍しよう<br><br>これから 楽しいことだけではない<br>辛く悲しい時も 力強く蹴って<br>飛び超えてほしい<br>そんな願いを込めて<br><br>planner:奴田原志織<br>creator:明坂泰葉<br>presenter:松川駿<br>stylist:川田砂和<br>",
    member: 98,
    publishDate: "2021-01-01",
    createdDate: "2021-01-01",
    updatedDate: "2021-01-01",
  },
  {
    id: "V2Q6aajSyFM",
    category: "8THE TOP x GRAND DINING",
    title: "2023.3月挙式 scene「Time Leap」",
    description:
      "Time Leap － 時間跳躍<br>結婚式は久しぶりに会う<br>大切な友人がいたり<br>友人同士も久しぶりに会ったりと<br>まるで昔に戻ったような空気になる<br><br>そんな昔にタイムリープして<br>楽しくワイワイと飛び跳ね<br>今までに味わったことのない楽しみ<br>喜びを感じ 跳躍しよう<br><br>これから 楽しいことだけではない<br>辛く悲しい時も 力強く蹴って<br>飛び超えてほしい<br>そんな願いを込めて<br><br>planner:奴田原志織<br>creator:明坂泰葉<br>presenter:松川駿<br>stylist:川田砂和<br>",
    member: 98,
    publishDate: "2021-01-01",
    createdDate: "2021-01-01",
    updatedDate: "2021-01-01",
  },
  {
    id: "V2Q6aajSyFM",
    category: "8THE TOP x GRAND DINING",
    title: "2023.3月挙式 scene「Time Leap」",
    description:
      "Time Leap － 時間跳躍<br>結婚式は久しぶりに会う<br>大切な友人がいたり<br>友人同士も久しぶりに会ったりと<br>まるで昔に戻ったような空気になる<br><br>そんな昔にタイムリープして<br>楽しくワイワイと飛び跳ね<br>今までに味わったことのない楽しみ<br>喜びを感じ 跳躍しよう<br><br>これから 楽しいことだけではない<br>辛く悲しい時も 力強く蹴って<br>飛び超えてほしい<br>そんな願いを込めて<br><br>planner:奴田原志織<br>creator:明坂泰葉<br>presenter:松川駿<br>stylist:川田砂和<br>",
    member: 98,
    publishDate: "2021-01-01",
    createdDate: "2021-01-01",
    updatedDate: "2021-01-01",
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id;

  try {
    if (id === "1") {
      res.status(200).json(REPORT);
    } else {
      const picked = REPORT.filter((report, index) => index < 4);
      res.status(200).json(picked);
    }
  } catch (e) {
    res.status(500).json({ statusCode: 500, message: "e.message" });
  }
}
