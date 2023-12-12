import { defineStore } from "pinia";

export const useSongStore = defineStore("song", {
  state: (): storeSong => {
    return {
      myAppRoot: "",
      songList: [],
      innerAudioContext: uni.createInnerAudioContext(),
    };
  },
  actions: {
    setMyAppRoot(path: string) {
      this.myAppRoot = path;
    },
    getSongList(list: JavaFilePath[]) {
      this.songList = list;
    },
    initAudio(path: string) {
      this.innerAudioContext.src = path;
    },
  },
});
