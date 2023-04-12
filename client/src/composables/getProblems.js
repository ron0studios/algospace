import PocketBase from "pocketbase";
import { ref } from "vue";

const pb = new PocketBase("http://140.238.71.54");


const getProblems = () => {
  const problems = ref([]);
  const error = ref(null);
  const pagecount = ref(10);
  const page = ref(1);
  const tot_pages = ref(0);
  let loading = false;

  const load = async () => {
    if (loading) return;
    loading = true;

    console.log("running load...");
    try {
      const res = await pb
        .collection("problem")
        .getList(1, pagecount.value, { expand: "tag" });
      tot_pages.value = res.totalPages;
      problems.value = res.items.map((x) => {
        x.tag = x.expand.tag.map((y) => y.title);
        return x;
      });
    } catch (err) {
      error.value = err.message;
      console.log(err.message);
    }

    console.log(problems.value[0]);

    loading = false;
  };

  const left = async () => {
    if (loading) {
      console.log("blocked");
      return;
    }
    loading = true;

    if (page.value == 1) {
      loading = false;
      return;
    }

    try {
      const res = await pb
        .collection("problem")
        .getList(page.value - 1, pagecount.value, { expand: "tag" });
      problems.value = res.items.map((x) => {
        x.tag = x.expand.tag.map((y) => y.title);
        return x;
      });
    } catch (err) {
      error.value = err.message;
      console.log(err.message);
    }

    if (!error.value) {
      page.value -= 1;
    }

    loading = false;
  };

  const right = async () => {
    if (loading) {
      console.log("blocked");
      return;
    }
    loading = true;

    if (page.value == tot_pages.value) {
      loading = false;
      return;
    }

    try {
      const res = await pb
        .collection("problem")
        .getList(page.value + 1, pagecount.value, { expand: "tag" });
      problems.value = res.items.map((x) => {
        x.tag = x.expand.tag.map((y) => y.title);
        return x;
      });
    } catch (err) {
      error.value = err.message;
      console.log(err.message);
    }

    if (!error.value) {
      page.value += 1;
    }

    loading = false;
  };

  return { problems, error, load, left, right, page };
};

export default getProblems;
