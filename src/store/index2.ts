import recordStore from '@/store/recordStore';
import tagStore from '@/store/tagStore';

const store = {
  // 浅拷贝，复制地址
  ...recordStore,
  ...tagStore
};

export default store;