import { defineStore } from "pinia";
import { useSongStore } from "./song";
import { TimeFormatMinute } from "@/tool/index";
const storeSong = useSongStore();
export const useSetTimeStore = defineStore("setTime", {
  state: () => {
    return {
      selectTime: 0,
      isSet: false,
      timeArr: [10, 20, 30, 45, 60, 90],
      timer: 0,
      countDown: "选择时间",
    };
  },
  actions: {
    isStart() {
      if (!this.isSet) {
        this.isSet = true;
        this.selectTime = 1;
        this.countDownTime(1);
      } else {
        this.isSet = false;
        this.selectTime = 0;
        this.countDown = "选择时间";
        clearInterval(this.timer);
      }
    },
    timeSet(index: number) {
      if (this.selectTime == index) {
        this.isSet = false;
        this.selectTime = 0;
        this.countDown = "选择时间";
        clearInterval(this.timer);
      } else {
        if (this.selectTime != 0) {
          clearInterval(this.timer);
        }
        this.isSet = true;
        this.selectTime = index;
        this.countDownTime(index);
      }
    },
    countDownTime(index: number) {
      let allTime = 60 * this.timeArr[index - 1];
      this.countDown = TimeFormatMinute(allTime);
      this.timer = setInterval(() => {
        if (allTime === 0) {
          clearInterval(this.timer);
          storeSong.pause();
          return;
        }
        allTime--;
        this.countDown = TimeFormatMinute(allTime);
        console.log(allTime);
      }, 1000);
    },
  },
});
