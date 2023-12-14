<template>
  <view
    class="nav"
    :style="{
      height: statusHeightNum + 50 + 'px',
      lineHeight: statusHeightNum + 50 + 'px',
    }"
  >
    <wd-icon name="thin-arrow-left" size="20px" @click="back"></wd-icon>
    <view style="justify-self: center; font-size: 36rpx">本地歌曲</view>
    <view></view>
  </view>
  <view
    :style="{ height: statusHeightNum + 50 + 'px', background: '#fff' }"
  ></view>
  <Song :list="list" @sendSong="SongStore.getSong" />
  <Play />
  <view style="height: 60px"></view>
</template>
<script setup lang="ts">
import { useNavStore } from "@/stores/nav";
import { ref } from "vue";
import Song from "@/component/song/song.vue";
import { useSongStore } from "@/stores/song";
import Play from "@/component/play/play.vue";
const { statusHeightNum } = useNavStore();
const SongStore = useSongStore();

const list = ref<JavaFilePath[]>(SongStore.songList);

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
</style>
