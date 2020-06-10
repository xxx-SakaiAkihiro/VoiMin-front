<template>
  <v-container text-center justify-center>
    <v-layout row wrap>
      <v-flex>
        <h1>VoiMin</h1>
        <p>音声認識で議事録を作りましょう</p>
      </v-flex>
      <v-flex xs12 mt-5>
        <v-btn
          class="my-5 px-5 align-middle"
          outlined
          color="primary"
          @click="login"
          style="text-transform: none;height:42px"
        >
          <v-row class="px-3">
            <img src="@/assets/google_icon.png" />
            <span style="color:#6a6a6a">Googleアカウントでログイン</span>
          </v-row>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import axios from "axios";
import firebase from "firebase";
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["login", "setLoginUser", "setFirebaseUser"])
  },
  mounted() {
    axios.defaults.headers.common["Authorization"] = "";
    firebase.auth().onAuthStateChanged(user => {
      this.setFirebaseUser(user);
      var googleName = firebase.auth().currentUser.displayName;
      var googleMailAddress = firebase.auth().currentUser.email;
      // ログイン時にアカウントの有無確認
      console.log("メールは" + googleMailAddress);
      axios
        .post("/registerUser", {
          userName: googleName,
          mailAddress: googleMailAddress
        })
        .then(response => {
          console.log("最初に返ってくる" + response.data);
          // アカウントが無い場合
          // if (response.data === "") {
          //   // アカウントを登録
          //   axios.post("/registerUser", {
          //     mailAddress: googleMailAddress
          //   });
          //   // アカウントの有無確認
          //   axios
          //     .post("/loginCheck", {
          //       mailAddress: googleMailAddress
          //     })
          //     .then(response => {
          //       this.setLoginUser(response.data);
          //     });
          // }
          // // アカウントが有る場合
          // else {
          this.setLoginUser(response.data);
          console.log(this.$store.state.login_user);
          // }
        });
    });
  }
};
</script>