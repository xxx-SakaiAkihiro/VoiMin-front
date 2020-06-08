module.exports = {
  pages: {
    index: {
      entry: "src/main.js",
      title: "VoiMin",
    },
  },
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      "/api/": {
        target: "http://localhost:8080",
      },
    },
    port: 8888,
    disableHostCheck: true,
  },
};
