<template>
  <div id="app">
    <SystemInformation v-if="false"/>
    <router-view></router-view>
  </div>
</template>

<script>
import SystemInformation from "@/components/SystemInformation";
export default {
  name: "nodeApi",
  components: { SystemInformation }
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
