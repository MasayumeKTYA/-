<template>
  <block v-if="list.length !== 0">
    <view
      class="song_box"
      v-for="(item, index) in list"
      :style="{ color: index === SongStore.currentIndex ? 'red' : '#000' }"
      :key="index"
      @click="play(item)"
    >
      <view class="rank">{{ index + 1 }}</view>
      <view class="song_name">
        <view class="MP3Title songOverFlow">
          {{ item.MP3Title }}
        </view>

        <view
          class="author songOverFlow"
          v-if="item.author != null"
          :style="{ color: index === SongStore.currentIndex ? 'red' : '#000' }"
          >{{ item.author }}</view
        >
        <view
          class="author"
          v-else
          :style="{ color: index === SongStore.currentIndex ? 'red' : '#000' }"
          >未知</view
        >
      </view>
    </view>
  </block>
  <block v-else>
    <image class="nodeSong" src="/static/img/none.png" mode="scaleToFill" />
    <view class="none_font">暂无歌曲</view>
  </block>
</template>
<script lang="ts" setup>
import { defineEmits } from "vue";
import type { PropType } from "vue";
import { useSongStore } from "@/stores/song";
const SongStore = useSongStore();
const props = defineProps({
  list: {
    type: Array as PropType<JavaFilePath[]>,
    require: true,
    default: [],
  },
});

const emit = defineEmits(["sendSong"]);
function play(data: JavaFilePath) {
  emit("sendSong", data);
}
</script>
<style lang="scss" scoped>
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
  .song_name {
    .author {
      margin-top: 10rpx;
      font-size: 26rpx;
      color: #666;
      width: 500rpx;
    }
    .MP3Title {
      font-size: 30rpx;
      width: 500rpx;
    }
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
