import { format } from "@/tool";
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
      startTime: "00:00", //当前时间 用于展示
      currentTime: 0, //当前时间 用于计算
      lineWidth: "0rpx", //长度
      setIntervalData: 0,
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
      console.log(data);

      this.currentSong = data;
      this.innerAudioContext.src = data.fullPath;
      console.log(this.songList);

      const index = this.songList.findIndex(
        (item) => item.MP3Title === data.MP3Title
      );
      this.currentIndex = index;
      console.log(this.currentIndex);
    },
    //下一首
    nextSong() {
      if (this.currentIndex === this.songList.length - 1) {
        this.currentIndex = 0;
      } else {
        this.currentIndex++;
      }
      //清除定时器
      this.clearTimeData();
      this.currentSong = this.songList[this.currentIndex];
      this.setAudio(this.currentSong);
      this.play();
    },
    //上一首
    preSong() {
      if (this.currentIndex === 0) {
        this.currentIndex = this.songList.length - 1;
      } else {
        this.currentIndex--;
      }
      //清除定时器
      this.clearTimeData();
      this.currentSong = this.songList[this.currentIndex];
      this.setAudio(this.currentSong);
      this.play();
    },
    clearTimeData() {
      clearInterval(this.setIntervalData);
      this.currentTime = 0;
      this.startTime = "00:00";
      this.lineWidth = "0rpx";
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
      //清除定时器
      clearInterval(this.setIntervalData);
    },
    //播放
    play() {
      if (this.currentSong.fullPath === "") {
        uni.showToast({
          title: "暂无歌曲播放哦~",
          icon: "none",
        });
        return;
      }
      this.innerAudioContext.play();
      this.playBtn = false;
      this.transitionBtn = true;
      setTimeout(() => {
        this.transitionBtn = false;
      }, 200);
      //执行定时器
      this.setIntervalFn();
    },
    //定时器
    setIntervalFn() {
      console.log(this.innerAudioContext.currentTime);
      this.setIntervalData = setInterval(() => {
        const time = Math.floor(this.innerAudioContext.currentTime);
        this.startTime = format(time);
        this.currentTime = time;
        //设置线的长度
        const lineW = 570 / (3 * 60);
        this.lineWidth = Math.ceil(time * lineW) + "rpx";
      }, 1000);
    },
    popupShow() {
      this.popup1 = !this.popup1;
    },
    allBox() {
      this.transitionAllBox = true;
      setTimeout(() => {
        this.transitionAllBox = false;
      }, 200);
      uni.navigateTo({
        url: "/pages/detail/detail",
        animationType: "slide-in-bottom",
      });
    },
  },
});
