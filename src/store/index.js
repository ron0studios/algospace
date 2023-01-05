import { defineStore } from 'pinia'
import getProblems from "@/composables/getProblems"

export const useProblemsStore = defineStore('problems', () => {
    const {problems, error, load, left, right } = getProblems()
    load()

  return {problems, error, load, left, right}
})
