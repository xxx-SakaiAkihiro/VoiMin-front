<template>
  <b-modal id="authority-modal" ok-only centered title="音声録音詳細画面">
    <b-row align-v="center" class="px-3 mb-3">
      <v-subheader>タイトル</v-subheader>
      <b-col cols="12" sm="10" class="py-0">
        <v-text-filed labal="taitle"> </v-text-filed>
      </b-col>
      <b-col cols="3" sm="2" class="pb-1 pt-0">
        <b-button
          variant="outline-success"
          :disabled="item === ''"
          size="sm"
          @click="addAdminAuthority()"
          >追加</b-button
        >
      </b-col>
    </b-row>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {
    show() {
      this.$modal.show("hello");
    },
    hide() {
      this.$modal.hide("hello");
    },
  },
};
</script>

<style scoped>
.modal-header,
.modal-body {
  padding: 5px 25px;
}
.modal-header {
  border-bottom: 1px solid #ddd;
}
</style>
