<template>

    <view>详情</view>

    <Audio />
  
</template>

<script setup lang="ts">
import { ref } from "vue";
import Audio from "@/component/play.vue";
</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
