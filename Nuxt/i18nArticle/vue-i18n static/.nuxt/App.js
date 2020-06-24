import Vue from 'vue'
import NuxtLoading from './components/nuxt-loading.vue'

import '../assets/css/style.css'

import _6f6c098b from './layouts/default.vue'

const layouts = { "_default": _6f6c098b }

export default {
  head: {"title":"Sample Webpage - Taylor Calderone","link":[{"rel":"apple-touch-icon","sizes":"180x180","href":"https:\u002F\u002Fwww.taylorcalderone.com\u002FImages\u002FFavicons\u002Fapple-touch-icon.png"},{"rel":"icon","sizes":"32x32","href":"https:\u002F\u002Fwww.taylorcalderone.com\u002FImages\u002FFavicons\u002Ffavicon-32x32.png"},{"rel":"icon","sizes":"16x16","href":"https:\u002F\u002Fwww.taylorcalderone.com\u002FImages\u002FFavicons\u002Ffavicon-16x16.png"},{"rel":"manifest","href":"https:\u002F\u002Fwww.taylorcalderone.com\u002FImages\u002FFavicons\u002Fsite.webmanifest"},{"rel":"mask-icon","href":"https:\u002F\u002Fwww.taylorcalderone.com\u002FImages\u002FFavicons\u002Fsafari-pinned-tab.svg","color":"#5BBAD5"},{"rel":"shortcut icon","href":"https:\u002F\u002Fwww.taylorcalderone.com\u002FImages\u002FFavicons\u002Ffavicon.ico"}],"meta":[{"name":"msapplication-TileColor","content":"#2B5797"},{"name":"msapplication-config","content":"https:\u002F\u002Fwww.taylorcalderone.com\u002FImages\u002FFavicons\u002Fbrowserconfig.xml"},{"name":"theme-color","content":"#FFFFFF"},{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1, maximum-scale=1"}],"style":[],"script":[]},

  render(h, props) {
    const loadingEl = h('NuxtLoading', { ref: 'loading' })
    const layoutEl = h(this.layout || 'nuxt')
    const templateEl = h('div', {
      domProps: {
        id: '__layout'
      },
      key: this.layoutName
    }, [ layoutEl ])

    const transitionEl = h('transition', {
      props: {
        name: 'layout',
        mode: 'out-in'
      },
      on: {
        beforeEnter(el) {
          // Ensure to trigger scroll event after calling scrollBehavior
          window.$nuxt.$nextTick(() => {
            window.$nuxt.$emit('triggerScroll')
          })
        }
      }
    }, [ templateEl ])

    return h('div', {
      domProps: {
        id: '__nuxt'
      }
    }, [loadingEl, transitionEl])
  },
  data: () => ({
    isOnline: true,
    layout: null,
    layoutName: ''
  }),
  beforeCreate() {
    Vue.util.defineReactive(this, 'nuxt', this.$options.nuxt)
  },
  created() {
    // Add this.$nuxt in child instances
    Vue.prototype.$nuxt = this
    // add to window so we can listen when ready
    if (process.client) {
      window.$nuxt = this
      this.refreshOnlineStatus()
      // Setup the listeners
      window.addEventListener('online', this.refreshOnlineStatus)
      window.addEventListener('offline', this.refreshOnlineStatus)
    }
    // Add $nuxt.error()
    this.error = this.nuxt.error
  },

  mounted() {
    this.$loading = this.$refs.loading
  },
  watch: {
    'nuxt.err': 'errorChanged'
  },

  computed: {
    isOffline() {
      return !this.isOnline
    }
  },
  methods: {
    refreshOnlineStatus() {
      if (process.client) {
        if (typeof window.navigator.onLine === 'undefined') {
          // If the browser doesn't support connection status reports
          // assume that we are online because most apps' only react
          // when they now that the connection has been interrupted
          this.isOnline = true
        } else {
          this.isOnline = window.navigator.onLine
        }
      }
    },

    errorChanged() {
      if (this.nuxt.err && this.$loading) {
        if (this.$loading.fail) this.$loading.fail()
        if (this.$loading.finish) this.$loading.finish()
      }
    },

    setLayout(layout) {
      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      this.layoutName = layout
      this.layout = layouts['_' + layout]
      return this.layout
    },
    loadLayout(layout) {
      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      return Promise.resolve(layouts['_' + layout])
    }
  },
  components: {
    NuxtLoading
  }
}
