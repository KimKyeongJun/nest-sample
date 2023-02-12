export class Page<T> {
  curPage: number;
  pageSize: number;
  totalCount: number;
  totalPage: number;
  content: T[];

  isFirst: boolean;
  isLast: boolean;
  isEmpty: boolean;

  constructor(
    totalCount: number,
    curPage: number,
    pageSize: number,
    content: T[],
  ) {
    this.pageSize = pageSize;
    this.curPage = curPage;
    this.totalCount = totalCount;
    this.totalPage = Math.ceil(totalCount / pageSize);
    this.content = content;

    this.isFirst = curPage === 1;
    this.isLast = curPage >= this.totalPage ? true : false;
    this.isEmpty = totalCount <= 0 ? true : false;
  }
}
