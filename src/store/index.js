import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const RegCode = /^.\/([a-z]+?).js$/;
const getModules = (m) => {
  const modules = {};
  m.keys().forEach((key) => {
    modules[RegCode.exec(key)[1]] = m(key).default;
  });
  return modules;
};
export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: getModules(require.context('./modules', false, /\.js$/)),
});
