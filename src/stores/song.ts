import { defineStore } from "pinia";

export const useSongStore = defineStore("song", {
  state: () => {
    return {
      myAppRoot: "",
    };
  },
  actions: {
    setMyAppRoot(path: string) {
      this.myAppRoot = path;
    },
  },
});
