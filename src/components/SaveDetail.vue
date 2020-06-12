<template>
  <v-app>
    <v-container fluid class="mt-5">
      <v-row class="title">2020/6/12</v-row>
      <v-row class="mt-5">
        <v-col>
          <v-text-field label="Title" outlined rounded dense></v-text-field>
        </v-col>
        <v-col>
          <v-text-field label="Member" outlined rounded dense></v-text-field>
        </v-col>
        <v-col>
          <v-text-field label="Note" outlined rounded dense></v-text-field>
        </v-col>
      </v-row>
      <v-textarea outlined auto-grow label="Content" rows="14"></v-textarea>

      <v-col>
        <v-btn rounded color="primary" absolute right>
          <v-icon class="mr-1">mdi-cached</v-icon>Update
        </v-btn>
      </v-col>
    </v-container>
  </v-app>
</template>