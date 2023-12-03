<template>
  <view class="nav" :style="{ paddingTop: statusHeight }">
    <wd-icon
      name="chevron-down"
      size="22px"
      @click="back"
      color="#fff"
    ></wd-icon>
    <view style="justify-self: center">歌曲名称</view>
    <view></view>
  </view>
  <view :style="{ height: statusHeightNum + 50 + 'px' }"></view>

  <view class="BGM">
    <image class="singBG" src="/static/img/avatar.jpg" mode="scaleToFill" />
  </view>
  <view class="line_box">
    <view class="line_font">0:00</view>
    <view class="line_container">
      <view class="line1"></view>
      <view class="cir" style="left: 200rpx"></view>
      <view class="line2" style="width: 200rpx"></view>
    </view>
    <view class="line_font">0:00</view>
  </view>
  <view class="bottom">
    <!-- <wd-icon name="format-horizontal-align-center" size="22px"></wd-icon> -->
    <wd-icon name="refresh1" size="22px"></wd-icon>
    <wd-icon name="previous" size="22px"></wd-icon>
    <wd-icon
      name="play-circle"
      size="40px"
      style="justify-self: center"
    ></wd-icon>
    <wd-icon name="next" size="22px"></wd-icon>
    <wd-icon name="menu-fold" size="22px"></wd-icon>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useNavStore } from "@/stores/nav";
const { statusHeight, statusHeightNum } = useNavStore();
function back() {
  uni.navigateBack({
    delta: 1,
  });
}
</script>

<style lang="scss">
page {
  background-image: url("/static/img/detailBG.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed; /*关键*/
  background-position: center;
  backdrop-filter: blur(40px); /* 模糊半径 */
}
.nav {
  box-sizing: border-box;
  padding: 0 24rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // background: #fff;
  height: 50px;
  line-height: 50px;
  position: fixed;
  z-index: 9;
  width: 750rpx;
}
.BGM {
  width: 629rpx;
  height: 629rpx;
  border-radius: 50%;
  background: #292727;
  margin: 150rpx auto 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  animation-name: scroll;
  animation-duration: 10s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  .singBG {
    width: 400rpx;
    height: 400rpx;
    border-radius: 50%;
  }
}
@keyframes scroll {
  0% {
    transform: rotate(0);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.line_box {
  width: 730rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 100rpx auto;
  .line_container {
    width: 600rpx;
    height: 2rpx;
    position: relative;
    .cir {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 20rpx;
      height: 20rpx;
      border-radius: 50%;
      background: #fff;
      z-index: 3;
    }
    .line1 {
      position: absolute;
      background: rgba(207, 207, 207, 0.5);
      width: 600rpx;
      height: 2rpx;
    }
    .line2 {
      position: absolute;
      background: rgba(244, 244, 244, 1);

      height: 2rpx;
      z-index: 2;
    }
  }
  .line_font {
    font-size: 24rpx;
    color: #fff;
  }
}
.bottom {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
