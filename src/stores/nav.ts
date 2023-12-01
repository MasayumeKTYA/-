import { defineStore } from "pinia";

export const useNavStore = defineStore("nav", {
  state: () => {
    return {
      statusHeight: "", // 状态栏 带px
      statusHeightNum: 0, // 不带px
      windowHeight: 0 // 手机高度
    };
  },
  actions: {
    getStatusHeight () {
      uni.getSystemInfo({
        success: res => {
          console.log(res);
          if (res.statusBarHeight !== undefined) {
            this.statusHeight = res.statusBarHeight + "px";
            this.statusHeightNum = res.statusBarHeight;
          }
          this.windowHeight = res.windowHeight;
        }
      });
    }
  }
});
