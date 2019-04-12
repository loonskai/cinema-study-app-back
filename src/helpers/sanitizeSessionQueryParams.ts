import moment from 'moment';
import { Op } from 'sequelize';
import { QueryParams } from '../controllers/session';
import cinemaService from '../services/cinema';

export default async (params: any): Promise<QueryParams> => {
  let paramsWithDateParsed = params;
  if (params.date) {
    const startPeriod = moment(params.date)
      .startOf('day')
      .format('YYYY-MM-DD HH:mm');
    const endPeriod = moment(params.date)
      .endOf('day')
      .format('YYYY-MM-DD HH:mm');
    paramsWithDateParsed = {
      ...params,
      date: {
        [Op.between]: [new Date(startPeriod), new Date(endPeriod)]
      }
    };
  }
  if (!params.hall && (params.city || params.cinema)) {
    let halls = [] as number[];
    if (!params.cinema) {
      const cinemas = await cinemaService.getAll({ city: params.city });
      halls = cinemas
        .reduce((acc, cinema) => acc.concat(cinema.halls), [])
        .map(hall => hall.id);
    } else {
      const cinema = await cinemaService.getByID(params.cinema);
      halls = cinema && cinema.halls.map(hall => hall.id);
    }
    paramsWithDateParsed['hall-id'] = { [Op.in]: halls };
    delete paramsWithDateParsed.city;
    delete paramsWithDateParsed.cinema;
  }
  console.log(paramsWithDateParsed);
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
