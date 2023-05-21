type QuestionAnswer = {
  selected: boolean;
  q: string;
  a: string;
};

export type QASet = {
  title: string;
  slug: QaType;
  qa: QuestionAnswer[];
  selected: boolean;
};

export type Qa = QASet[];

export type QaType = "fair" | "plan" | "facility" | "food" | "dress" | "attendance" | "access" | "other";
