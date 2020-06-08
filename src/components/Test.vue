<template>
  <input type="button" @click="test" value="テスト" />
</template>

<script>
import axios from "axios";

export default {
  methods: {
    test() {
      var testParm = "こんにちは";
      axios
        .post("/test", {
          testParm,
        })
        .then((response) => {
          alert("テスト成功");
          console.log(response);
        })
        .catch((error) => {
          alert("error:" + error);
          console.error(error);
        });
      console.log("てすとおわり");
    },
  },
};
</script>
