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
    ...mapActions(["login", "setLoginUser","setFirebaseUser"])
  },
  mounted(){
    axios.defaults.headers.common["Authorization"] = "";
    firebase.auth().onAuthStateChanged(user => {
        this.setFirebaseUser(user);
        var googleMailAddress = firebase.auth().currentUser.email;
        axios.post("/loginCheck",{
          mailAddress:googleMailAddress
        })
        .then(response => {
          this.setLoginUser(response.data);
          console.log(response.data);
        })
          console.log(googleMailAddress);
      console.log("終わり")
    })
  },
};
</script>