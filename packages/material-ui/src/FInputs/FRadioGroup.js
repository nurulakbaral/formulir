import * as React from 'react'
import {
    RadioGroup as MuiRadioGroup,
    FormControl,
    FormLabel,
    FormControlLabel,
    FormHelperText,
    Radio,
} from '@mui/material'
import { Field } from 'formik'
import { useFFormProps } from '../useFFormProps'
import { useFieldError } from '../useFieldError'
import invariant from 'tiny-warning'
import PropTypes from 'prop-types'
import { createOptionsProp } from '../createOptionsProp'
import { inspectMuiInputProps } from './FAutocomplete'

// Credit: This was taken from formik-material-ui. Big thanks for the inspiration!
const fieldToFRadioGroup = ({
    field: { onBlur: fieldOnBlur, ...field },
    form,
    onBlur,
    ...props
}) => {
    return {
        onBlur:
            onBlur ??
            function (e) {
                fieldOnBlur(e ?? field.name)
            },
        ...field,
        ...props,
    }
}
const RadioGroup = ({ children, ...props }) => {
    return (
        <MuiRadioGroup {...fieldToFRadioGroup(props)}>{children}</MuiRadioGroup>
    )
}
export const FRadioGroup = ({ ...fradiogroupProps }) => {
    const { formikProps } = useFFormProps()
    const {
        style: _Style,
        className: _ClassName,
        options: _Options,
        name: _Name,
        label: _Label,
        errorMessage: _ErrorMesage,
        muiInputProps,
    } = fradiogroupProps
    const { isError } = useFieldError({
        formikErrors: formikProps.errors,
        formikTouched: formikProps.touched,
        fieldName: _Name,
    })
    const newErrorMessage = _ErrorMesage ?? formikProps.errors[_Name]
    // Notes: Remove some props from MuiFormControlLabelProps
    const {
        FormControlLabelProps: {
            value: $value,
            label: $label,
            control: $control,
            disabled: $disabled,
            ...FormControlLabelProps
        },
    } = { FormControlLabelProps: muiInputProps?.FormControlLabelProps ?? {} }
    if (process.env.NODE_ENV !== 'production') {
        const constraintProp = ['FormControlLabelProps']
        const { isPropValid, brokenKeys } = inspectMuiInputProps({
            inputProp: muiInputProps ?? {},
            constraintProp,
        })
        // Notes: Warning for `muiInputProps` prop
        invariant(
            isPropValid,
            `Prop of \`muiInputProps\` doesn't accept properties ${brokenKeys.join(
                ', '
            )}. Prop of \`muiInputProps\` from a FRadioGroup component accepts only properties ${constraintProp.join(
                ', '
            )}.`
        )
        // Notes: Warning for `options` prop
        invariant(
            !!_Options,
            `Prop of \`options\` has not been defined, this can caused unexpected behaviour`
        )
    }
    if (!_Name) {
        throw new Error(`Prop of \`name\` has not been defined.`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const newOptionsProp = React.useMemo(() => createOptionsProp(_Options), [])
    return (
        <FormControl style={_Style} className={_ClassName} error={isError}>
            <FormLabel>{_Label}</FormLabel>
            <Field component={RadioGroup} type='radio' name={_Name}>
                {newOptionsProp?.map(({ label, value }) => (
                    <FormControlLabel
                        key={`${label}-${value}`}
                        // Notes: Default Mui FormControlLabel Props
                        value={value ?? label}
                        label={label}
                        control={<Radio />}
                        disabled={formikProps.isSubmitting}
                        {...FormControlLabelProps}
                    />
                )) ?? 'Please enter options prop'}
            </Field>
            <FormHelperText>{isError ? newErrorMessage : null}</FormHelperText>
        </FormControl>
    )
}

FRadioGroup.propTypes = {
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
     * Basic attribute of input element (<RadioGroup/>)
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
     * For FRadioGroup, muiInputProps consists of FormControlLabelProps
     * FormControlLabelProps API: https://mui.com/api/form-control-label/
     *
     * @param {Object}
     */
    muiInputProps: PropTypes.shape({
        FormControlLabelProps: PropTypes.object,
    }),
}
