declare interface JavaFilePath {
  name: string;
  fullPath: string;
  isFile: boolean;
  isCreateImg?: boolean;
  author?: string;
  pic?: string;
  time?: number;
  type?: string;
  album?: string;
  MP3Title?: string;
}
declare interface storeSong {
  myAppRoot: string;
  songList: JavaFilePath[];
  innerAudioContext: UniApp.InnerAudioContext;
}

declare interface PropsSong {
  list: JavaFilePath[];
}
