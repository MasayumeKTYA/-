<template>
  <block v-if="list.length !== 0">
    <view class="song_box" v-for="(item, index) in list" :key="index">
      <view class="rank">{{ index + 1 }}</view>
      <view class="song_name">{{ item.name }}</view>
    </view>
  </block>
  <block v-else>
    <image class="nodeSong" src="/static/img/none.png" mode="scaleToFill" />
    <view class="none_font">暂无歌曲</view>
  </block>
</template>
<script lang="ts" setup>
import { ref } from "vue";
const list = ref<JavaFilePath[]>(uni.getStorageSync('song_list'))
</script>
<style lang="scss">
.song_box {
  display: flex;
  height: 100rpx;
  align-items: center;

  .rank {
    width: 100rpx;
    height: 100rpx;
    line-height: 100rpx;
    text-align: center;
    font-size: 36rpx;
  }
}

.song_box:active {
  @extend .song_box;
  background: rgba(0, 0, 0, 0.1);
}
</style>
