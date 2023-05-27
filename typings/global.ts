export type ObjectAttributes = {
  caption: string | null;
  mimeType: string;
  width: number;
  height: number;
};

export type ImageObject = {
  type: string;
  url: string;
  attributes: ObjectAttributes;
};
