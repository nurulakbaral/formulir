import { getIn } from 'formik'

export const useFieldError = ({ formikErrors, formikTouched, fieldName } = {}) => {
  const fieldError = getIn(formikErrors, fieldName)
  const fieldTouched = getIn(formikTouched, fieldName)
  return {
    isError: fieldTouched && !!fieldError,
  }
}
