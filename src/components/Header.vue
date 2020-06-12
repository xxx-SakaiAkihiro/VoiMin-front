<template>
  <v-card>
    <v-app-bar color="primary" dark>
      <v-toolbar-title class="display-2">VoiMin</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- ログアウト -->
      <span style="font-size : larger" v-if="this.$route.path !== '/'">{{ userName }} さん</span>
      <v-btn icon style="outline:0" @click="logout" v-if="this.$route.path !== '/'">
        <v-icon>fas fa-sign-out-alt</v-icon>
      </v-btn>
      <!-- タブ -->
      <template v-slot:extension v-if="this.$route.path !== '/'">
        <v-tabs align-with-title>
          <v-tab @click="toPage('/home')">
            <v-btn icon style="outline:0">
              <v-icon>far fa-comment-dots</v-icon>
            </v-btn>
          </v-tab>
          <v-tab @click="toPage('/saveList')">
            <v-btn icon style="outline:0">
              <v-icon>fas fa-history</v-icon>
            </v-btn>
          </v-tab>
          <v-tab @click="toPage('/how')">
            <v-btn icon style="outline:0">
              <v-icon>far fa-question-circle</v-icon>
            </v-btn>
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
  </v-card>
</template>

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";

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
  },
  computed: {
    ...mapGetters(["userName"])
  }
};
</script>