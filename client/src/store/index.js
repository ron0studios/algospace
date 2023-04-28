import { defineStore } from "pinia";
import getProblems from "@/composables/getProblems";

export const useProblemsStore = defineStore("problems", () => {
  const { problems, error, load, left, right, jump, page, sortParams, filterParams, tot_pages } =
    getProblems();
  load();


  return { problems, error, load, left, right, jump, page, sortParams, filterParams, tot_pages};
});
