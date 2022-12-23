<template>
  <router-link :to="{name: 'problemDetails', params: {id: data.id}}" class="card" :style="{'border-left-color': style}"> 
    <div class="card__content">
        <div class="details">
            <h1 class="title">{{ data.title }} </h1>
            <div class="difficulty" :style="{color: style}">{{data.difficulty}}</div>
        </div>
        <div class="tags">
            <router-link class="pill" :to="{name: 'home'}" v-for="tag in data.tags" :key="tag">{{tag}}</router-link>
            <!--
            <router-link class="pill" :to="{name: 'home'}">dp</router-link>
            <router-link class="pill" :to="{name: 'home'}">bfs</router-link>
            <router-link class="pill" :to="{name: 'home'}">trees</router-link>
            <router-link class="pill" :to="{name: 'home'}">graphs</router-link>
            -->
        </div>
    </div>
  </router-link>
</template>

<script>
import { ref } from '@vue/reactivity';

export default {
    props: ["data"],
    setup(props){
        let style = ref("");
        switch (props.data.difficulty) {
            case "EASY":
                style = "lime"
                break;
            case "MEDIUM":
                style = "orange"
                break;
            case "HARD":
                style = "orangered"
                break;
            case "INSANE":
                style = "magenta"
                break;
            case "UNKNOWN":
                style = "gray"
                break;
            default:
                break;
        }


        return {style}
    }
}
</script>

<style scoped>
.tags {
    position: absolute;
    bottom: 10px;
    left: 0;
}

.pill {
    margin: 5px 10px;
    padding: 3px 5px;
    background: rgb(29, 16, 46);
    color: rgb(219, 204, 255);
    border-radius: 10px;
    text-decoration: none;
    display: inline-block;

}

h1.title {
    font-size: 25px;
    margin-top: 10px;
    margin-bottom: 0;
    color: white;
}

.difficulty {
    font-weight: bold;
    letter-spacing: .1em;
    color: gray;
    font-size: 15px;
}

.card {
  background: #2e296b;
  border-radius: 10px;
  border-left: 10px solid gray;
  text-decoration: none;
}

.card__content {
    padding: 0 10px;
    height: 100%;
    position: relative;
}
</style>