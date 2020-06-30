<template>
  <v-app style="background-color:#f5f5f5">
    <Header />
    <router-view />
  </v-app>
</template>

<script>
import Header from "@/components/Header";

export default {
  name: "App",
  components: {
    Header
  }
};
</script>