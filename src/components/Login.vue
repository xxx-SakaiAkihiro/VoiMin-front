<template>
  <v-container text-center justify-center>
    <v-layout row wrap v-show="!loading">
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
    <v-alert v-if="err !== ''" outlined type="error" style="white-space:pre-wrap;" text>{{ err }}</v-alert>
    <Loading v-show="loading"></Loading>
  </v-container>
</template>

<script>
import axios from "axios";
import firebase from "firebase";
import { mapActions } from "vuex";
import Loading from "@/components/Loading";

export default {
  data() {
    return {
      name: "Login",
      err: "",
      loading: true
    };
  },
  components: {
    Loading
  },
  computed: {
    token() {
      return this.$store.state.token;
    }
  },
  methods: {
    ...mapActions([
      "login",
      "setLoginUser",
      "setFirebaseUser",
      "switchLoginStatus",
      "setToken"
    ])
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      this.loading = false;
      if (user) {
        this.setFirebaseUser(user);
        var googleName = firebase.auth().currentUser.displayName;
        var googleMailAddress = firebase.auth().currentUser.email;
        /** ログイン時にアカウントの有無確認 */
        axios
          .post("/loginCheck", {
            userName: googleName,
            mailAddress: googleMailAddress
          })
          .then(response => {
            this.setLoginUser(response.data);
            this.switchLoginStatus(true);
            /** メールアドレスのドメインが組織外のユーザーの場合 */
            if (response.data.statusId == 2) {
              this.err =
                "メールドメインがrakus-partners.co.jp\nまたはrakus.co.jpのユーザーのみログインできます";
            } else {
              axios
                .post("/signUp", {
                  mailAddress: googleMailAddress,
                  password: googleMailAddress
                })
                .then(() => {
                  axios
                    .post("/login", {
                      mailAddress: googleMailAddress,
                      password: googleMailAddress
                    })
                    .then(apiLoginResponse => {
                      this.setLoginUser(response.data);
                      this.switchLoginStatus(true);
                      Promise.resolve()
                        .then(() =>
                          this.setToken(
                            apiLoginResponse.headers["authorization"]
                          )
                        )
                        .then(
                          () =>
                            (axios.defaults.headers.common[
                              "Authorization"
                            ] = this.token)
                        )
                        .then(() => this.$router.push("/home"));
                    });
                });
            }
          })
          .catch(error => {
            console.log(error);
            alert("異常が発生しました。");
            this.$router.push("/");
          });
          this.loading = true;
      } else {
        firebase.auth().signOut();
      }
    });
  }
};
</script>