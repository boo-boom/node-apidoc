<template>
  <div id="app">
    <SystemInformation v-if="false"/>
    <router-view></router-view>
  </div>
</template>

<script>
import SystemInformation from "@/components/SystemInformation";
export default {
  name: "electron-api",
  components: { SystemInformation },
  // mounted() {
  //   const tray = new remote.Tray(
  //     require("path").resolve(__dirname, "./../../static/img/logo_small.png")
  //   );

  //   tray.on("drop-files", async (event, files) => {
  //     console.log(event, files)
  //   });
  // },
};
</script>

<style lang="scss">
html, body, #app {
  height: 100%;
}
#app {
  background: $gray_1;
}
</style>
