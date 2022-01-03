import { item } from "./item"

export type youtube={
  kind: string,
  etag: string,
  nextPageToken: string,
  prevPageToken: string,
  pageInfo: {
    totalResults: number,
    resultsPerPage: number,
  },
  items: Array<item>,
}