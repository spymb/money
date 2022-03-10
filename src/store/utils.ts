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
const getSum =
  (records: RecordItem[], type: '-' | '+', time: string, dateType: 'full-date' | 'year-month' | 'year') => {
    const recordsByType = getRecordsByType(records, type);
    const recordsClone: RecordItem[] = JSON.parse(JSON.stringify((recordsByType)));
    const recordsFormatTime = recordsClone.map(r => {
      if (r === undefined) {return; }
      if (dateType === 'full-date') {
        r['createdAt'] = dayjs(r.createdAt).format('YYYY-MM-DD');
      }
      if (dateType === 'year-month') {
        r['createdAt'] = dayjs(r.createdAt).format('YYYY-MM');
      }
      if (dateType === 'year') {
        r['createdAt'] = dayjs(r.createdAt).format('YYYY');
      }
      return r;
    });

    const holder = {};
    recordsFormatTime.map(r => {
      if (r === undefined) {return; }
      // eslint-disable-next-line no-prototype-builtins
      if (holder.hasOwnProperty(r.createdAt)) {
        // @ts-ignore
        holder[r.createdAt] = holder[r.createdAt] + r.amount;
      } else {
        // @ts-ignore
        holder[r.createdAt] = r.amount;
      }
    });

    // @ts-ignore
    if (dateType === 'full-date') {
      // @ts-ignore
      return holder[dayjs(time).format('YYYY-MM-DD')];
    }
    if (dateType === 'year-month') {
      // @ts-ignore
      return holder[dayjs(time).format('YYYY-MM')];
    }
    if (dateType === 'year') {
      // @ts-ignore
      return holder[dayjs(time).format('YYYY')];
    }

  };

export {getRecordsByTime, getRecordsByType, findTag, getSumForTags, getSum};
