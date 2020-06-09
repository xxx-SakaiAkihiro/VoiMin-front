<template>
  <v-app>
    <Header />
    <!-- <Test /> -->
    <router-view />
  </v-app>
</template>

<script>
import firebase from "firebase";
import Header from "@/components/Header";
// import Test from "@/components/Test";

export default {
  name: "App",
  components: {
    Header,
    // Test
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setLoginUser(user);
      }
    });
  }
};
</script>
