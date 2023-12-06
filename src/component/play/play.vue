<template>
  <view
    class="audio_box"
    style=""
    :style="{
      background: transitionAllBox ? 'rgba(0,0,0,0.1)' : '',
      bottom: bottom ? '50px' : '0',
    }"
  >
    <image
      src="/static/img/avatar.jpg"
      class="img"
      :style="{ animationPlayState: playBtn ? 'paused' : 'running' }"
      @click="allBox"
    />
    <view class="title" @click="allBox">标题标题标题</view>
    <wd-icon
      name="play"
      size="30px"
      class="play"
      :style="{ background: transitionBtn ? 'rgba(0,0,0,0.1)' : '' }"
      @click="play"
      v-if="playBtn"
    ></wd-icon>
    <wd-icon
      name="pause"
      size="30px"
      class="play"
      :style="{ background: transitionBtn ? 'rgba(0,0,0,0.1)' : '' }"
      v-else
      @click="pause"
    ></wd-icon>

    <wd-icon
      name="menu-fold"
      size="30px"
      class="list"
      @click="popupShow"
    ></wd-icon>
    <wd-popup
      :z-index="11"
      v-model="popup1"
      position="bottom"
      custom-style="padding-bottom: 50px;"
      >内容</wd-popup
    >
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
const props = defineProps({
  //子组件接收父组件传递过来的值
  bottom: Boolean,
});
const innerAudioContext = uni.createInnerAudioContext();

innerAudioContext.src = "/static/bg2.ogg";

innerAudioContext.onError((res) => {
  console.log(res);
  console.log(res);
});
//显示播放还是暂停
const playBtn = ref(true);
const transitionBtn = ref(false);
function pause() {
  innerAudioContext.pause();
  playBtn.value = true;
  transitionBtn.value = true;
  setTimeout(() => {
    transitionBtn.value = false;
  }, 200);
}
function play() {
  innerAudioContext.play();
  playBtn.value = false;
  transitionBtn.value = true;
  setTimeout(() => {
    transitionBtn.value = false;
  }, 200);
}
innerAudioContext.onEnded(() => {
  playBtn.value = true;
});
//弹出层部分
const popup1 = ref(false);
function popupShow() {
  popup1.value = !popup1.value;
}

//点击整个盒子
const transitionAllBox = ref(false);
function allBox() {
  transitionAllBox.value = true;
  setTimeout(() => {
    uni.navigateTo({
      url: "/pages/detail/detail",
      animationType: "slide-in-bottom",
    });
    transitionAllBox.value = false;
  }, 200);
}
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
  border-radius: 40rpx 40rpx 0 0 ;
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
