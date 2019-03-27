import ApiError from '../classes/ApiError';

import { ValidationError } from 'joi';

export default (err: ValidationError): void => {
  if (err) {
    const message =
      err.details && err.details[0] && err.details[0].message
        ? err.details[0].message
        : err.message;
    throw new ApiError(500, message);
  }
};
