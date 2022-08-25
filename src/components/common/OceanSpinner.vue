<template>
  <div class="ocean-spinner">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "OceanSpinner",
});
</script>

<style lang="sass" scoped>
/* inspired by https://uiverse.io/detail/satyamchaudharydev/splendid-husky-54 by @satyamchaudharydev */
.ocean-spinner
  position: relative
  width: 60px
  height: 60px
  display: flex
  justify-content: center
  align-items: center
  border-radius: 50%
  margin-left: -75px

  & span
    position: absolute
    top: 50%
    left: var(--left)
    width: 35px
    height: 7px
    background: $primary
    border-radius: 3px
    animation: dominos 1s ease infinite
    box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.4),inset 0px 0px 3px 0px rgba(0, 0, 0, 0.4)
    -webkit-transform: rotate(-20deg)
    transform: rotate(-20deg)

  & span:nth-child(1)
    left: 80px
    animation-delay: 0.125s

  & span:nth-child(2)
    left: 70px
    animation-delay: 0.3s

  & span:nth-child(3)
    left: 60px
    animation-delay: 0.425s

  & span:nth-child(4)
    animation-delay: 0.54s
    left: 50px

  & span:nth-child(5)
    animation-delay: 0.665s
    left: 40px

  & span:nth-child(6)
    animation-delay: 0.79s
    left: 30px

  & span:nth-child(7)
    animation-delay: 0.915s
    left: 20px

  & span:nth-child(8)
    left: 10px

@keyframes dominos
  50%
    opacity: 0.7

  75%
    -webkit-transform: rotate(25deg)
    transform: rotate(25deg)

  80%
    opacity: 1
</style>
