import { format } from "@/tool";
import { defineStore } from "pinia";
import { nowTimeFu } from "@/tool/index";
export const useSongStore = defineStore("song", {
  state: (): storeSong => {
    return {
      myAppRoot: "",
      songList: [],
      innerAudioContext: uni.createInnerAudioContext(),
      currentSong: {
        name: "暂无歌曲",
        author: "未知",
        fullPath: "",
        isFile: true,
        time: 0,
        pic: "/static/img/detailBG.jpg",
        MP3Title: "暂无歌曲",
      },
      currentIndex: 0,
      startTime: "00:00", //当前时间 用于展示
      endTime: "", //结束时间
      currentTime: 0, //当前时间 用于计算
      lineWidth: 0, //长度
      setIntervalData: 0,
      //play组件参数
      transitionAllBox: false,
      playBtn: true,
      transitionBtn: false,
      popup1: false,

      setTimeoutDebound: true, //防抖
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
      console.log(this.songList);
      uni.setStorageSync("songPath", data);
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
      // console.log(this.currentIndex);
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
    //防抖

    debound(cb: () => void) {
      if (this.setTimeoutDebound) {
        cb();
        this.setTimeoutDebound = false;
        setTimeout(() => {
          this.setTimeoutDebound = true;
        }, 2000);
      }
    },
    clearTimeData() {
      clearInterval(this.setIntervalData);
      this.currentTime = 0;
      this.startTime = "00:00";
      this.lineWidth = 0;
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
      //更新当前歌曲的结束时间
      this.endTime = nowTimeFu(this.currentSong.time!);
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
      this.setIntervalData = setInterval(() => {
        this.lineWidth++;
        const time = Math.floor(this.innerAudioContext.currentTime);
        this.startTime = format(time);

        const rateTime = Math.floor(this.currentSong.time! / 1000);
        const resTime = (this.innerAudioContext.currentTime / rateTime) * 100;
        this.lineWidth = Number(resTime.toFixed(2));
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
    sliderChange(e: silder) {
      const { value } = e.detail;
      const time = (this.currentSong.time! * value) / 100000;
      const resTime = Number(time.toFixed(0));
      this.innerAudioContext.seek(resTime);
      this.startTime = format(resTime);
      this.play();
    },
    test() {
      console.log(1);
    },
  },
});
