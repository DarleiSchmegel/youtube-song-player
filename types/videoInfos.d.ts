interface ThumbnailProps {
  url: string;
  width: number;
  height: number;
}
interface PlayListItemProps {
  videoId: string;
  title: string;
  description?: string;
  author?: string;
  audio: string;
  thumbnails: ThumbnailProps[];
  video_url: string;
  liked?: boolean;
  lengthSeconds: number;
  starts?: 0 | 1 | 2 | 3 | 4 | 5;
}
export { ThumbnailProps, PlayListItemProps };
