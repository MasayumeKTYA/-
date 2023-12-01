<template>
  <view class="tab">
    <view @click="switcjTab(1)" :class="id===1?'TabActive':''">首页</view>
    <view @click="switcjTab(2)" :class="id===2?'TabActive':''">我的</view>
  </view>
</template>
<script lang="ts" setup>
import  {ref} from 'vue'
const id = ref(1)
function  switcjTab(index:number) {
    id.value = index
}
</script>
<style lang="scss">
.tab{
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position:fixed;
  width:750rpx;
  bottom:0;
  background:#fff;
  border:2rpx solid  #F5F5F5;
  .TabActive{
    color:rgb(231, 19, 19)
    
  }
}

</style>