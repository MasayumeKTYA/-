<template>
  <view
    class="audio_box"
    style=""
    :style="{
      background: store.transitionAllBox ? 'rgba(0,0,0,0.1)' : '',
      bottom: bottom ? '50px' : '0',
    }"
  >
    <image
      src="/static/img/avatar.jpg"
      class="img"
      :style="{ animationPlayState: store.playBtn ? 'paused' : 'running' }"
      @click="store.allBox"
    />
    <view class="title" @click="store.allBox">{{ store.currentSong.MP3Title }}</view>
    <wd-icon
      name="play"
      size="30px"
      class="play"
      :style="{ background: store.transitionBtn ? 'rgba(0,0,0,0.1)' : '' }"
      @click="store.play"
      v-if="store.playBtn"
    ></wd-icon>
    <wd-icon
      name="pause"
      size="30px"
      class="play"
      :style="{ background: store.transitionBtn ? 'rgba(0,0,0,0.1)' : '' }"
      v-else
      @click="store.pause"
    ></wd-icon>

    <wd-icon
      name="menu-fold"
      size="30px"
      class="list"
      @click="store.popupShow"
    ></wd-icon>
    <wd-popup
      :z-index="11"
      v-model="store.popup1"
      position="bottom"
      custom-style="padding-bottom: 50px;height:700rpx;border-radius: 24rpx 24rpx 0 0"
    >
      <view class="currentPlay">当前播放</view>
      <view style="height: 100rpx"></view>
      <Song />
    </wd-popup>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Song from "../song/song.vue";
import { useSongStore } from "@/stores/song";
const store = useSongStore();
const props = defineProps({
  //子组件接收父组件传递过来的值
  bottom: Boolean,
});



</script>

<style lang="scss">
.audio_box {
  width: 750rpx;
  height: 60px;
  display: flex;
  box-sizing: border-box;
  position: fixed;
  align-items: center;
  padding: 0 40rpx;
  background-color: #fff;
  border-radius: 40rpx 40rpx 0 0;

  .title {
    font-size: 26rpx;
    margin-left: 40rpx;
    width: 320rpx;
  }

  .img {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
    animation-name: scroll;
    animation-duration: 4s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  .play {
    margin-left: 80rpx;
    border-radius: 50%;
    transition: all 1s;
  }

  .list {
    margin-left: 20rpx;
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
@keyframes scroll {
  0% {
    transform: rotate(0);
  }

  50% {
    transform: rotate(-180deg);
  }

  100% {
    transform: rotate(-360deg);
  }
}
</style>
