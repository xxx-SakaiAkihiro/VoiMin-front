<template>
  <v-app>
    <Header />
    <Test />
    <router-view />
  </v-app>
</template>

<script>
import Header from "@/components/Header";
import Test from "@/components/Test";

export default {
  name: "App",
  components: {
    Header,
    Test
  }
};
</script>
