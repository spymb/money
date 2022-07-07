import dayjs from 'dayjs';
import {RecordItem} from '@/store/index';
import clone from '@/lib/clone';

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
    const recordsC = clone(records)
    const recordsByType = getRecordsByType(recordsC, type);
    const recordsFormatTime = recordsByType.map(r => {
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
      // @ts-ignore
      // eslint-disable-next-line no-prototype-builtins
      if (holder.hasOwnProperty(r.createdAt)) {
        // @ts-ignore
        holder[r.createdAt] += r.amount;
      } else {
        // @ts-ignore
        holder[r.createdAt] = r.amount;
      }
    });

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

export {getRecordsByTime, getRecordsByType, getSumForTags, getSum};
