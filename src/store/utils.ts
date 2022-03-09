import dayjs from 'dayjs';
import {RecordItem} from '@/store/index';

const getRecordsByTime = (records: RecordItem[], time: Date, unit: dayjs.UnitType) => {
  return records.filter(record => {
    return dayjs(time).isSame(record.createdAt, unit)
  })
}

export {getRecordsByTime}
