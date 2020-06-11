<template>
  <v-container class="mt-5">
    <v-row align-v="center" align-h="center">
      <v-col>
        <Login />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Login from "@/components/Login.vue";

export default {
  components: {
    Login,
  },
};
</script>
