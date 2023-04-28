import PocketBase from "pocketbase";
import { ref } from "vue";

const pb = new PocketBase((import.meta.env.PROD) ? import.meta.env.VITE_WEB_URL : import.meta.env.VITE_PB_LOCAL);


const getProblems = () => {
  const problems = ref([]);
  const error = ref(null);
  const pagecount = ref(10);
  const page = ref(1);
  const tot_pages = ref(0);
  const sortParams = ref("");
  const filterParams = ref("");
  let loading = false;

  const load = async (sort="", filter="") => {
    if (loading) return;
    loading = true;

    sortParams.value = sort
    filterParams.value = filter
    page.value = 1

    console.log("running load...");
    try {
      const res = await pb
        .collection("problem")
        .getList(1, pagecount.value, { expand: "tag", sort: sortParams.value, filter: filterParams.value });
      tot_pages.value = res.totalPages;
      problems.value = res.items.map((x) => {
        x.tag = x.expand.tag.map((y) => y.title);
        return x;
      });
    } catch (err) {
      error.value = err.message;
      console.log(err.message);
    }


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
        .getList(page.value - 1, pagecount.value, { expand: "tag", sort: sortParams.value, filter: filterParams.value });
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
        .getList(page.value + 1, pagecount.value, { expand: "tag", sort: sortParams.value, filter: filterParams.value});
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


  const jump = async (pageNo) => {
    if (loading) {
      console.log("blocked");
      return;
    }
    loading = true;

    try {
      page.value = pageNo-1;

      const res = await pb
      .collection("problem")
      .getList(page.value, pagecount.value, {expand: "tag", sort: sortParams.value, filter: filterParams.value});
      problems.value = res.items.map((x) => {
        x.tag = x.expand.tag.map((y) => y.title);
        return x;
      });
    } catch(err) {
      error.value = err.message;
      console.log(err.message)
    }

    if (!error.value) {
      page.value += 1;
    }

    loading = false;
  };

  return { problems, error, load, left, right, jump, page, sortParams, filterParams, tot_pages };
};

export default getProblems;
