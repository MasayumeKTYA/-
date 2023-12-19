<template>
  <view class="nav" :style="{ paddingTop: statusHeight }">
    <wd-icon
      name="chevron-down"
      size="30px"
      @click="back"
      color="#fff"
    ></wd-icon>
    <view style="justify-self: center">
      <view class="title songOverFlow">
        <!-- <block v-if="(SongStore.currentSong.MP3Title!).length > 10">
          <swiper
            autoplay
            style="height: 40rpx; width: 550rpx; text-align: center"
            :interval="1000"
            :duration="12000"
            circular
            disable-touch
          >
            <swiper-item>{{ SongStore.currentSong.MP3Title }}</swiper-item>
            <swiper-item>{{ SongStore.currentSong.MP3Title }}</swiper-item>
            <swiper-item>{{ SongStore.currentSong.MP3Title }}</swiper-item>
          </swiper>
        </block> 
        <block >-->
        {{ SongStore.currentSong.MP3Title }}
        <!-- </block> -->
      </view>
      <view class="author songOverFlow">{{
        SongStore.currentSong.author
      }}</view>
    </view>
    <view style="width: 30px"></view>
  </view>

  <view :style="{ height: statusHeightNum + 50 + 'px' }"></view>

  <view
    class="BGM"
    :style="{ animationPlayState: SongStore.playBtn ? 'paused' : 'running' }"
  >
    <image
      class="singBG"
      :src="
        SongStore.currentSong.pic === ''
          ? '/static//img//songBG.jpg'
          : SongStore.currentSong.pic
      "
      mode="scaleToFill"
    />
  </view>
  <view class="line_box">
    <view class="line_font">{{ SongStore.startTime }}</view>
    <view class="line_container">
      <view class="line1"></view>
      <view class="cir" :style="{ left: SongStore.lineWidth }"></view>
      <view class="line2" :style="{ width: SongStore.lineWidth }"></view>
    </view>
    <view class="line_font">{{ endTime }}</view>
  </view>
  <view class="bottom">
    <!-- <wd-icon name="format-horizontal-align-center" size="22px"></wd-icon> -->
    <wd-icon name="refresh1" size="22px" @click="random"></wd-icon>
    <wd-icon name="previous" size="22px" @click="SongStore.preSong"></wd-icon>
    <wd-icon
      name="play-circle"
      size="40px"
      style="justify-self: center"
      @click="SongStore.play"
      v-if="SongStore.playBtn"
    ></wd-icon>
    <wd-icon
      name="pause-circle"
      size="40px"
      style="justify-self: center"
      @click="SongStore.pause"
      v-else
    ></wd-icon>
    <wd-icon name="next" size="22px" @click="SongStore.nextSong"></wd-icon>
    <wd-icon
      name="menu-fold"
      size="22px"
      @click="SongStore.popupShow"
    ></wd-icon>
  </view>
  <!--弹出-->
  <wd-popup
    :z-index="11"
    v-model="SongStore.popup1"
    position="bottom"
    custom-style="padding-bottom: 50px;height:700rpx;border-radius: 24rpx 24rpx 0 0"
  >
    <view class="currentPlay">当前播放</view>
    <view style="height: 100rpx"></view>
    <Song :list="SongStore.songList" @sendSong="SongStore.getSong" />
  </wd-popup>
</template>

<script setup lang="ts">
import { onUnload } from "@dcloudio/uni-app";
import Song from "@/component/song/song.vue";
import { ref } from "vue";
import { useNavStore } from "@/stores/nav";
import { useSongStore } from "@/stores/song";
import { nowTimeFu } from "@/tool/index";
const { statusHeight, statusHeightNum } = useNavStore();
const SongStore = useSongStore();
function back() {
  uni.navigateBack({
    delta: 1,
  });
}

if (SongStore.currentSong.time === undefined) {
  throw new Error("SongStore.currentSong.time not found");
}
const endTime = ref<string>(nowTimeFu(SongStore.currentSong.time));

console.log();

SongStore.innerAudioContext.onPlay(() => {
  console.log(SongStore.innerAudioContext.currentTime);
});
function random() {
  uni.showToast({
    title: "功能待开发...",
    icon: "none",
  });
}
//销毁
onUnload(() => {
  SongStore.popup1 = false;
});
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
.songName {
  text-align: center;
  font-size: 36rpx;
  font-weight: bold;
}
.nav {
  box-sizing: border-box;
  padding: 0 24rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // background: #000;
  height: 70px;
  // line-height: 50px;
  position: fixed;
  z-index: 9;
  width: 750rpx;
  .title {
    overflow: hidden;
    width: 300rpx;
    font-size: 30rpx;
    text-align: center;
  }
  .author {
    text-align: center;
    width: 300rpx;
    font-size: 26rpx;
  }
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
  margin: 400rpx auto 0 auto;
  .line_container {
    width: 570rpx;
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
      transition: all 1s linear;
    }
    .line1 {
      position: absolute;
      background: rgba(207, 207, 207, 0.5);
      width: 570rpx;
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
.currentPlay {
  border-radius: 24rpx 24rpx 0 0;
  height: 100rpx;
  text-align: center;
  line-height: 100rpx;
  font-weight: bold;
  font-size: 36rpx;
  position: fixed;
  width: 750rpx;
  z-index: 9;
  background: #fff;
}
.bottom {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 100rpx;
}
</style>
