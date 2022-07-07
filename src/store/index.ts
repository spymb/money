import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createID from '@/lib/createID';

Vue.use(Vuex);

export type Tag = {
  id: string;
  name: string;
  icon: string;
  type: '+' | '-';
}
export type RecordItem = {
  type: '+' | '-';
  tagID: string;
  icon: string,
  name: string,
  notes: string;
  amount: number;
  createdAt?: string;
}
export type RootState = {
  recordList: RecordItem[],
  tagList: Tag[],
}

const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    tagList: [] as Tag[],
  } as RootState,

  mutations: {
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
      window.alert('成功添加记录');
    },
    createRecord(state, record: RecordItem) {
      const record2: RecordItem = clone(record);
      record2.createdAt = new Date().toISOString();
      state.recordList.push(record2);
      store.commit('saveRecords');
    },

    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
      if (!state.tagList || state.tagList.length === 0) {
        store.commit('createTag', {name: '服饰', icon: 'fushi', type: '-', flag: 'first'});
        store.commit('createTag', {name: '餐饮', icon: 'canyin', type: '-', flag: 'first'});
        store.commit('createTag', {name: '日用', icon: 'riyongpin', type: '-', flag: 'first'});
        store.commit('createTag', {name: '交通', icon: 'jiaotong', type: '-', flag: 'first'});
        store.commit('createTag', {name: '书籍', icon: 'dushu', type: '-', flag: 'first'});
        store.commit('createTag', {name: '旅行', icon: 'lvxing', type: '-', flag: 'first'});
        store.commit('createTag', {name: '工资', icon: 'gongzi', type: '+', flag: 'first'});
        store.commit('createTag', {name: '兼职', icon: 'jianzhi', type: '+', flag: 'first'});
        store.commit('createTag', {name: '理财', icon: 'licai', type: '+', flag: 'first'});
      }
    },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },
    createTag(state, {name, icon, type, flag}: { name: string, icon: string, type: '-' | '+' , flag?: string}) {
      const id = createID().toString();
      const names = state.tagList.map(item => item.name);
      if (icon === 'tag') {
        window.alert('请选择图标');
      } else {
        if (name === '') {
          window.alert('标签名不能为空');
        } else if (names.indexOf(name) >= 0) {
          window.alert('标签名不能重复');
        } else {
          state.tagList.push({id, name, icon, type,});
          store.commit('saveTags');
          if(flag) {return}
          window.alert('成功添加标签');
        }
      }
    },
    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        state.tagList.splice(index, 1);
        store.commit('saveTags');
        window.alert('成功删除标签');
      } else {
        alert('请选择标签');
      }
    },
    updateTag(state, payload: { id: string, name: string }) {
      const {id, name} = payload;
      const idList = state.tagList.map(item => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map(item => item.name);
        if (name === '') {
          window.alert('标签名不能为空');
        } else if (names.indexOf(name) >= 0) {
          window.alert('标签名重复');
        } else {
          const tag = state.tagList.filter(item => item.id === id)[0];
          tag.name = name;
          store.commit('saveTags');
          window.alert('成功修改标签名');
        }
      }
    },
  },
});

export default store;
