<template lang="html">
  <div class="envelope">
    <h3>Envelope</h3>
    <div class="controls">
      <knob :title="'attack'" :default="envelope.attack" :min="0.005" :max="5" @change="parameterChange('attack', $event)"></knob>
      <knob :title="'decay'" :default="envelope.decay" :min="0.01" :max="5" @change="parameterChange('decay', $event)"></knob>
      <knob :title="'sustain'" :default="envelope.sustain" @change="parameterChange('sustain', $event)"></knob>
      <knob :title="'release'" :default="envelope.release" :min="0.01" :max="5" @change="parameterChange('release', $event)"></knob>
    </div>
  </div>
</template>

<script>
import Knob from '../Controls/Knob'

export default {
  components: {
    'knob': Knob
  },
  data: function () {
    return {
      envelope: {
        attack: this.source.attack,
        decay: this.source.decay,
        sustain: this.source.sustain,
        release: this.source.release
      }
    }
  },
  props: {
    source: {
      type: Object
    }
  },
  methods: {
    parameterChange: function (parameter, payload) {
      if (this.source.envelope !== undefined && this.source.envelope[parameter] !== undefined) {
        this.source.envelope[parameter] = parseFloat(payload)
      }
    }
  },
  watch: {
    source: function () {
      // console.log('ENVELOPE:source:change', this.source, this.envelope)
      this.envelope = this.source.envelope
    }
    // envelope: function () {
    //   console.log('ENVELOPE:change', this.envelope)
    // }
  }
}
</script>

<style lang="css">
</style>
