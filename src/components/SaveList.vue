<template>
  <v-card class="mx-8 mt-5">
    <v-list class="mx-5 my-3">
      <v-header inset class="title">2020/6/12</v-header>
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

      <v-header inset class="title">2020/6/11</v-header>
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
export default {
  methods: {
    toPage(path) {
      this.$router.push(path).catch(err => {
        err;
      });
    }
  },
}
</script>