<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { useNavStore } from "@/stores/nav";
import { useSongStore } from "./stores/song";
onLaunch(() => {
  console.log("App Launch");
  useNavStore().getStatusHeight();
  const path: string = uni.getStorageSync("songPath");
  useSongStore().initAudio(path);
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style lang="scss">
@import "./app.scss";
</style>
