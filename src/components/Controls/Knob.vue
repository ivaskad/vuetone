<template lang="html">
  <div class="control knob">
    <div class="control-wheel-wrapper">
      <div class="control-wheel" :style="wheelRotation" @mousedown="mousedown = true"></div>
    </div>
    <input type="number" :min="min" :max="max" :step="step" name="" v-model="current">
    <label class="control-property-label">{{label}}</label>
  </div>
</template>

<script>
import { EventBus } from '../../EventBus.js'

export default {
  data: function () {
    return {
      current: 0,
      rotation: -135,
      delta: 135,
      mousedown: false,
      mousemove: false,
      initialClientY: 0,
      lastClientY: 0,
      precision: 5
    }
  },
  props: {
    title: {
      type: String,
      default: 'Empty'
    },
    default: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 1
    },
    centered: {
      type: Boolean,
      defautt: false
    },
    step: {
      type: Number,
      default: 0.01
    }
  },
  computed: {
    label: function () {
      return this.title.toUpperCase()
    },
    centeredDelta: function () {
      return this.centered ? this.delta : 0
    },
    rotationZ: function () {
      let rotation = ((this.current / this.max * (this.delta * 2 - this.centeredDelta)) - (this.delta - this.centeredDelta))
      return rotation
    },
    wheelRotation: function () {
      return {
        color: 'red',
        transform: 'rotateZ(' + this.rotationZ + 'deg)'
      }
    }
  },
  methods: {
    MOUSE_DOWN_EVENT: function (event) {
      this.lastClientY = event.clientY
      this.initialClientY = event.clientY
      if (this.mousedown === true) {
        console.log('KNOB:mousedown', this.label)
      }
    },
    MOUSE_UP: function (event) {
      if (this.mousedown === true) {
        console.log('KNOB:mouseup', this.label)
        EventBus.$emit('cursor-show')
        this.mousedown = false
        this.mousemove = false
        this.setSanitazed(Number.parseFloat(this.current).toFixed(this.precision))
      }
    },
    MOUSE_MOVE: function (event) {
      if (this.mousedown === true) {
        this.mousemove = true
        console.log('KNOB:mousemove', this.label, event.clientY)
        EventBus.$emit('cursor-hide')

        let step = 1
        if (this.step < 1) {
          step = this.max / 32
        }

        if (event.clientY < this.lastClientY) {
          this.setSanitazed(this.current + step)
        } else if (event.clientY > this.lastClientY) {
          this.setSanitazed(this.current - step)
        }

        this.lastClientY = event.clientY
      }
    },
    setSanitazed: function (val) {
      if (val <= this.min) {
        this.current = this.min
      } else if (val >= this.max) {
        this.current = this.max
      } else {
        if (this.step >= 1) {
          this.current = Math.floor(val)
        } else {
          this.current = Number.parseFloat(val)
        }
      }
    }
  },
  watch: {
    mousedown: function () {},
    current: function (val) {
      // console.log('KNOB:current:changed', this.label, this.current)
      // this.setSanitazed(val)
      this.$emit('change', this.current)
    },
    default: function (val) {
      // console.log('KNOB:default:changed', this.label, this.default)
      this.setSanitazed(val)
      this.$emit('change', this.current)
    }
  },
  mounted: function () {
    // console.log('KNOB:mounted', this.label, this.default)
    this.setSanitazed(this.default)

    let self = this
    EventBus.$on('mousedown', function (event) {
      self.MOUSE_DOWN_EVENT(event)
    })
    EventBus.$on('mouseup', function (event) {
      self.MOUSE_UP(event)
    })
    EventBus.$on('mousemove', function (event) {
      self.MOUSE_MOVE(event)
    })
  }
}
</script>

<style lang="css">
  .knob input {
    width: 4em;
    margin: 0 3px;
  }

  .control-wheel-wrapper {
      width: 3em;
      height: 3em;
      background-color: #454545;
      border-radius: 50%;
      margin: 10px auto 3px;
  }

  .control-wheel {
      width: 3em;
      height: 3em;
      border-radius: 50%;
      margin: 0px;
  }
</style>
