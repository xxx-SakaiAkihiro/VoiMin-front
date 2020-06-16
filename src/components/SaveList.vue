<template>
  <v-card class="mx-8 my-3">
    <v-list class="mx-10">
      <v-subheader class="title" id="title">SaveRecordingList</v-subheader>
      <v-list-item-group v-model="dateFilterList">
        <v-list-itemtwo-line v-for="(item, i) in dateFilterList" :key="i">
          <v-divider></v-divider>
          <v-list-item-content>
            <v-list-item-title v-text="item.date" id="dateTitle"></v-list-item-title>
            <v-list-item-subtitle v-for="(item, i) in item.itemList" :key="i">
              <v-list-item @click="edit(item)" id="itemTitle">
                <span>{{ item.title }}</span>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon color="grey">mdi-delete</v-icon>
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
      recordingList: []
    };
  },
  methods: {
    edit(item) {
      this.$router.push({
        name: "SaveDetail",
        query: { item: encodeURIComponent(JSON.stringify(item)) }
      });
    }
    // toPage(path) {
    //   this.$router.push(path).catch(err => {
    //     err;
    //   });
    // }
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
      console.log(dateFilterList);
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
</style>
