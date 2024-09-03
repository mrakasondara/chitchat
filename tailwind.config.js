/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        suse: "SUSE",
      },
      colors: {
        main: "#229799",
        status: "#22979977",
      },
    },
  },
  _plugins: [
    daisyui,
    // {
    //   themes: [
    //     {
    //       mytheme: {
    //         main: "#229799",
    //       },
    //     },
    //   ],
    // },
  ],
  get plugins() {
    return this._plugins;
  },
  set plugins(value) {
    this._plugins = value;
  },
};
