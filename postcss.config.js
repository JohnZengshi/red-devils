/*
 * @LastEditors: John
 * @Date: 2024-06-17 18:25:10
 * @LastEditTime: 2024-06-17 18:45:37
 * @Author: John
 */
export default {
  plugins: {
    autoprefixer: {},
    "postcss-pxtorem": {
      rootValue: 37.5,
      propList: ["*"],
      exclude: (e) => {
        if (/.module\.css$/.test(e)) {
          console.log(e);
          return false;
        }
        return true;
      },
    },
  },
};
