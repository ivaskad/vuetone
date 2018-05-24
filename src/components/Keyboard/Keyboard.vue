<template lang="html">
  <div class="component-block">
    <h3>Piano rolll</h3>
    <div class="keynotes wrapper" :style="wrapperWidth">
      <div class="scroll-area" :style="keyboardWidth">
        <div class="octave" v-for="n in octavesShow" :key="n">
          <key :osc="osc" :note="'C'+(rootOctave + n - 1)"
            @triggerAttack="$emit('triggerAttack', 'C'+(rootOctave + n - 1))"
            @triggerRelease="$emit('triggerRelease', 'C'+(rootOctave + n - 1))"
            ></key>
          <key :osc="osc" :note="'C#'+(rootOctave + n - 1)"
            @triggerAttack="$emit('triggerAttack', 'C#'+(rootOctave + n - 1))"
            @triggerRelease="$emit('triggerRelease', 'C#'+(rootOctave + n - 1))"
            ></key>
          <key :osc="osc" :note="'D'+(rootOctave + n - 1)"
            @triggerAttack="$emit('triggerAttack', 'D'+(rootOctave + n - 1))"
            @triggerRelease="$emit('triggerRelease', 'D'+(rootOctave + n - 1))"
            ></key>
          <key :osc="osc" :note="'D#'+(rootOctave + n - 1)"
            @triggerAttack="$emit('triggerAttack', 'D#'+(rootOctave + n - 1))"
            @triggerRelease="$emit('triggerRelease', 'D#'+(rootOctave + n - 1))"
            ></key>
          <key :osc="osc" :note="'E'+(rootOctave + n - 1)"
            @triggerAttack="$emit('triggerAttack', 'E'+(rootOctave + n - 1))"
            @triggerRelease="$emit('triggerRelease', 'E'+(rootOctave + n - 1))"
            ></key>
          <key :osc="osc" :note="'F'+(rootOctave + n - 1)"
            @triggerAttack="$emit('triggerAttack', 'F'+(rootOctave + n - 1))"
            @triggerRelease="$emit('triggerRelease', 'F'+(rootOctave + n - 1))"
            ></key>
          <key :osc="osc" :note="'F#'+(rootOctave + n - 1)"
            @triggerAttack="$emit('triggerAttack', 'F#'+(rootOctave + n - 1))"
            @triggerRelease="$emit('triggerRelease', 'F#'+(rootOctave + n - 1))"
            ></key>
          <key :osc="osc" :note="'G'+(rootOctave + n - 1)"
            @triggerAttack="$emit('triggerAttack', 'G'+(rootOctave + n - 1))"
            @triggerRelease="$emit('triggerRelease', 'G'+(rootOctave + n - 1))"
            ></key>
          <key :osc="osc" :note="'G#'+(rootOctave + n - 1)"
            @triggerAttack="$emit('triggerAttack', 'G#'+(rootOctave + n - 1))"
            @triggerRelease="$emit('triggerRelease', 'G#'+(rootOctave + n - 1))"
            ></key>
          <key :osc="osc" :note="'A'+(rootOctave + n - 1)"
            @triggerAttack="$emit('triggerAttack', 'A'+(rootOctave + n - 1))"
            @triggerRelease="$emit('triggerRelease', 'A'+(rootOctave + n - 1))"
            ></key>
          <key :osc="osc" :note="'A#'+(rootOctave + n - 1)"
            @triggerAttack="$emit('triggerAttack', 'A#'+(rootOctave + n - 1))"
            @triggerRelease="$emit('triggerRelease', 'A#'+(rootOctave + n - 1))"
            ></key>
          <key :osc="osc" :note="'B'+(rootOctave + n - 1)"
            @triggerAttack="$emit('triggerAttack', 'B'+(rootOctave + n - 1))"
            @triggerRelease="$emit('triggerRelease', 'B'+(rootOctave + n - 1))"
            ></key>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Key from './Key'

export default {
  components: {
    'key': Key
  },
  data: function () {
    return {
    }
  },
  props: {
    osc: {
      type: Object
    },
    rootOctave: {
      type: Number,
      default: 3
    },
    octavesShow: {
      type: Number,
      default: 2
    }
  },
  computed: {
    keyboardWidth: function () {
      return {
        width: 'calc(326px * ' + this.octavesShow + ')'
      }
    },
    wrapperWidth: function () {
      return {
        width: 'calc(326px * ' + 1.5 + ')'
      }
    }
  }
}
</script>

<style lang="css">
  .keyboard {
    min-width: calc( (8 * 41px) );
  }
  .keynotes.wrapper {
    max-width: 460px;
    overflow-x: scroll;
    background-color: #3a446b;
    padding: 0px 5px;
    border-radius: 5px;
    border: 1px solid #ffffff77;
  }
  .keynotes .scroll-area {
    margin-bottom: 5px;
    overflow: hidden;
    position: relative;
  }
  .keynotes .scroll-area .octave {
    display: inline-block;
    padding-right: 5px;
  }

</style>
