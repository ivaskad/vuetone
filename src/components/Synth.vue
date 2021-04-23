<template>
  <div class="component keyboard" v-draggable.window>
    <div class="component-header-controll-area">
      <div class="component-header-controll circle" :style="triggerStyle"></div>
      <div class="component-header-controll" v-if="trigger === true">
        {{note}}
      </div>
    </div>
    <h2 class="drag-anchor">Synth</h2>
    <div class="">
      <div class="section">
        <osc @mount="oscMount($event)" @change="oscChange($event)"></osc>
      </div>
      <div class="section">
        <envelope class="component-block" :source="osc" @change="envelopeChange($event)"></envelope>
        <div class="component-block settings">
          <h3>Settings</h3>
          <div class="controls">
            <knob :title="'root'" :default="rootOctave" :min="0" :max="7" :step="1" @change="parameterChange('rootOctave', $event)"></knob>
            <knob :title="'show'" :default="octavesShow" :min="0" :max="6" :step="1" @change="parameterChange('octavesShow', $event)"></knob>
          </div>
        </div>
      </div>
      <div class="section piano">
        <keyboard :osc="osc" :rootOctave="rootOctave" :octavesShow="octavesShow" :note="note"
          @triggerAttack="triggerAttack($event)"
          @triggerRelease="triggerRelease($event)"
        ></keyboard>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from '../EventBus.js'

import Keyboard from './Keyboard/Keyboard'
import Envelope from './Envelope/Envelope'
import Osc from './Osc/Osc'
import Knob from './Controls/Knob'
// import Tone from 'tone'

export default {
  components: {
    'keyboard': Keyboard,
    'osc': Osc,
    'knob': Knob,
    'envelope': Envelope
  },
  data () {
    return {
      osc: {},
      note: '',
      octavesShow: 2,
      rootOctave: 3,
      trigger: false
    }
  },
  props: {
  },
  mounted: function () {
    let self = this
    EventBus.$on('QW_triggerAttack', function (event) {
      console.log('Synth note', event)
      self.note = event
    })
    EventBus.$on('QW_triggerRelease', function (event) {
      console.log('Synth end note', event)
      self.note = ''
    })
  },
  methods: {
    parameterChange: function (parameter, payload) {
      // console.log('Synth: Setting param:', parameter, payload)
      if (this[parameter] !== undefined) {
        this[parameter] = parseFloat(payload)
      }
    },
    oscMount: function (payload) {
      this.osc = payload
      this.$emit('mounted', this.osc)
      // console.log('oscMount', this.osc)
    },
    oscChange: function (payload) {
      this.osc = payload
      this.$emit('update', this.osc)
    },
    triggerAttack: function (payload) {
      this.trigger = true
      this.note = payload
      this.osc.triggerAttack(this.note)
    },
    triggerRelease: function (payload) {
      this.trigger = false
      this.note = ''
      this.osc.triggerRelease()
    }
  },
  computed: {
    triggerStyle: function () {
      if (this.trigger === true) {
        return {
          'background-color': 'lime'
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
