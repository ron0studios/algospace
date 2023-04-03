
<template>
<button class="toggle" @click="themeChange">
    <MoonIcon class="icon" v-if="darkMode"/>
    <SunIcon class="icon" v-else/>
</button>
</template>

<script>
import { MoonIcon, SunIcon } from "@heroicons/vue/24/solid";
import { ref } from 'vue';

export default {
    components: {
        MoonIcon,
        SunIcon
    },
    setup()
    {
        const darkMode = ref(true); 
        const themeChange = () => {
            darkMode.value = !darkMode.value;
        }

        return {themeChange, darkMode}
    }
}
</script>

<style scoped>
.hidden {
    display: none;
}

.toggle {
    width: 50px;
}

</style>