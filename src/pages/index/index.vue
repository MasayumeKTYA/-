<template>
  <view class="head">
    <image class="avatar" src="/static/img/avatar.jpg" lazy-load />
    <view style="height: 60rpx"></view>
    <view class="conatin">
      <view class="username">Masayume</view>
    </view>
  </view>
  <view class="title">歌单</view>
  <view class="box">
    <view class="box_data" v-for="item in [0, 1, 2, 3, 4]" :key="item">
      <view class="left"></view>
      <view class="right">
        <view class="sing_title">标题标题标题</view>
        <view class="sing_num">10首</view>
      </view>
    </view>
  </view>
  <Audio />
</template>

<script setup lang="ts">
import { ref } from "vue";
import Audio from "@/component/play.vue";
</script>

<style>
@import "./index.css";
</style>
