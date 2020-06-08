<template>
  <v-app>
    <v-container fluid>
      <v-text-field outlined filled label="表示" auto-grow></v-text-field>
      <v-row justify="center">
        <v-hover v-slot:default="{ hover }">
          <!-- スタートボタン -->
          <v-btn
            @click="show=!show"
            v-if="show"
            color="primary"
            :elevation="hover ? 12 : 2"
            fab
            x-large
          >
            <v-icon>fas fa-microphone</v-icon>
          </v-btn>
          <!-- ストップボタン -->
          <v-btn
            @click="show=!show"
            v-else
            color="primary"
            :elevation="hover ? 12 : 2"
            fab
            x-large
          >
            <v-icon color="black">fas fa-square</v-icon>
          </v-btn>
        </v-hover>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      show: true
    };
  }
};
</script>