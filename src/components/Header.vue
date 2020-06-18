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
        <v-toolbar-items>
          <v-btn text min-width="100px" style="outline:0" @click="toPage('/home')">
            <v-icon>far fa-comment-dots</v-icon>
          </v-btn>
          <v-btn text min-width="100px" style="outline:0" @click="toPage('/saveList')">
            <v-icon>fas fa-history</v-icon>
          </v-btn>
          <v-btn text min-width="100px" style="outline:0" @click="toPage('/how')">
            <v-icon>far fa-question-circle</v-icon>
          </v-btn>
        </v-toolbar-items>
      </template>
    </v-app-bar>
  </v-card>
</template>

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["switchLoginStatus"]),
    toPage(path) {
      this.$router.push(path).catch(err => {
        err;
      });
    },
    logout() {
      firebase.auth().signOut();
      this.$router.push("/");
      this.switchLoginStatus(false);
    }
  },
  computed: {
    ...mapGetters(["userName"])
  }
};
</script>