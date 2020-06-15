<template>
  <v-card class="mx-8 mt-5">
    <v-list>

      <v-list-group no-action>
        <template v-slot:activator>
          <v-list-item-title class="font-weight-bold">このアプリについて</v-list-item-title>
        </template>
        <v-list-item>
          <v-list-item-title>音声をテキスト変換できるアプリです</v-list-item-title>
        </v-list-item>
      </v-list-group>

      <v-list-group no-action>
        <template v-slot:activator>
          <v-list-item-title class="font-weight-bold">アイコンについて</v-list-item-title>
        </template>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>far fa-comment-dots</v-icon>
          </v-list-item-icon>
          <v-list-item-title>録音画面へ遷移ボタン</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>fas fa-history</v-icon>
          </v-list-item-icon>
          <v-list-item-title>保存リスト画面へ遷移ボタン</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>far fa-question-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-title>ヘルプ画面へ遷移ボタン</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>fas fa-sign-out-alt</v-icon>
          </v-list-item-icon>
          <v-list-item-title>ログアウトボタン</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>fas fa-microphone</v-icon>
          </v-list-item-icon>
          <v-list-item-title>録音スタートボタン</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>fas fa-square</v-icon>
          </v-list-item-icon>
          <v-list-item-title>録音ストップボタン</v-list-item-title>
        </v-list-item>
      </v-list-group>

      <v-list-group no-action>
        <template v-slot:activator>
          <v-list-item-title class="font-weight-bold">使い方</v-list-item-title>
        </template>
        <v-list-group no-action sub-group>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>音声から書き起こし</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item>
            <v-list-item-title>1. 録音スタートボタンをクリックし発話する
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>2. 録音ストップボタンをクリック</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>3. 議事録の詳細を記載し、保存</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>4. 保存リストに追加される</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>5. 保存リストをクリックし、確認！</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>6. テキストが保存されてます</v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list-group>
    </v-list>
  </v-card>
</template>
