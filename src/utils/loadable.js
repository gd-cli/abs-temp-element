import Loading from '_c/Loading.vue';

const loadable = (asyncFn) => {
  const component = () => ({
    component: asyncFn(),
    loading: Loading,
  });
  return {
    render: h => h(component),
  };
};
export default loadable;
