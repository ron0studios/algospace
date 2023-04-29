<template>
  <div class="home">
    <div class="hero">
      <div class="typewriter">
        <h1 :class="'typewriter-' + displayTextArrayIndex">{{ typeValue }}</h1>
      </div>
      <div class="subtitle">
        A coding platform tailored for UK contests and beyond.
      </div>
    </div>
    <div class="slide1">
      <div class="content">
        <h2>A curated set of problem guides</h2>
        <p>
          With Algospace, you can find clear-cut solutions with detailed
          explanations, for problems spanning across the BIO and IOI syllabus.
        </p>
      </div>
      <div class="content__image">
        <img src="@/assets/400x300.jpg" />
      </div>
    </div>
    <div class="slide2">
      <h1>find the problem best suited for you</h1>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { onMounted } from "vue";

export default {
  setup() {
    const typeValue = ref("");
    const displayTextArray = [
      "algospace",
      '"Algospace"',
      "ALGOSPACE",
      "algo_space;",
    ];
    const typingSpeed = 100;
    const erasingSpeed = 50;
    const newTextDelay = 4000;
    let displayTextArrayIndex = ref(0);
    let charIndex = 0;
    let typeStatus = false;

    const typeText = () => {
      if (charIndex < displayTextArray[displayTextArrayIndex.value].length) {
        if (!typeStatus) typeStatus = true;
        typeValue.value +=
          displayTextArray[displayTextArrayIndex.value].charAt(charIndex);
        charIndex += 1;
        setTimeout(typeText, typingSpeed);
      } else {
        typeStatus = false;
        setTimeout(eraseText, newTextDelay);
      }
    };

    const eraseText = () => {
      if (charIndex > 0) {
        if (!typeStatus) typeStatus = true;
        typeValue.value = displayTextArray[
          displayTextArrayIndex.value
        ].substring(0, charIndex - 1);
        charIndex -= 1;
        setTimeout(eraseText, erasingSpeed);
      } else {
        typeStatus = false;
        displayTextArrayIndex.value += 1;
        if (displayTextArrayIndex.value >= displayTextArray.length)
          displayTextArrayIndex.value = 0;
        setTimeout(typeText, typingSpeed + 1000);
      }
    };

    onMounted(() => {
      setTimeout(typeText, 1000);
    });

    return { typeValue, displayTextArrayIndex };
  },
};
</script>

<style>
.home .hero {
  height: 50vh;
  width: 100%;
  background: #241e33;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.home .hero h1 {
  font-family: "Courier New", Courier, monospace;
  font-size: 5vw;
  color: white;
  overflow: hidden;
  border-right: 0.1em solid orange;
  white-space: nowrap;
  margin: 0 auto;
  animation: blink-caret 1.5s step-end infinite;
  margin: 50px;
}

.home .hero h1:empty::before {
  content: "";
  display: inline-block;
}

.home .subtitle {
  font-family: "Courier New", Courier, monospace;
  font-size: 1vw;
  color: white;
  display: block;
  width: 1000px;
  text-align: center;
}

@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: orange;
  }
}

.home .slide1 {
  height: 70vh;
  width: 100%;
  background: white;
  display: flex;
  align-items: center;
}

.home .slide1 .content {
  width: 30%;
  margin: 10%;
}

.home .slide2 {
  height: 70vh;
  width: 100%;
  background: white;
  display: flex;
  align-items: center;
}
</style>

<style>
.typewriter-0 {
  color: white !important;
}
.typewriter-1 {
  color: lightgreen !important;
}
.typewriter-2 {
  color: yellow !important;
  font-weight: 100;
  font-style: italic;
}
.typewriter-3 {
  color: #ccccff !important;
}
</style>
