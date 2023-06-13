<template>
  <div ref="selectoElement"></div>
</template>

<script>
import VanillaSelecto, { OPTIONS, EVENTS, PROPERTIES, METHODS } from 'selecto'
import { isUndefined } from '@daybrush/utils'
import { defineComponent } from 'vue'

const methods = {}

METHODS.forEach((name) => {
  methods[name] = function (...args) {
    return this.$_selecto[name](...args)
  }
})

const watch = {}

PROPERTIES.forEach((name) => {
  watch[name] = function (value) {
    return (this.$_selecto[name] = value)
  }
})

const VueSelecto = defineComponent({
  name: 'selecto',
  methods,
  props: OPTIONS,
  watch,
  mounted() {
    const props = this.$props
    const options = {}

    OPTIONS.forEach((name) => {
      const value = props[name]
      if (!isUndefined(value)) {
        options[name] = value
      }
    })

    const selecto = new VanillaSelecto({
      ...options,
      portalContainer: this.$refs.selectoElement
    })

    this.$_selecto = selecto

    EVENTS.forEach((name) => {
      selecto.on(name, (e) => {
        this.$emit(name, { ...e })
      })
    })
  },
  beforeUnmount() {
    this.$_selecto.destroy()
  }
})

export default VueSelecto
</script>
