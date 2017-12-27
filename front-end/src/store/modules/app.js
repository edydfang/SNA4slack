import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    menu_items: null
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    UPDATE_MENU: (state, menu_items) => {
      state.menu_items = menu_items
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    UpdateMenu: ({ commit }, teaminfo) => {
      // const original_router = this.$router.options.routes.slice()
      // commit('UPDATE_MENU', menu_items)
    }
  }
}

export default app
