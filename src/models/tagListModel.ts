import createID from '@/lib/createID';

const localStorageKeyname = 'tagList';

type Tag = {
  id: string
  name: string
}
type tagListModel = {
  data: Tag[]
  fetch: () => Tag[]
  create: (name: string) => 'success' | 'duplicated' // 联合类型
  update: (id: string, name: string) => 'success' | 'duplicated' | 'not found'
  remove: (id: string) => boolean
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
    const id = createID().toString();
    // @ts-ignore
    this.data.push({id, name: name});
    this.save();
    return 'success';
    return name;
  },
  update(id: string, name: string) {
    // @ts-ignore
    const idList = this.data.map(item => item.id);
    if (idList.indexOf(id) >= 0) {
      // @ts-ignore
      const names = this.data.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        return 'duplicted';
      } else {
        // @ts-ignore
        const tag = this.data.filter(item => item.id === id)[0];
        // @ts-ignore
        tag.name = name;
        this.save();
        return 'success';
      }
    } else {
      return 'not found';
    }
  },
  remove(id: string) {
    let index = -1;
    for (let i = 0; i < this.data.length; i++) {
      // @ts-ignore
      if (this.data[i].id === id) {
        index = i;
        break;
      }
    }
    this.data.splice(index, 1);
    this.save();
    return true;
  },
  save() {
    window.localStorage.setItem('localStorageKeyname', JSON.stringify(this.data));
  }
};

export default tagListModel;