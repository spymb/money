import clone from '@/lib/clone';

const localStorageKeyname = 'recordList';

const recordStore = {
  recordList: [] as RecordItem[],
  fetchRecords() {
    this.recordList = JSON.parse(window.localStorage.getItem('localStorageKeyname') || '[]') as RecordItem[];
    return this.recordList;
  },
  saveRecords() {
    window.localStorage.setItem('localStorageKeyname', JSON.stringify(this.recordList));
  },
  createRecord(record: RecordItem) {
    const record2: RecordItem = clone(record);
    record2.createdAt = new Date().toISOString();
    this.recordList.push(record2);
    this.saveRecords();
  },
};

recordStore.fetchRecords();

export default recordStore;