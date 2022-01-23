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
        default: {
          url: string,
          width: string,
          height: string,
        },
        medium: {
          url: string,
          width: string,
          height: string,
        },
        high: {
          url: string,
          width: string,
          height: string,
        },
      },
      channelTitle: string
    }
}