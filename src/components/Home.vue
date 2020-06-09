<template>
  <v-app>
    <v-container fluid>
      <v-text-field
        outlined
        filled
        label="CONTENT"
        auto-grow
        v-model="final"
        height="340"
      >
      </v-text-field>
      <!-- ステータスの文章 -->
      <v-row justify="center" class="mb-3">
        <v-card class="text-center" max-width="300">
          <v-card-subtitle class="display-0.5 font-weight-black blue--text">
            {{ status }}
          </v-card-subtitle>
        </v-card>
      </v-row>
      <v-row justify="center">
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
          >
            <v-icon>fas fa-microphone</v-icon>
          </v-btn>
          <!-- ストップボタン -->
          <v-btn
            @click="
              show = !show;
              stop();
            "
            v-else
            color="primary"
            :elevation="hover ? 12 : 2"
            fab
            x-large
          >
            <v-icon color="red">fas fa-square</v-icon>
          </v-btn>
        </v-hover>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      status: "ボタンを押すと音声入力が開始します",
      speech: new window.webkitSpeechRecognition(),
      final: "",
      content: [],
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
      this.speech.onresult = (event) => {
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
        this.final += final + interim;
      };
    },
    // ストップボタンを押した時
    stop() {
      this.speech.stop();
      this.$store.dispatch("setContent", this.final);
    },
  },
  created() {
    this.content = this.$store.state.content;
    // for (var i = 0; i < this.$store.state.content.length; i++) {
    //   this.content += this.$store.state.content[i];
    // }

    this.speech.lang = "ja-JP"; // 言語設定
    this.speech.interimResults = true; // 暫定的な結果を返す(true)、そうでないか(false)
    this.speech.continuous = true; // 認識結果を継続的で返す(true)、単一で返す(false)
  },
};
</script>