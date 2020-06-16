<template>
  <SaveList :recording-list="getRecordingList"></SaveList>
</template>

<script>
import SaveList from "@/components/SaveList";
import moment from "moment";
import axios from "axios";

export default {
  data() {
    return {
      getRecordingList: [],
      recordingList: [],
    };
  },
  components: {
    SaveList,
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
          return this.recordingList;
        }
      });
  },
};
</script>
