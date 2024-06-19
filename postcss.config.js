/*
 * @LastEditors: John
 * @Date: 2024-06-17 18:25:10
 * @LastEditTime: 2024-06-19 16:14:06
 * @Author: John
 */
export default {
  plugins: {
    autoprefixer: {},
    "postcss-pxtorem": {
      rootValue: 37.5,
      propList: ["*"],
      exclude: (e) => {
        if (/.*-m\.css$/.test(e) || /.module\.css$/.test(e)) {
          // console.log(e);
          return false;
        }
        return true;
      },
    },
  },
};
