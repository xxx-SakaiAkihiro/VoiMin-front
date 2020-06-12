<template>
  <v-card class="mx-8 mt-5">
    <v-list class="mx-5 my-3">
      <v-subheader class="title">2020/6/12</v-subheader>
      <v-list-item @click="toPage('/saveDetail')">
        <v-list-item-content>
          <v-list-item-title>タイトル1</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey">mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

      <v-list-item @click="toPage('/saveDetail')">
        <v-list-item-content>
          <v-list-item-title>タイトル2</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey">mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

      <v-divider></v-divider>

      <v-subheader class="title">2020/6/11</v-subheader>
      <v-list-item @click="toPage('/saveDetail')">
        <v-list-item-content>
          <v-list-item-title>タイトル3</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey">mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import moment from "moment";
import axios from "axios";
export default {
  data() {
    return {
      getRecordingList: [],
      recordingList: [],
      filterRecordingList: [],
    };
  },
  // computed: {
  //   filter() {
  //     var filterRecordingList = [];
  //     // for(let num in this.recordingList){

  //     // }
  //   },
  // },

  methods: {
    toPage(path) {
      this.$router.push(path).catch((err) => {
        err;
      });
    },
  },
  created() {
    axios
      .post("/findRecording", {
        userId: this.$store.state.loginUser.userId,
      })
      .then((response) => {
        this.getRecordingList = response.data;
        for (let num in this.getRecordingList) {
          this.recordingList.push({
            date: moment(this.getRecordingList[num].date).format("YYYY-MM-DD"),
            content: this.getRecordingList[num].content,
            member: this.getRecordingList[num].member,
            remarks: this.getRecordingList[num].remarks,
            title: this.getRecordingList[num].title,
            recordingId: this.getRecordingList[num].recordingId,
          });
          this.$store.dispatch("setRecordingList", this.recordingList);
        }
      });
  },
};
</script>
