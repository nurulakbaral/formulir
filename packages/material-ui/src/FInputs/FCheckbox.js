import * as React from "react"
import { Field } from "formik"
import invariant from "tiny-warning"
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  FormHelperText,
  Checkbox as MuiCheckbox,
} from "@mui/material"
import { useFFormProps } from "../useFFormProps"
import { useFieldError } from "../useFieldError"
import PropTypes from "prop-types"
import { createOptionsProp } from "../createOptionsProp"
import { inspectMuiInputProps } from "./FAutocomplete"

// Credit: This was taken from formik-material-ui. Big thanks for the inspiration!
const fieldToFCheckbox = ({
  disabled,
  field: { onBlur: fieldOnBlur, ...field },
  form: { isSubmitting },
  type,
  onBlur,
  ...props
}) => {
  const indeterminate = !Array.isArray(field.value) && field.value == null
  if (process.env.NODE_ENV !== "production") {
    invariant(
      type === "checkbox",
      `property type=checkbox is missing from field ${field.name}, this can caused unexpected behaviour`
    )
  }
  return {
    disabled: disabled ?? isSubmitting,
    indeterminate,
    onBlur:
      onBlur ??
      function (e) {
        fieldOnBlur(e ?? field.name)
      },
    ...field,
    ...props,
  }
}
const Checkbox = ({ FormControlLabelProps, ...props }) => {
  return <FormControlLabel control={<MuiCheckbox {...fieldToFCheckbox(props)} />} {...FormControlLabelProps} />
}
export const FCheckbox = ({ ...fcheckboxProps }) => {
  const {
    formikProps: { errors, touched },
  } = useFFormProps()
  const {
    style: _Style,
    className: _ClassName,
    options: _Options,
    name: _Name,
    label: _Label,
    errorMessage: _ErrorMessage,
    muiInputProps,
  } = fcheckboxProps
  const { isError } = useFieldError({
    formikErrors: errors,
    formikTouched: touched,
    fieldName: _Name,
  })
  // Notes: Remove some props from MuiFormControlLabelProps
  const {
    FormControlLabelProps: { label: $label, ...FormControlLabelProps },
  } = { FormControlLabelProps: muiInputProps?.FormControlLabelProps ?? {} }
  const newErrorMessage = _ErrorMessage ?? errors[_Name]
  if (process.env.NODE_ENV !== "production") {
    const constraintProp = ["FormControlLabelProps"]
    const { isPropValid, brokenKeys } = inspectMuiInputProps({
      inputProp: muiInputProps ?? {},
      constraintProp,
    })
    // Notes: Warning for `muiInputProps` prop
    invariant(
      isPropValid,
      `Prop of \`muiInputProps\` doesn't accept properties ${brokenKeys.join(
        ", "
      )}. Prop of \`muiInputProps\` from a FCheckbox component accepts only properties ${constraintProp.join(", ")}.`
    )
    // Notes: Warning for `options` prop
    invariant(!!_Options, `Prop of \`options\` has not been defined, this can caused unexpected behaviour`)
  }
  if (!_Name) {
    throw new Error(`Prop of \`name\` has not been defined.`)
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const newOptionsProp = React.useMemo(() => createOptionsProp(_Options), [])
  return (
    <FormControl style={_Style} className={_ClassName} error={isError}>
      <FormLabel>{_Label}</FormLabel>
      <FormGroup>
        {newOptionsProp?.map(({ label, value }) => (
          <Field
            // Guide: About type, name, and value formik.org/docs/examples/checkboxes
            component={Checkbox}
            type="checkbox"
            key={label}
            // Notes: Default Mui Checkbox Props
            name={_Name}
            value={value ?? label}
            // Notes: Default Mui FormControlLabel Props
            FormControlLabelProps={{
              ...FormControlLabelProps,
              label,
            }}
          />
        )) ?? "Please enter options prop"}
      </FormGroup>
      <FormHelperText>{isError ? newErrorMessage : null}</FormHelperText>
    </FormControl>
  )
}

FCheckbox.propTypes = {
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
   * Basic attribute of input element (<Checkbox/>)
   *
   * @param {String}
   */
  name: PropTypes.string.isRequired,

  /**
   * Options consist of FormControlLabel components
   *
   * @param {Array}
   */
  options: PropTypes.array.isRequired,

  /**
   * ErrorMessage in FormHelperText component
   *
   * @param {String}
   */
  errorMessage: PropTypes.string,

  /**
   * Label is element text of FormLabel
   *
   * @param {String}
   */
  label: PropTypes.string,

  /**
   * For FCheckbox, muiInputProps consists of FormControlLabelProps
   * FormControlLabelProps API: https://mui.com/api/form-control-label/
   *
   * @param {Object}
   */
  muiInputProps: PropTypes.shape({
    FormControlLabelProps: PropTypes.object,
  }),
}
