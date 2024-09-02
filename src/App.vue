<template>
  <v-app id="inspire">
    <div class="app-container">
      <Toolbar />
      <router-view />
    </div>
  </v-app>
</template>

<script>
import Toolbar from "./components/AppToolbar.vue";

export default {
  components: {
    Toolbar,
  },
};
</script>

<style>
@import url("./assets/styles/main.css");
</style>