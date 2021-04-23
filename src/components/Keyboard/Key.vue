<template>
  <div class="key" :class="{half: half, down: active}">
    <a href="#"
      @mousedown="triggerAttack(note)"
      @mouseup="triggerRelease()"
    >{{note}}</a>
  </div>
</template>

<script>
// import Tone from 'tone'

export default {
  props: {
    osc: {
      type: Object
    },
    note: {
      type: String,
      default: 'C4'
    },
    duration: {
      type: String,
      default: '1'
    },
    attack: {
      type: String,
      default: '1'
    },
    decay: {
      type: String,
      default: '1'
    },
    sustain: {
      type: String,
      default: '0.2'
    },
    release: {
      type: String,
      default: '5'
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    triggerAttack: function () {
      this.$emit('triggerAttack')
    },
    triggerRelease: function () {
      this.$emit('triggerRelease')
    }
  },
  computed: {
    half: function () {
      return this.note.indexOf('#') !== -1
    }
  }
}
</script>

<style scoped>
  .key{
    display: inline-block;
    padding: 0 0 5px;
  }
  .key a {
    text-align: center;
    text-decoration: none;
    background-color: #fff;
    border: 1px solid #666;
    min-width: 40px;
    height: 120px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    /* display: block; */
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-bottom: 5px;
    box-shadow: 0 0 3px gray
  }
  .key a:hover {
    background-color: #eee;
    -webkit-user-drag: none;
  }
  .key.half {
    margin-left: -23px;
    position: absolute;
  }
  .key.half a {
    background-color: #000;
    color: #fff;
    height: 80px;
  }
  .key a:active{
    color: lime;
  }
  .key.down a {
    background: linear-gradient(180deg, white, green);
  }
  .key.half.down a {
    background: linear-gradient(180deg, black, green);
  }
</style>
