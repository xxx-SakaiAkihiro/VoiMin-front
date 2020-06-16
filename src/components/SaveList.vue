<template>
  <v-card class="mx-8 my-3 ">
    <v-list class="mx-10 ">
      <v-subheader class="title" id="title">SaveRecordingList </v-subheader>
      <span id="null" v-if="dateFilterList.length === 0">
        保存されている録音記録はありません。</span
      >
      <v-list-item-group>
        <v-list-itemtwo-line
          name="title"
          v-for="(item, i) in dateFilterList"
          :key="i"
        >
          <v-list-item-content>
            <v-divider></v-divider>
            <v-list-item-title v-text="item.date" id="dateTitle">
            </v-list-item-title>
            <v-list-item-subtitle v-for="(item, i) in item.itemList" :key="i">
              <v-list-item>
                <span @click="toPage('/saveDetail')" id="itemTitle">
                  {{ item.title }}</span
                >
                <v-spacer></v-spacer>
                <v-btn icon>
                  <span>
                    <v-icon
                      @click="recordingDelete(item.rcordingId)"
                      color="grey"
                      >mdi-delete</v-icon
                    >
                  </span>
                </v-btn>
              </v-list-item>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-itemtwo-line>
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
            recordingId: Id,
          })
          .then(() => {
            alert("削除しました");
            this.$router.go({
              path: this.$router.currentRoute.path,
              force: true,
            });
          })
          .catch((e) => {
            alert("問題が発生しました。もう1度作業をやり直してください。" + e),
              this.$router.push("/home");
          });
      }
    },
    toPage(path) {
      this.$router.push(path).catch((err) => {
        err;
      });
    },
  },
  computed: {
    dateFilterList() {
      var duplicationDateMap = new Map(
        this.recordingList.map((r) => [r.date, r.date])
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
              rcordingId: array.recordingId,
            };
            dateFilterList[num].itemList.push(filterRecordingObject);
          }
        });
      }
      return dateFilterList;
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

<style scoped>
#title {
  font-size: 20px;
  font-weight: 800;
  padding-left: 20px;
}
#dateTitle {
  font-size: 18px;
  font-weight: 600;
  padding-left: 20px;
}
#itemTitle {
  font-size: 18px;
  padding-left: 30px;
}
#null {
  color: rgb(82, 52, 52);
  font-size: 18px;
  font-weight: 500;
  padding-left: 400px;
}
</style>
