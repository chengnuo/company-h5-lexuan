export default {
  bind(el, binding, vNode) {
    el.__vueClickOutside__ = event => {
      if (!el.contains(event.target)) {
        vNode.context[binding.expression](event)
        event.stopPropagation()
      }
    }
    document.body.addEventListener('touchstart', el.__vueClickOutside__)
  },

  unbind(el, binding, vNode) {
    document.removeEventListener('touchstart', el.__vueClickOutside__)
    el.__vueClickOutside__ = null
  }
}
