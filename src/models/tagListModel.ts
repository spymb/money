const localStorageKeyname = 'tagList';
type tagListModel = {
  data: string[]
  fetch: () => string[]
  create: (name: string) => 'success' | 'duplicated' // 联合类型
  save: () => void
}
const tagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem('localStorageKeyname') || '[]');
    return this.data;
  },
  create(name: string) {
    // @ts-ignore
    if (this.data.indexOf(name) >= 0) {
      return 'duplicated'
    }
    // @ts-ignore
    this.data.push(name);
    this.save();
    return name;
  },
  save() {
    window.localStorage.setItem('localStorageKeyname', JSON.stringify(this.data));
  }
};

export default tagListModel;