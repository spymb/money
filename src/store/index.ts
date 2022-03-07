import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createID from '@/lib/createID';
import router from '@/router';

Vue.use(Vuex);


export type Tag = {
  id: string;
  name: string;
  icon: string;
  type: '+' | '-';
}
export type RecordItem = {
  tagID: string;
  notes: string;
  type: string;
  amount: number;
  createdAt?: string;
}
type RootState = {
  recordList: RecordItem[],
  tagList: Tag[],
  currentTag?: Tag
}

const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    tagList: [] as Tag[],
    currentTag: undefined,
  } as RootState,

  mutations: {
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
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
        store.commit('createTag', {name: '餐饮', icon: 'canyin', type: '-'});
        store.commit('createTag', {name: '服饰', icon: 'fushi', type: '-'});
        store.commit('createTag', {name: '读书', icon: 'dushu', type: '-'});
        store.commit('createTag', {name: '交通', icon: 'jiaotong', type: '-'});
        store.commit('createTag', {name: '旅行', icon: 'lvxing', type: '-'});
        store.commit('createTag', {name: '日用', icon: 'riyongpin', type: '-'});
        store.commit('createTag', {name: '工资', icon: 'gongzi', type: '+'});
        store.commit('createTag', {name: '兼职', icon: 'jianzhi', type: '+'});
        store.commit('createTag', {name: '理财', icon: 'licai', type: '+'});
      }
    },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },

    createTag(state, {name, icon, type}: {
      name: string, icon: string, type: '-' | '+'
    }) {
      const id = createID().toString();
      state.tagList.push({id, name, icon, type,});
      store.commit('saveTags');
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
        router.back();
      } else {
        alert('删除失败');
      }
    },
    updateTag(state, payload: { id: string, name: string }) {
      const {id, name} = payload;
      const idList = state.tagList.map(item => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map(item => item.name);
        if (names.indexOf(name) >= 0) {
          window.alert('标签名重复');
        } else {
          const tag = state.tagList.filter(item => item.id === id)[0];
          tag.name = name;
          store.commit('saveTags');
        }
      }
    },
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter(t => t.id === id)[0];
    }
  },
});

export default store;
