import { defineStore } from "pinia";

export const useSongStore = defineStore("song", {
  state: (): storeSong => {
    return {
      myAppRoot: "",
      songList: [],
      innerAudioContext: uni.createInnerAudioContext(),
      currentSong: {
        name: "暂无歌曲",
        fullPath: "",
        isFile: true,
        time: 0,
        pic: "/static/img/detailBG.jpg",
        MP3Title: "暂无歌曲",
      },
      currentIndex: 0,
      //play组件参数
      transitionAllBox: false,
      playBtn: true,
      transitionBtn: false,
      popup1: false,
    };
  },
  actions: {
    setMyAppRoot(path: string) {
      this.myAppRoot = path;
    },
    getSongList(list: JavaFilePath[]) {
      this.songList = list;
    },
    setAudio(data: JavaFilePath) {
      this.currentSong = data;
      this.innerAudioContext.src = data.fullPath;
      const index = this.songList.findIndex(
        (item) => item.MP3Title === data.MP3Title
      );
      this.currentIndex = index;
    },
    //下一首
    nextSong() {
      if (this.currentIndex === this.songList.length - 1) {
        this.currentIndex = 0;
      } else {
        this.currentIndex++;
      }

      this.currentSong = this.songList[this.currentIndex];
      this.setAudio(this.currentSong);
      this.play();
    },
    //点击歌曲
    getSong(val: JavaFilePath) {
      this.setAudio(val);
      this.play();
      this.popup1 = false;
    },
    //暂停
    pause() {
      this.innerAudioContext.pause();
      this.playBtn = true;
      this.transitionBtn = true;
      setTimeout(() => {
        this.transitionBtn = false;
      }, 200);
    },
    //播放
    play() {
      if (this.currentSong.fullPath === "") return;
      this.innerAudioContext.play();
      this.playBtn = false;
      this.transitionBtn = true;
      setTimeout(() => {
        this.transitionBtn = false;
      }, 200);
    },
    popupShow() {
      this.popup1 = !this.popup1;
    },
    allBox() {
      this.transitionAllBox = true;
      setTimeout(() => {
        uni.navigateTo({
          url: "/pages/detail/detail",
          animationType: "slide-in-bottom",
        });
        this.transitionAllBox = false;
      }, 200);
    },
  },
});
