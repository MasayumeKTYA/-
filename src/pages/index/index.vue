<template>
  <view class="nav" :style="{ paddingTop: statusHeight }">首页</view>
  <view :style="{ height: statusHeightNum + 50 + 'px' }"></view>
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
  <Audio :bottom="true" />
  <Tab />
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
import Audio from "@/component/play/play.vue";
import { useNavStore } from "@/stores/nav";
import Tab from "@/component/tab/tab.vue";
const { statusHeight, statusHeightNum } = useNavStore();
const File = plus.android.importClass("java.io.File");
let file: JavaFilePath[] = [];
onLoad(() => {
  plus.android.requestPermissions(["android.permission.READ_EXTERNAL_STORAGE"]);
  dir();
  console.log(file);
  // uni.setStorageSync("file", JSON.stringify(file));
  uni.clearStorage();
  // console.log(arr);
});
function dir() {
  const environment = plus.android.importClass("android.os.Environment");
  let path = environment.getExternalStorageDirectory().getAbsolutePath();
  let directory = new File(path);
  let arr = directory.listFiles();
  let dirs: JavaFilePath[] = [],
    files: JavaFilePath[] = [];

  arr.forEach((item: any) => {
    if (!item.isHidden()) {
      if (item.isDirectory()) {
        dirs.push({
          name: item.getName(),
          fullPath: item.getPath(),
          isFile: false,
        });
      } else {
        files.push({
          name: item.getName(),
          fullPath: item.getPath(),
          isFile: true, // 是否是文件
        });
      }
    }
  });

  file = [...dirs, ...files];
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
