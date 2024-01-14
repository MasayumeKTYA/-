import { defineStore } from "pinia";
import { useSongStore } from "./song";
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
      this.isSet = !this.isSet;
      if (this.isSet) {
        this.selectTime = 1;
      } else {
        this.selectTime = 0;
      }
    },
    timeSet(index: number) {
      if (this.selectTime == index) {
        this.selectTime = 0;
        clearTimeout(this.timer);
      } else {
        this.selectTime = index;
        setTimeout(() => {
          storeSong.pause();
          // this.countDown = "10:21";
        });
      }
    },
  },
});
