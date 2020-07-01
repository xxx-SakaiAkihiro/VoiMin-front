<template>
  <v-container fluid class="mt-5">
    <v-btn
      @click="$router.go(-1)"
      text
      x-large
      rounded
      color="primary"
      style="outline:0"
      class="font-weight-bold"
    >
      <v-icon class="mr-1">fas fa-chevron-left</v-icon>一覧
    </v-btn>
    <v-row class="title" justify="center">{{param.date | moment}}</v-row>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              label="Title"
              v-model="param.title"
              counter="50"
              :rules="rulesTitle"
              @keyup="keyUp"
              class="mb-8"
            ></v-text-field>
            <v-text-field
              label="Member"
              v-model="param.member"
              counter="50"
              :rules="rulesMember"
              @keyup="keyUp"
              class="mb-8"
            ></v-text-field>
            <v-textarea
              rows="4"
              label="Note"
              v-model="param.remarks"
              counter="200"
              :rules="rulesNote"
              @keyup="keyUp"
            ></v-textarea>
          </v-col>
          <v-col>
            <v-textarea
              outlined
              auto-grow
              label="Content"
              rows="14"
              v-model="param.content"
              @keyup="keyUp"
            ></v-textarea>
          </v-col>
        </v-row>

        <v-col>
          <v-btn
            rounded
            color="primary"
            absolute
            right
            style="outline:0"
            v-bind:disabled="isPush"
            @click="edit()"
          >
            <v-icon class="mr-1">mdi-cached</v-icon>Update
          </v-btn>
        </v-col>
      </v-container>
    </v-card-text>
  </v-container>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data() {
    return {
      isPush: true,
      result: "",
      param: {
        date: String,
        title: String,
        member: String,
        remarks: String,
        content: String
      },
      date: "",
      rulesTitle: [
        v => !!v || "必ず入力してください",
        v => v.length <= 50 || "50字以内で記入してください"
      ],
      rulesMember: [v => v.length <= 50 || "50字以内で記入してください"],
      rulesNote: [v => v.length <= 200 || "200字以内で記入してください"]
    };
  },
  filters: {
    moment: function(date) {
      return moment(date).format("YYYY/MM/DD HH:mm");
    }
  },
  computed: {
    /** ID取得 */
    rcordingData() {
      return JSON.parse(decodeURIComponent(this.$route.query.item));
    },
    /** 全議事録取得 */
    recordingList() {
      return this.$store.state.recordingList;
    }
  },
  methods: {
    edit() {
      axios.post("/edit", {
        title: this.param.title,
        member: this.param.member,
        remarks: this.param.remarks,
        content: this.param.content,
        recordingId: this.result[0].recordingId
      });
      alert("投稿内容の変更に成功しました。");
      this.$router.push("/saveList");
    },
    keyUp() {
      if (
        this.param.remarks.length > 200 ||
        this.param.member.length > 50 ||
        this.param.title.length > 50 ||
        this.param.title.length == 0
      ) {
        this.isPush = true;
      } else if (
        this.param.remarks.length <= 200 &&
        this.param.member.length <= 50 &&
        0 < this.param.title.length <= 50
      ) {
        this.isPush = false;
      }
    }
  },
  mounted() {
    /** 全議事録からIDの絞り込み */
    this.result = this.recordingList.filter(
      v => v.recordingId === this.rcordingData.rcordingId
    );
    this.param.date = this.result[0].date;
    this.param.title = this.result[0].title;
    this.param.member = this.result[0].member;
    this.param.remarks = this.result[0].remarks;
    this.param.content = this.result[0].content;
  }
};
</script>