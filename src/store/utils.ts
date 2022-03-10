import dayjs from 'dayjs';
import {RecordItem, Tag} from '@/store/index';

const getRecordsByTime = (records: RecordItem[], time: Date, unit: dayjs.UnitType) => {
  return records.filter(record => {
    return dayjs(time).isSame(record.createdAt, unit);
  });
};
const getRecordsByType = (records: RecordItem[], type: '-' | '+') => {
  return records.filter(r => {
    return r.type === type;
  });
};
const findTag = (tags: Tag[], id: string) => tags.filter(tag => tag.id === id)[0];
const getSumForTags = (records: RecordItem[]) => {
  const initial: { [tagID: string]: number } = {};
  return records.reduce((pre, record) => {
    if (pre[record.tagID] !== undefined) {
      pre[record.tagID] += record.amount;
    } else {
      pre[record.tagID] = record.amount;
    }
    return pre;
  }, initial);
};

export {getRecordsByTime, getRecordsByType, findTag, getSumForTags};
