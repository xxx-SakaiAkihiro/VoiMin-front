<template>
  <v-card class="mx-8 my-3">
    <v-subheader class="title mt-5 ml-4" style="font-weight:bold;">SaveRecordingList</v-subheader>
    <v-list class="mx-10">
      <center>
        <div
          style="font-size:17px;font-weight:bold;"
          class="ma-5"
          v-if="dateFilterList.length === 0"
        >保存されている録音記録はありません。</div>
      </center>
      <v-list-item-group>
        <v-list two-line name="title" v-for="(item, i) in dateFilterList" :key="i">
          <v-list-item-content>
            <v-divider class="ma-0"></v-divider>
            <v-list-item-title
              class="mt-5"
              style="font-size: 17px;font-weight:bold;"
              v-text="item.date"
            ></v-list-item-title>
            <v-list-item-subtitle v-for="(item, i) in item.itemList" :key="i">
              <v-list-item style="font-size: 15px;font-weight:bold;">
                <v-col cols="18" @click="detail(item)">{{ item.title }}</v-col>
                <v-btn icon>
                  <v-icon @click="recordingDelete(item.rcordingId)" color="grey">mdi-delete</v-icon>
                </v-btn>
              </v-list-item>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list>
      </v-list-item-group>
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
    };
  },
  methods: {
    recordingDelete(Id) {
      if (confirm("削除してよろしいですか？")) {
        axios
          .post("/delete", {
            recordingId: Id
          })
          .then(() => {
            alert("削除しました");
            this.$router.go({
              path: this.$router.currentRoute.path,
              force: true
            });
          })
          .catch(e => {
            alert("問題が発生しました。もう1度作業をやり直してください。" + e),
              this.$router.push("/home");
          });
      }
    },
    detail(item) {
      this.$router.push({
        name: "SaveDetail",
        query: { item: encodeURIComponent(JSON.stringify(item)) }
      });
    }
  },
  computed: {
    dateFilterList() {
      var duplicationDateMap = new Map(
        this.recordingList.map(r => [r.date, r.date])
      );
      var duplicationDateList = Array.from(duplicationDateMap.values());
      var dateFilterList = [];
      for (let num in duplicationDateList) {
        var filterObject = { date: duplicationDateList[num], itemList: [] };
        dateFilterList.push(filterObject);
      }

      for (let num in dateFilterList) {
        this.recordingList.map(function(array) {
          if (dateFilterList[num].date === array.date) {
            var filterRecordingObject = {
              title: array.title,
              rcordingId: array.recordingId
            };
            dateFilterList[num].itemList.push(filterRecordingObject);
          }
        });
      }
      return dateFilterList;
    }
  },
  created() {
    axios
      .post("/findRecording", {
        userId: this.$store.state.loginUser.userId
      })
      .then(response => {
        this.getRecordingList = response.data;
        this.$store.dispatch("setRecordingList", this.getRecordingList);

        for (let num in this.getRecordingList) {
          this.recordingList.push({
            date: moment(this.getRecordingList[num].date).format("YYYY/MM/DD"),
            content: this.getRecordingList[num].content,
            member: this.getRecordingList[num].member,
            remarks: this.getRecordingList[num].remarks,
            title: this.getRecordingList[num].title,
            recordingId: this.getRecordingList[num].recordingId
          });
        }
      });
  }
};
</script>
