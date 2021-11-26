import * as React from 'react'
import { Field } from 'formik'
import { TextField as MuiTextField } from '@mui/material'
import { useFFormProps } from '../useFFormProps'
import { useFieldError } from '../useFieldError'
import invariant from 'tiny-warning'
import PropTypes from 'prop-types'
import { inspectMuiInputProps } from './FAutocomplete'

const fieldToFTextField = ({
  disabled,
  field: { onBlur: fieldOnBlur, ...field },
  form: { isSubmitting },
  helperText,
  errorMessage,
  onBlur,
  isError,
  ...props
}) => {
  return {
    error: isError,
    helperText: isError ? errorMessage : null,
    disabled: disabled ?? isSubmitting,
    onBlur:
      onBlur ??
      function (e) {
        fieldOnBlur(e ?? field.name)
      },
    ...field,
    ...props,
  }
}
const TextField = ({ ...props }) => <MuiTextField {...fieldToFTextField(props)} />
export const FTextField = ({ ...ftextfieldProps }) => {
  console.log('Monorepo')
  const {
    style: _Style,
    className: _ClassName,
    type: _Type,
    name: _Name,
    label: _Label,
    errorMessage: _ErrorMessage,
    muiInputProps,
  } = ftextfieldProps
  const {
    formikProps: { errors, touched },
  } = useFFormProps()
  const { isError } = useFieldError({
    formikErrors: errors,
    formikTouched: touched,
    fieldName: _Name,
  })
  const {
    TextFieldProps: {
      style: $style,
      className: $className,
      type: $type,
      name: $name,
      label: $label,
      isError: $isError,
      ...TextFieldProps
    },
  } = { TextFieldProps: muiInputProps?.TextFieldProps ?? {} }
  const newErrorMessage = _ErrorMessage ?? errors[_Name]
  if (process.env.NODE_ENV !== 'production') {
    const constraintProp = ['TextFieldProps']
    const { isPropValid, brokenKeys } = inspectMuiInputProps({
      inputProp: muiInputProps ?? {},
      constraintProp,
    })
    // Notes: Warning for `muiInputProps` prop
    invariant(
      isPropValid,
      `Prop of \`muiInputProps\` doesn't accept properties ${brokenKeys.join(
        ', ',
      )}. Prop of \`muiInputProps\` from a FTextField component accepts only properties ${constraintProp.join(', ')}.`,
    )
    // Notes: Warning for `type` prop
    invariant(
      !!_Type,
      `Prop of \`type\` has not been defined, please define it with the values ​​\`text\`, \`number\`, \`email\`, or \`password\`.`,
    )
  }
  if (!_Name) {
    throw new Error(`Prop of \`name\` has not been defined.`)
  }
  return (
    <Field
      errorMessage={newErrorMessage}
      component={TextField}
      // Notes: Defalt Mui TextField Props
      style={_Style}
      className={_ClassName}
      type={_Type}
      name={_Name}
      label={_Label}
      isError={isError}
      {...TextFieldProps}
    />
  )
}

FTextField.propTypes = {
  /**
   * Style prop
   *
   * @param {React.CSSProperties}
   */
  style: PropTypes.object,

  /**
   * ClassName Prop
   *
   * @param {String}
   */
  className: PropTypes.string,

  /**
   * Name is basic attribute of input element <TextField/>
   *
   * @param {String}
   */
  name: PropTypes.string.isRequired,

  /**
   * Type is basic attribute of input element <TextField/>
   * Values:  'text'  | 'number' | 'email' | 'number' | 'password'
   *
   * @param {String}
   */
  type: PropTypes.string.isRequired,

  /**
   * ErrorMessage in helperText prop of Material UI TextField
   *
   * @param {String}
   */
  errorMessage: PropTypes.string,

  /**
   * Label is basic attribute of input element <TextField/>
   *
   * @param {String}
   */
  label: PropTypes.string,

  /**
   * For FTextField, muiInputProps consists of TextFieldProps
   * TextFieldProps API       : https://mui.com/api/text-field/
   *
   * @param {Object}
   */
  muiInputProps: PropTypes.shape({
    TextFieldProps: PropTypes.object,
  }),
}
