<template>
  <div>
    <v-app-bar color="primary" dark>
      <v-toolbar-title class="display-1 font-weight-black">VoiMin</v-toolbar-title>
      <v-spacer></v-spacer>

      <div v-if="this.$route.path !== '/'">
        <v-btn icon @click="toPage('/home')">
          <v-icon>far fa-comment-dots</v-icon>
        </v-btn>
        <v-btn icon @click="toPage('/saveList')">
          <v-icon>fas fa-history</v-icon>
        </v-btn>
        <v-btn icon @click="toPage('/how')">
          <v-icon>far fa-question-circle</v-icon>
        </v-btn>
        <v-btn icon @click="logout">
          <v-icon>fas fa-sign-out-alt</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  methods: {
    toPage(path) {
      this.$router.push(path).catch(err => {
        err;
      });
    },
    logout() {
      firebase.auth().signOut();
      console.log("ログアウトした");
      this.$router.push("/");
    }
  }
};
</script>