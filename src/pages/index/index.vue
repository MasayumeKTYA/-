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
  <view class="local">
    <view class="local_box" @click="toLocal"
      >
      <wd-icon name="folder" size="22px"></wd-icon>
      <view class="local_font">本地音乐</view>
    </view>
    <view class="local_box" @click="toScan">
      <wd-icon name="folder-add" size="22px"></wd-icon>
      <view class="local_font">扫描音乐</view>
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
  <Audio :bottom="false" />
  <!-- <Tab /> -->
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
import Audio from "@/component/play/play.vue";
import { useNavStore } from "@/stores/nav";
// import Tab from "@/component/tab/tab.vue";
const { statusHeight, statusHeightNum } = useNavStore();
const JavaFile = plus.android.importClass("java.io.File");
let file: JavaFilePath[] = [];
onLoad(() => {
  plus.android.requestPermissions(["android.permission.READ_EXTERNAL_STORAGE"]);
  dir();


});
function dir() {
  //获取安卓根目录
  let path = plus.android.invoke('android.os.Environment', 'getExternalStorageDirectory').getAbsolutePath();
  console.log(path);

  let directory = plus.android.newObject("java.io.File", path);;
  let arr: JavaFilePath[] = plus.android.invoke(directory, 'listFiles')
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

function toLocal() {
  uni.navigateTo({
    url: '/pages/localFile/localFile',
  })
}
//前往扫描本地音乐
function toScan(){
  uni.navigateTo({
    url: '/pages/scan/scan',
  })
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
