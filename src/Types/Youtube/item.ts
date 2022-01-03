export type item = {
    kind: string,
    etag: string,
    id: {
      kind: string,
      videoId: string,
      channelId: string,
      playlistId: string
    },
    snippet: {
      publishedAt: Date,
      channelId: string,
      title: string,
      description: string,
      thumbnails: {
        (key:string): {
          url: string,
          width: string,
          height: string,
        }
      },
      channelTitle: string
    }
}