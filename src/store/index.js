import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        columns: []
    },
    mutations: {
        add(state, column) {
            state.columns.push(column);
        },
        clear(state) {
            state.columns = [];
        }
    },
    actions: {
        addColumns(option, column) {
            option.commit('add', column);
        },
        clearColumns(option){
            option.commit('clear');
        }
    },
    modules: {}
})
