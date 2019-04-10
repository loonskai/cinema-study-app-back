import moment from 'moment';
import { Op } from 'sequelize';
import { QueryParams } from '../controllers/session';

export default (params: any): QueryParams => {
  let paramsWithDateParsed = params;
  if (params.date) {
    const startPeriod = moment(params.date)
      .startOf('day')
      .format('YYYY-DD-MM HH:mm');
    const endPeriod = moment(params.date)
      .endOf('day')
      .format('YYYY-DD-MM HH:mm');
    paramsWithDateParsed = {
      ...params,
      date: {
        [Op.between]: [new Date(startPeriod), new Date(endPeriod)]
      }
    };
  }
  return Object.keys(paramsWithDateParsed)
    .filter(key => !!paramsWithDateParsed[key])
    .reduce(
      (acc, key) => {
        acc[key] = /^[0-9]*$/g.test(paramsWithDateParsed[key])
          ? +paramsWithDateParsed[key]
          : paramsWithDateParsed[key];
        return acc;
      },
      {} as { [key: string]: string | number }
    );
};
