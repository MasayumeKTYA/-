<template>
  <view class="nav" :style="{ height: statusHeightNum + 50 + 'px', lineHeight: statusHeightNum + 50 + 'px' }">
    <wd-icon name="thin-arrow-left" size="20px" @click="back"></wd-icon>
    <view style="justify-self: center;font-size: 36rpx;">本地歌曲</view>
    <view></view>
  </view>
  <view :style="{ height: statusHeightNum + 50 + 'px', background: '#fff' }"></view>

</template>
<script setup lang="ts">
import { useNavStore } from "@/stores/nav";
const { statusHeight, statusHeightNum } = useNavStore();

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
}


</style>