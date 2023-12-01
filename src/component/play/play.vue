<template>
  <view class="audio_box" style="bottom: 50px" >
    <image src="/static/img/avatar.jpg" class="img" />
    <view class="title">标题标题标题</view>
    <wd-icon name="play" size="30px" class="play" @click="play" v-if="playBtn"></wd-icon>
    <wd-icon name="pause" size="30px" class="play" v-else @click="pause"></wd-icon>
    <wd-icon name="view-list" size="30px" class="list"></wd-icon>
    <wd-popup v-model="show" position="bottom" custom-style="padding-bottom: 50px;">内容</wd-popup>
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

const playBtn = ref(true)
function pause() {
  innerAudioContext.pause();
  playBtn.value = true
}
function play() {
  innerAudioContext.play();
  playBtn.value = false
}
innerAudioContext.onEnded(() => {
  playBtn.value = true
})


const show = ref(false)
</script>

<style lang="scss">
@import "./play.scss";
</style>
