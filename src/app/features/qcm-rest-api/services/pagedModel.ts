export class PagedModel<T> {
  content: T[];
  page: Page;
}

export class Page {
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
  numberOfElements: number;
}
