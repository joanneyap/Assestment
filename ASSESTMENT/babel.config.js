module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
        },
      ],
      ["import", { libraryName: "@ant-design/react-native" }], // The difference with the Web platform is that you do not need to set the style
    ],
  };
};
