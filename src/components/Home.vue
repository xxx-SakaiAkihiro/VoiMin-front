<template>
  <v-container fluid>
    <v-textarea
      class="mx-8 mt-3"
      outlined
      auto-grow
      label="Content"
      rows="14"
      v-model="final"
      background-color="white"
    ></v-textarea>
    <!-- ステータスの文章 -->
    <v-row justify="center" class="mb-3">
      <v-card class="text-center" max-width="300">
        <v-card-subtitle class="display-0.5 font-weight-black blue--text">{{ status }}</v-card-subtitle>
      </v-card>
    </v-row>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-hover v-slot:default="{ hover }">
            <!-- スタートボタン -->
            <v-btn
              @click="
                  show = !show;
                  recording();
                "
              v-if="show"
              color="primary"
              :elevation="hover ? 12 : 2"
              fab
              x-large
              style="outline:0"
            >
              <v-icon>fas fa-microphone</v-icon>
            </v-btn>

            <!-- ストップボタン -->
            <v-btn
              v-bind="attrs"
              v-on="on"
              @click="
                  show = !show;
                  stop();
                "
              v-else
              color="primary"
              :elevation="hover ? 12 : 2"
              fab
              x-large
              style="outline:0"
            >
              <v-icon color="red">fas fa-square</v-icon>
            </v-btn>
          </v-hover>
        </template>
        <!-- ダイアログフォーム -->
        <v-card>
          <v-card-title>
            <span class="headline">Minutes Details</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Title"
                    required
                    v-model="title"
                    counter="50"
                    :rules="rulesTitle"
                    @keyup="keyUp"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Member"
                    v-model="member"
                    counter="50"
                    :rules="rulesMember"
                    @keyup="keyUp"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    rows="3"
                    label="Note"
                    v-model="note"
                    counter="200"
                    :rules="rulesNote"
                    @keyup="keyUp"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" style="outline:0" text @click="dialog = false">Close</v-btn>
            <v-btn
              v-bind:disabled="isPush"
              color="blue darken-1"
              style="outline:0"
              text
              @click="
                  dialog = false;
                  register();
                "
            >Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      isPush: true,
      rulesTitle: [
        v => !!v || "必ず入力してください",
        v => v.length <= 50 || "50字以内で記入してください"
      ],
      rulesMember: [v => v.length <= 50 || "50字以内で記入してください"],
      rulesNote: [v => v.length <= 200 || "200字以内で記入してください"],
      dialog: false,
      show: true,
      status: "ボタンを押すと音声入力が開始します",
      speech: new window.webkitSpeechRecognition(),
      final: "",
      content: [],
      title: "",
      member: "",
      note: ""
    };
  },
  methods: {
    // スタートボタンを押した時
    recording() {
      this.speech.start();
      // 何らかの音が鳴った時に発火
      this.speech.onsoundstart = () => {
        this.status = "認識中...";
      };
      // 音声認識サービスが意味を認識できない最終結果を返した時に発火
      this.speech.onnomatch = () => {
        this.status = "もう一度試してください...";
      };
      // 音声認識でエラーが起こった時に発火
      this.speech.onerror = () => {
        this.status = "エラー...";
      };
      // 何らかの音が鳴り止んだ時に発火
      this.speech.onsoundend = () => {
        this.status = "停止中...";
      };

      //音声認識サービスが結果を返した時に動く(通常動作);
      this.speech.onresult = event => {
        var final = "";
        var interim = "";
        var results = event.results;
        for (var i = 0; i < results.length; i++) {
          if (results[i].isFinal) {
            final += results[i][0].transcript;
          } else {
            interim += "　" + results[i][0].transcript;
          }
        }
        this.final = final + interim;
      };
    },
    // ストップボタンを押した時
    stop() {
      this.speech.stop();
      this.$store.dispatch("setContent", this.final);
    },
    register() {
      axios
        .post("/registerRecording", {
          userId: this.$store.state.loginUser.userId,
          title: this.title,
          content: this.final,
          member: this.member,
          remarks: this.note
        })
        .then(() => {
          alert("議事録内容を保存しました");
          this.$router.push("/saveList");
        })
        .catch(e => {
          alert("問題が発生しました。もう1度作業をやり直してください。" + e);
        });
    },
    keyUp() {
      if (
        this.note.length > 200 ||
        this.member.length > 50 ||
        this.title.length > 50 ||
        this.title.length == 0
      ) {
        this.isPush = true;
      } else if (
        this.note.length <= 200 &&
        this.member.length <= 50 &&
        0 < this.title.length <= 50
      ) {
        this.isPush = false;
      }
    }
  },
  created() {
    this.content = this.$store.state.content;
    this.speech.lang = "ja-JP"; // 言語設定
    this.speech.interimResults = true; // 暫定的な結果を返す(true)、そうでないか(false)
    this.speech.continuous = true; // 認識結果を継続的で返す(true)、単一で返す(false)
  }
};
</script>

<style scoped>
.modal-header,
.modal-body {
  padding: 5px 25px;
}
.modal-header {
  border-bottom: 1px solid #ddd;
}
</style>
