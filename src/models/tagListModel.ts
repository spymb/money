const localStorageKeyname = 'tagList';
type Tag = {
  id: string
  name: string
}
type tagListModel = {
  data: Tag[]
  fetch: () => Tag[]
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
    // 此时data的结构如下
    // [ {id: '1', name: '1'}, {id: '2', name: '2'}, {id: '3', name: '3'} ]
    // @ts-ignore
    const names = this.data.map(item => item.name);
    if (names.indexOf(name) >= 0) {
      return 'duplicated';
    }
    // @ts-ignore
    this.data.push({id: name, name: name});
    this.save();
    return 'success';
    return name;
  },
  save() {
    window.localStorage.setItem('localStorageKeyname', JSON.stringify(this.data));
  }
};

export default tagListModel;