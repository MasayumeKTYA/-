<template>
  <view class="nav" :style="{ paddingTop: statusHeight }">首页</view>
  <view :style="{ height: statusHeightNum + 50 + 'px' }"></view>
  <view class="head">
    <image class="avatar" src="/static/img/avatar.jpg" lazy-load />
    <view style="height: 60rpx"></view>
    <view class="conatin">
      <view class="username">Masayume</view>
      <view class="Logo">个人音乐播放器</view>
    </view>
  </view>
  <view class="local">
    <view class="local_box" @click="toLocal(1)">
      <wd-icon name="folder" size="22px"></wd-icon>
      <view class="local_font">本地音乐</view>
    </view>
    <view class="local_box" @click="toScan">
      <wd-icon name="folder-add" size="22px"></wd-icon>
      <view class="local_font">扫描音乐</view>
    </view>
  </view>
  <view class="title_box">
    <text class="title">歌单</text>
    <wd-icon name="add" size="22px" @click="showInputSong"></wd-icon>
  </view>
  <view class="box">
    <view
      class="box_data"
      v-for="item in songList"
      :key="item"
      @click="toLocal(2)"
    >
      <image class="left" src="/static/img/detailBG.jpg" mode="aspectFill" />
      <view class="right">
        <view class="sing_title">{{ item.name }}</view>
        <view class="sing_num">{{ item.num }}首</view>
      </view>
    </view>
  </view>
  <Audio :bottom="false" />
  <!-- <Tab /> -->
  <wd-popup
    v-model="addSongFile"
    position="center"
    custom-style="width:300px;height: 200px;border-radius:24rpx"
    @close="hideInputSong"
  >
    <view class="popup1_title">新增歌单</view>
    <view class="popup_songList">
      <input placeholder="请输入歌单名称" class="list_input" focus />
    </view>
    <view class="flex_align_center">
      <wd-button type="info" @click="hideInputSong">取消</wd-button>
      <wd-button type="error">确定</wd-button>
    </view>
  </wd-popup>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
import Audio from "@/component/play/play.vue";
import { useNavStore } from "@/stores/nav";
import { useSongStore } from "@/stores/song";
// import Tab from "@/component/tab/tab.vue";
import File from "@/tool/File1";
const { statusHeight, statusHeightNum } = useNavStore();

const songStore = useSongStore();
plus.android.importClass("java.io.File");
const songList = ref();
onLoad(() => {
  plus.android.requestPermissions(
    ["android.permission.READ_EXTERNAL_STORAGE"],
    function (res) {
      console.log(res);

      //获取跟路径
      let path: string = plus.android
        .invoke("android.os.Environment", "getExternalStorageDirectory")
        .getAbsolutePath();
      const myRoot = path + "/myApp";
      const file1 = new File(path);
      file1.createDir("/myApp");
      const file2 = new File(myRoot);
      file2.createDir("/image");
      file2.createDir("/json");
      //判断是否存在json文件
      const existJSON = plus.android.newObject(
        "java.io.File",
        myRoot + "/json"
      );
      const JSONfile = plus.android.invoke(existJSON, "listFiles");
      console.log(JSONfile);

      if (JSONfile !== null && JSONfile.length === 0) {
        const stringFiles = JSON.stringify([]);
        const jsonArr: number[] = plus.android.invoke(stringFiles, "getBytes");
        file1.writeDataFimeName(jsonArr, myRoot + "/json/songList.json");
      }
      //全局状态 设置文件根目录
      songStore.setMyAppRoot(myRoot);
      const localData: Array<JavaFilePath> = JSON.parse(
        file1.readFile(myRoot + "/json/songList.json")
      );
      songStore.getSongList(localData);
      songList.value = [
        {
          name: "CN",
          num: localData.length,
        },
      ];
      const song: JavaFilePath | "" = uni.getStorageSync("songPath");
      if (song !== "") {
        songStore.setAudio(song);
      }
    }
  );
});

function toLocal(type: number) {
  uni.navigateTo({
    url: `/pages/localFile/localFile?type=${type}`,
  });
}
//前往扫描本地音乐
function toScan() {
  uni.navigateTo({
    url: "/pages/scan/scan",
  });
}
//添加歌单
const addSongFile = ref(false);
function hideInputSong() {
  addSongFile.value = false;
}
function showInputSong() {
  // addSongFile.value = true;
  uni.showToast({
    title: "功能开发中...",
    icon: "none",
  });
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
