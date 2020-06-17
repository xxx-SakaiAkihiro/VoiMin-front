<template>
  <v-app>
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
      <v-row class="title" justify="center">{{result[0].date | moment}}</v-row>
      <v-row class="mt-3">
        <v-col>
          <v-text-field label="Title" outlined rounded dense v-model="param.title"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field label="Member" outlined rounded dense v-model="param.member"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field label="Note" outlined rounded dense v-model="param.remarks"></v-text-field>
        </v-col>
      </v-row>
      <v-textarea outlined auto-grow label="Content" rows="14" v-model="param.content"></v-textarea>

      <v-col>
        <v-btn rounded color="primary" absolute right style="outline:0" @click="edit()">
          <v-icon class="mr-1">mdi-cached</v-icon>Update
        </v-btn>
      </v-col>
    </v-container>
  </v-app>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data() {
    return {
      result: "",
      param: {
        title: String,
        member: String,
        remarks: String,
        content: String
      }
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
    }
  },
  mounted() {
    /** 全議事録からIDの絞り込み */
    this.result = this.recordingList.filter(
      v => v.recordingId === this.rcordingData.rcordingId
    );
    this.param.title = this.result[0].title;
    this.param.member = this.result[0].member;
    this.param.remarks = this.result[0].remarks;
    this.param.content = this.result[0].content;
  }
};
</script>