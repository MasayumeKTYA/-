<template>
  <view class="nav" :style="{ height: statusHeightNum + 50 + 'px', lineHeight: statusHeightNum + 50 + 'px' }">
    <wd-icon name="thin-arrow-left" size="20px" @click="back"></wd-icon>
    <view style="justify-self: center;font-size: 36rpx;">本地歌曲</view>
    <view></view>
  </view>
  <view :style="{ height: statusHeightNum + 50 + 'px', background: '#fff' }"></view>
  <Song />
</template>
<script setup lang="ts">
import { useNavStore } from "@/stores/nav";
import { ref } from 'vue'
import Song from '@/component/song/song.vue'
const { statusHeightNum } = useNavStore();

const list = ref<JavaFilePath[]>(uni.getStorageSync('song_list'))



//返回
function back() {
  uni.navigateBack({
    delta: 1,
  });
}
</script>
<style lang="scss">
.nav {
  box-sizing: border-box;
  padding: 0 24rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: fff;
  line-height: 50px;
  position: fixed;
  z-index: 9;
  width: 750rpx;
  background: #fff;
}

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



.nodeSong {
  display: block;
  margin: 250rpx auto 0 auto;
  width: 254rpx;
  height: 265.81rpx;
}

.none_font {
  margin-top: 20rpx;
  text-align: center;
}
</style>