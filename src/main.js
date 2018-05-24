// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { EventBus } from './EventBus.js'

Vue.config.productionTip = false

Vue.directive('draggable', {
  bind: function (el, binding) {
    el.style.position = 'absolute'
    var initialMouseX, initialMouseY
    var startX, startY
    var canDrag = false
    var block = false

    function mousemove (e) {
      if (binding.modifiers.window === true) {
        if ((e.target.className === 'drag-anchor' && canDrag === false) || canDrag === true) {
          if (block !== true) {
            canDrag = true
          }
        }
      } else {
        if (block !== true && e.target.className !== 'drag-anchor') {
          canDrag = true
        }
      }

      if (canDrag === true) {
        var dx = e.clientX - initialMouseX
        var dy = e.clientY - initialMouseY

        el.style.top = startY + dy + 'px'
        el.style.left = startX + dx + 'px'
        return false
      }
    }

    function mouseup (e) {
      document.removeEventListener('mousemove', mousemove)
      document.removeEventListener('mouseup', mouseup)
      canDrag = false
    }

    el.addEventListener('mousedown', function (e) {
      startX = el.offsetLeft
      startY = el.offsetTop
      initialMouseX = e.clientX
      initialMouseY = e.clientY
      document.addEventListener('mousemove', mousemove)
      document.addEventListener('mouseup', mouseup)
      return false
    })

    EventBus.$on('cursor-hide', function () {
      block = true
    })

    EventBus.$on('cursor-show', function () {
      block = false
    })
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
