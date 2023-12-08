<template>
  <view class="nav" :style="{ height: statusHeightNum + 50 + 'px', lineHeight: statusHeightNum + 50 + 'px' }">
    <wd-icon name="thin-arrow-left" size="20px" @click="back"></wd-icon>
    <view style="justify-self: center;font-size: 36rpx;">选择文件夹</view>
    <view></view>
  </view>
  <view :style="{ height: statusHeightNum + 50 + 'px', background: '#fff' }"></view>
  <view class="path">
    <text class="root_font">当前路径:{{ root }}</text>
    <text @click="backFile">上一级</text>
  </view>
  <view style="margin-top: 40rpx;">
    <block v-for="(item, index) in file" :key="index">
      <view class="sellectFile" @click="nextFile(item.fullPath)">
        <image src="/static/svg/folder.svg" class="svg" />
        <view>{{ item.name }}</view>
      </view>
    </block>
  </view>
  <button
    class="btn"
    hover-class="btn_hover"
    @click="selectCurrent"
  >
    选择当前目录
  </button>
</template>
<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { ref } from 'vue'
import { useNavStore } from "@/stores/nav";
const { statusHeight, statusHeightNum } = useNavStore();
function back() {
  uni.navigateBack({
    delta: 1,
  });
}
onLoad(() => {
  loadDir()
})
let file = ref<JavaFilePath[]>()
let root = ref('/storage/emulated/0/myappmusda/')
//初始化
function loadDir() {
  //获取安卓根目录
  let path = plus.android.invoke('android.os.Environment', 'getExternalStorageDirectory').getAbsolutePath();
  root.value = path
  getFileList(path)
}
//下一个文件
function nextFile(path: string) {
  root.value = path
  getFileList(path)
}
//上一个文件
function backFile() {
  let rootPath = plus.android.invoke('android.os.Environment', 'getExternalStorageDirectory').getAbsolutePath();
  if (rootPath === root.value) {

    uni.showToast({
      title:'已经是根目录啦~',
      icon:'none'
    })
  } else {
    let index = root.value.lastIndexOf('/')
    let prePath = root.value.substring(0, index);
    console.log(prePath);
    root.value = prePath
    getFileList(prePath)
  }

}
//获取文件列表
function getFileList(path: string) {
  let directory = plus.android.newObject("java.io.File", path);
  let arr: JavaFilePath[] = plus.android.invoke(directory, 'listFiles')
  let dirs: JavaFilePath[] = []
  arr.forEach((item: any) => {
    if (!item.isHidden()) {
      if (item.isDirectory()) {
        dirs.push({
          name: item.getName(),
          fullPath: item.getPath(),
          isFile: false,
        });
      }
    }
  });
  dirs.sort((a, b) => a.name.localeCompare(b.name));
  file.value = [...dirs];
}
//选择当前目录
function selectCurrent(){
  
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
  margin: 400rpx auto;
  border-radius: 64rpx;
  background: red;
  width: 666rpx;
  color: #fff
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
</style>