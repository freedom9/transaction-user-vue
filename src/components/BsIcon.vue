<template>
  <svg class="icon" :style="styleObj" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: [String, Number],
      default: 24
    }
  },
  computed: {
    iconName () {
      return `#icon-${this.name}`
    },
    styleObj () {
      return {
        fontSize: `${this.size}px`
      }
    }
  }
}
</script>

<style>
  .icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
