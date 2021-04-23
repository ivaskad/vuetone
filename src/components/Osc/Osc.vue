<template lang="html">
  <div class="component-block osc">
    <h3>Osc</h3>
    <div class="debug">
      <strong>DEBUG:</strong><br>
      <div class="" v-if="osc.envelope !== undefined">
        Atttack: {{osc.envelope.attack}}<br>
        Decay: {{osc.envelope.decay}}<br>
        Sustain: {{osc.envelope.sustain}}<br>
        Release: {{osc.envelope.release}}<br>
      </div>
    </div>
    <div class="controls">
      <!-- <knob :title="'root'" :defaultValue="baseOctave" :min="1" :max="7" :step="1" @change="parameterChange('baseOctave', $event)"></knob>
      <knob :title="'octaves'" :defaultValue="octaves" :min="0" :max="6" :step="1" @change="parameterChange('octaves', $event)"></knob> -->
    </div>
  </div>
</template>

<script>
import Knob from '../Controls/Knob'
import Tone from 'tone'

export default {
  components: {
    'knob': Knob
  },
  mounted: function () {
    var distortion = new Tone.Distortion(0.5).toMaster()
    var options = {
      envelope: {
        attack: this.attack,
        decay: this.decay,
        sustain: this.sustain,
        release: this.release
      }
    }

    var osc = new Tone.Synth(options)
    // var osc = new Tone.PolySynth(32, osc, options)

    this.osc = osc
    this.osc.connect(distortion)

    this.$emit('mount', this.osc)
  },
  data: function () {
    return {
      osc: {
        envelope: {
          attack: 0.1,
          decay: 0.3,
          sustain: 0,
          release: 0.15
        }
      }
    }
  },
  params: {
    envelope: {
      type: Object,
      default: function () {
        return {
          attack: 0.1,
          decay: 0.3,
          sustain: 0,
          release: 0.15
        }
      }
    }
  },
  methods: {
    parameterChange: function (parameter, payload) {
      if (this[parameter] !== undefined) {
        this[parameter] = parseFloat(payload)
      }
    },
    envelopeChange: function (payload) {
      console.log('envelopeChange', payload)
      // if (this.osc !== undefined && this.osc.envelope !== undefined) {
      //   this.osc.envelope.attack = payload.attack
      //   this.osc.envelope.sustain = payload.sustain
      //   this.osc.envelope.decay = payload.decay
      //   this.osc.envelope.release = payload.release
      // }
    }
  },
  watch: {
    osc: function () {
      this.$emit('change', this.osc)
    }
  }
}
</script>

<style lang="css">
</style>
