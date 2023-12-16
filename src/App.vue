<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { useNavStore } from "@/stores/nav";

onLaunch(() => {
  console.log("App Launch");
  useNavStore().getStatusHeight();
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
