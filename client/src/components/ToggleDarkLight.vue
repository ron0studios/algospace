
<template>
 <div class = 'toggle-switch'>
            <label>
                <input type = 'checkbox'>
                <span class = 'slider'></span>
            </label>

        </div> 
</template>

<script>
// https://codepen.io/alvarotrigo/pen/zYPydpB
export default {

}
</script>

<style>
:root {
  --light: #d8dbe0;
  --dark: #28292c;
  --link: rgb(27, 129, 112);
  --link-hover: rgb(24, 94, 82);
}

.toggle-switch > * {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.toggle-switch {
  position: relative;
  width: 100px;
}

.toggle-switch > label {
  position: absolute;
  width: 100%;
  height: 50px;
  background-color: var(--dark);
  border-radius: 50px;
  cursor: pointer;
}

.toggle-switch > label > input {
  position: absolute;
  display: none;
}

.toggle-switch > label > .slider {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 25px;
  transition: 0.3s;
}

.toggle-switch > label > input:checked ~ .slider {
  background-color: var(--light);
}

.toggle-switch > label > .slider::before {
  content: "";
  position: absolute;
  top: 6.5px;
  left: 8px;
  width: 37.5px;
  height: 37.5px;
  border-radius: 50%;
  box-shadow: inset 14px -2px 0px 0px var(--light);
  background-color: var(--dark);
  transition: 0.3s;
}

.toggle-switch > label > input:checked ~ .slider::before {
  transform: translateX(47.5px);
  background-color: var(--dark);
  box-shadow: none;
}
</style>