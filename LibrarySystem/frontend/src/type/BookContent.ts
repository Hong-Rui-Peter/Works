export interface Chapter {
  id: number;
  chapter_number: string;
  createDate: string;
  content: string;
  title: string;
}

export interface BookContents {
  id: number;
  title: string;
  chapters: Chapter[];
}

export interface BookContentByPic {
  id: number;
  bookName: string;
  bookIcon: string;
  chapter_number: string;
  tag: string;
  createDate: string;
  content: string;
  title: string;
}
