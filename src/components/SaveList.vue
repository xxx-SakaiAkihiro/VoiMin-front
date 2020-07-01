<template>
  <v-card class="mx-8 my-5">
    <v-subheader class="title ml-3 mt-2">SaveRecordingList</v-subheader>
    <v-list class="mx-10">
      <v-list-item-group v-if="getRecordingList.length !== 0">
        <v-list two-line name="title" v-for="(dateFilter, i) in dateFilterList" :key="i">
          <v-divider class="mt-0"></v-divider>
          <v-list-item-title v-text="dateFilter.date" style="font-size:17px;font-weight:bold;"></v-list-item-title>
          <v-list-item-subtitle v-for="(item, i) in dateFilter.itemList" :key="i">
            <v-list-item>
              <v-list-item-content @click="detail(item)">
                <v-list-item-title v-text="item.title" style="font-size:16px;"></v-list-item-title>
              </v-list-item-content>
              <v-btn icon cols="3">
                <v-icon @click="recordingDelete(item.rcordingId)" color="grey">mdi-delete</v-icon>
              </v-btn>
            </v-list-item>
          </v-list-item-subtitle>
        </v-list>
      </v-list-item-group>
      <center v-else>
        <div style="font-size:12px;color:#666666;" class="ma-5">保存されている録音記録はありません。</div>
      </center>
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
      recordingList: []
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
