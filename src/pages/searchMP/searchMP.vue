<template>
  <view
    class="nav"
    :style="{
      height: statusHeightNum + 50 + 'px',
      lineHeight: statusHeightNum + 50 + 'px',
    }"
  >
    <wd-icon name="thin-arrow-left" size="20px" @click="back"></wd-icon>
    <view style="justify-self: center; font-size: 36rpx">选择文件夹</view>
    <view></view>
  </view>
  <view
    :style="{ height: statusHeightNum + 50 + 'px', background: '#fff' }"
  ></view>
  <view class="path">
    <text class="root_font">当前路径:{{ root }}</text>
    <text @click="backFile">上一级</text>
  </view>
  <view style="margin-top: 40rpx" v-if="file?.length !== 0">
    <block v-for="(item, index) in file" :key="index">
      <view class="sellectFile" @click="nextFile(item.fullPath)">
        <image src="/static/svg/folder.svg" class="svg" />
        <view>{{ item.name }}</view>
      </view>
    </block>
  </view>
  <view v-else>
    <image class="nodeSong" src="/static/img/none.png" mode="scaleToFill" />
    <view class="none_font">无文件</view>
  </view>
  <view style="height: 200rpx"></view>
  <button class="btn" hover-class="btn_hover" @click="selectCurrent">
    选择当前目录
  </button>
</template>
<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
import { useNavStore } from "@/stores/nav";
import Mp3File from "@/tool/file";
const { statusHeight, statusHeightNum } = useNavStore();
function back() {
  uni.navigateBack({
    delta: 1,
  });
}
onLoad(() => {
  loadDir();
});
let file = ref<JavaFilePath[]>();
// /storage/emulated/0
let root = ref("");
//初始化
function loadDir() {
  //获取安卓根目录
  let path = plus.android
    .invoke("android.os.Environment", "getExternalStorageDirectory")
    .getAbsolutePath();
  root.value = path;
  getFileList(path);
}
//下一个文件
function nextFile(path: string) {
  root.value = path;
  getFileList(path);
}
//上一个文件
function backFile() {
  let rootPath = plus.android
    .invoke("android.os.Environment", "getExternalStorageDirectory")
    .getAbsolutePath();
  if (rootPath === root.value) {
    uni.showToast({
      title: "已经是根目录啦~",
      icon: "none",
    });
  } else {
    let index = root.value.lastIndexOf("/");
    let prePath = root.value.substring(0, index);
    console.log(prePath);
    root.value = prePath;
    getFileList(prePath);
  }
}
//初始化获取根文件列表
function getFileList(path: string) {
  let { dirs } = getChildFile(path, "dir");
  dirs.sort((a, b) => a.name.localeCompare(b.name));
  file.value = dirs;
}
//选择当前目录
function selectCurrent() {
  //save root
  uni.showLoading({
    title: "正在搜索中",
    mask: true,
  });
  let { files } = getChildFile(root.value, "file");
  console.log(files);

  if (files.length !== 0) {
  }
  setTimeout(() => {
    uni.hideLoading();
    uni.showToast({
      title:
        files.length !== 0
          ? `已添加${files.length}首`
          : `当前文件夹下并没有歌曲哦`,
      icon: "none",
      mask: true,
    });
  }, 500);
}
//获取子文件夹与文件
function getChildFile(path: string, scanType: string) {
  let directory = plus.android.newObject("java.io.File", path);
  let arr: JavaFilePath[] = plus.android.invoke(directory, "listFiles");
  let dirs: JavaFilePath[] = [],
    files: JavaFilePath[] = [];
  //扫描类型 是文件还是文件夹
  switch (scanType) {
    case "file":
      arr.forEach((item: any) => {
        if (!item.isHidden() && !item.isDirectory()) {
          let fileSong: Mp3File | null = new Mp3File(
            item.getPath(),
            item.getParent()
          );
          console.log(fileSong.getType());
          if (
            fileSong.getType() === "audio/mpeg" ||
            fileSong.getType() === "audio/ogg"
          ) {
            const picAdress = fileSong.getImage();
            const pushObject: JavaFilePath = {
              name: item.getName(),
              fullPath: item.getPath(),
              isFile: true,
              album: fileSong.getAlbum(),
              author: fileSong.getAuther(),
              type: fileSong.getType(),
              time: fileSong.getDuring(),
              MP3Title: fileSong.getName(),
            };
            //添加失败 isCreateImg为false
            if (picAdress === "0") {
              pushObject.pic = "";
              pushObject.isCreateImg = false;
            }
            //添加成功 包括空字符串
            if (picAdress !== "0") {
              pushObject.pic = picAdress;
              pushObject.isCreateImg = true;
            }
            files.push(pushObject);
          }
          fileSong = null;
        }
      });

      return { dirs, files };
    case "dir":
      arr.forEach((item: any) => {
        if (!item.isHidden() && item.isDirectory()) {
          dirs.push({
            name: item.getName(),
            fullPath: item.getPath(),
            isFile: false,
          });
        }
      });
      return { dirs, files };
    default:
      return { dirs, files };
  }
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

.btn {
  padding: 0;
  left: 50%;
  transform: translate(-50%);
  border-radius: 64rpx;
  background: red;
  width: 666rpx;
  color: #fff;
  position: fixed;
  bottom: 20rpx;
}

.btn_hover {
  @extend .btn;
  background: rgba(255, 0, 0, 0.541);
}

.path {
  width: 702rpx;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;

  .root_font {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 500rpx;
  }
}

.sellectFile {
  display: flex;
  height: 100rpx;
  align-items: center;
  padding-left: 30rpx;
  box-sizing: border-box;
  width: 750rpx;

  .svg {
    display: block;
    width: 70rpx;
    height: 70rpx;
    margin-right: 20rpx;
  }
}

.sellectFile:active {
  @extend .sellectFile;
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
