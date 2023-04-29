<template>
  <router-link
    :to="{ name: 'problemDetails', params: { id: data.id } }"
    class="problem-card"
    :style="{ 'border-left-color': style }"
  >
    <div class="card__content">
      <div class="details">
        <div>
          <h1 class="title">{{ data.title }}</h1>
          <div class="difficulty" :style="{ color: style }">
            {{ data.difficulty }}
          </div>
        </div>
        <div>
          <p class="problem-type">{{ data.contest }}</p>
        </div>
      </div>
      <div class="tags">
        <router-link
          class="pill"
          :to="{ name: 'home' }"
          v-for="tag in data.tag"
          :key="tag"
          >{{ tag }}</router-link
        >
      </div>
    </div>
  </router-link>
</template>

<script>
import { ref } from "vue";

export default {
  props: ["data"],
  setup(props) {
    let style = ref("");
    switch (props.data.difficulty) {
      case "EASY":
        style.value = "lime";
        break;
      case "MEDIUM":
        style.value = "orange";
        break;
      case "HARD":
        style.value = "orangered";
        break;
      case "INSANE":
        style.value = "magenta";
        break;
      case "UNKNOWN":
        style.value = "gray";
        break;
      default:
        break;
    }

    return { style };
  },
};
</script>

<style>
.details {
  display: flex;
  justify-content: space-between;
}

.problem-type {
  text-decoration: none;
  font-weight: bold;
  letter-spacing: 0.1em;
  color: var(--highlight);
  font-size: 16px;
  margin-top: 10px;
}

.tags {
  position: absolute;
  bottom: 0px;
  left: 0;
}

.pill {
  margin: 5px 10px;
  padding: 3px 5px;
  background: var(--background);
  color: rgb(219, 204, 255);
  border-radius: 10px;
  text-decoration: none;
  display: inline-block;
}

.pill:hover {
  background: var(--background-dark);
}

h1.title {
  font-size: 25px;
  margin-top: 10px;
  margin-bottom: 0;
  color: white;
}

.difficulty {
  font-weight: bold;
  letter-spacing: 0.1em;
  color: gray;
  font-size: 15px;
}

.problem-card {
  background: var(--primary-3);
  border-radius: 10px;
  border-left: 10px solid gray;
  text-decoration: none;
}

.problem-card:hover {
  background: var(--primary-4);
}

.card__content {
  padding: 0 10px;
  height: 100%;
  position: relative;
}
</style>
