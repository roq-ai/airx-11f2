import * as yup from 'yup';

export const passengerValidationSchema = yup.object().shape({
  flight_id: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
