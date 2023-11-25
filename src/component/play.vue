<template>
  <view class="audio_box" style="bottom: 50px">
    <image src="/static/img/avatar.jpg" class="img" />
    <view class="title">标题标题标题</view>
    <wd-icon name="play" size="22px" class="play"></wd-icon>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
const innerAudioContext = uni.createInnerAudioContext();

innerAudioContext.src = "/static/bg1.mp3";

innerAudioContext.onError((res) => {
  console.log(res);
  console.log(res);
});
function pause() {
  innerAudioContext.pause();
}
function play() {
  console.log(12);
  console.log(innerAudioContext);

  innerAudioContext.play();
}
</script>

<style>
@import "./play.css";
</style>
