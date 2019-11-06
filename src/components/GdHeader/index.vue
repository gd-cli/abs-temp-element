<template>
  <div class="gd-header">
    <div class="menu">
      <router-link to="/">首页</router-link>
      <router-link to="/about">关于</router-link>
    </div>
    <el-select v-model="$i18n.locale" placeholder="请选择" @change="changeLang">
    <el-option
     v-for="lang in langs" :value="lang.value" :key="lang.value">{{ lang.label }}
    </el-option>
  </el-select>
  </div>
</template>
<script>
import storage from '@/utils/storage';

export default {
  data() {
    return {
      langs: [{ value: 'zh', label: '中文' }, { value: 'en', label: 'English' }],
    };
  },
  methods: {
    changeLang(e) {
      storage.set('lang', e);
    },
  },
};
</script>
<style  scoped>
.gd-header{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
}
</style>
