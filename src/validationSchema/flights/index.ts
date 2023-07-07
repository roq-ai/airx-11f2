import * as yup from 'yup';

export const flightValidationSchema = yup.object().shape({
  status: yup.string().required(),
  airline_id: yup.string().nullable(),
});
