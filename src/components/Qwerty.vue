<template lang="html">
  <div class="component qwerty-trigger" v-draggable.window style="min-width: 200px;">
    <div class="component-header-controll-area">
      <div class="component-header-controll circle" :style="triggeredNote ? 'background-color: lime;' : ''"></div>
      <div class="component-header-controll" v-if="keydown">
        {{key}}
      </div>
    </div>
    <h2 class="drag-anchor">Keyboard Controll</h2>
    <div class="">
      <div class="section">
        <div class="component-block settings">
          <h3>Debug Informations</h3>
          <div class="controls" v-if="keydown">
            <div class="">
              <span style="font-size: 3em" v-if="note !== undefined"><strong>{{note}}</strong></span>
            </div>
            <div class="">
              <span><strong>"{{key}}"</strong> [{{keyCode}}] </span>
            </div>
          </div>
        </div>
        <div class="component-block settings">
          <h3>Settings</h3>
          <knob :title="'Root note'" :step="1" :min="0" :max="7" :default="octave" @change="octave = $event"></knob>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from '../EventBus.js'

import Knob from './Controls/Knob'

export default {
  components: {
    knob: Knob
  },
  data: function () {
    return {
      key: '',
      keyCode: 0,
      keydown: false,
      keyToNote: [],
      triggeredNote: false,
      octave: 3
    }
  },
  props: {
    synth: {
      type: Object
    }
  },
  methods: {
    updateKey: function (event, keyup = false) {
      // console.log('event keydown, keykode:', keyup ? 'Keyup!' : 'Keydown', event, event.keykode)
      this.key = event.key
      this.keyCode = event.keyCode
    }
  },
  mounted: function () {
    let self = this
    EventBus.$on('keydown', function (event) {
      self.updateKey(event)
      self.keydown = true
      if (self.note !== undefined && self.keydown === true) {
        console.log('trigering note', self.note)
        self.synth.triggerAttack(self.note)

        EventBus.$emit('QW_triggerAttack', self.note)
      }
    })
    EventBus.$on('keyup', function (event) {
      self.updateKey(event, true)
      self.keydown = false
      if (self.triggeredNote !== false) {
        self.synth.triggerRelease()

        EventBus.$emit('QW_triggerRelease', self.note)
      }
    })

    let keyToNote = {
      65: 'C',
      87: 'C#',
      83: 'D',
      69: 'D#',
      68: 'E',
      70: 'F',
      84: 'F#',
      71: 'G',
      89: 'G#',
      72: 'A',
      85: 'A#',
      74: 'B'
    }
    this.keyToNote = keyToNote
  },
  computed: {
    note: function () {
      if (this.keyToNote[this.keyCode] !== undefined) {
        return this.keyToNote[this.keyCode] + this.octave.toString()
      }
    }
  },
  watch: {
    keydown: function () {
      if (this.note !== undefined && this.keydown === true) {
        this.triggeredNote = true
      } else {
        this.triggeredNote = false
      }
    }
  }
}
</script>

<style lang="css">

</style>
