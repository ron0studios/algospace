import PocketBase from "pocketbase";
import { ref } from "vue";

const pb = new PocketBase((import.meta.env.PROD) ? import.meta.env.VITE_WEB_URL : import.meta.env.VITE_PB_LOCAL);


const getProblem = (id) => {
  const problem = ref(null);
  const error = ref(null);

  const load = async () => {
    try {
      let res = await pb.collection("problem").getOne(id);
      problem.value = res;
    } catch (err) {
      error.value = err.message;
      console.log(err.value);
    }
  };

  return { problem, error, load };
};

export default getProblem;