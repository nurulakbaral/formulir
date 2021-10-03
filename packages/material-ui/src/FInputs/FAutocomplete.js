import * as React from 'react'
import invariant from 'tiny-warning'
import { Field } from 'formik'
import {
    Autocomplete as MuiAutocomplete,
    TextField as MuiTextField,
} from '@mui/material'
import { useFFormProps } from '../useFFormProps'
import { useFieldError } from '../useFieldError'
import PropTypes from 'prop-types'
import { createOptionsProp } from '../createOptionsProp'

// Credit: This was taken from formik-material-ui. Big thanks for the inspiration!
export function fieldToFAutocomplete({
    disabled,
    field,
    form: { isSubmitting, setFieldValue },
    type,
    onChange,
    onBlur,
    ...props
}) {
    if (process.env.NODE_ENV !== 'production') {
        if (props.multiple) {
            invariant(
                Array.isArray(field.value),
                `value for ${field.name} is not an array, this can caused unexpected behaviour`
            )
        }
    }
    const {
        onChange: $onChange,
        onBlur: $onBlur,
        multiple: $multiple,
        ...fieldSubselection
    } = field
    return {
        onBlur:
            onBlur ??
            function (event) {
                field.onBlur(event ?? field.name)
            },
        onChange:
            onChange ??
            function (_event, value) {
                setFieldValue(field.name, value)
            },
        disabled: disabled ?? isSubmitting,
        loading: isSubmitting,
        ...fieldSubselection,
        ...props,
    }
}
const Autocomplete = (props) => (
    <MuiAutocomplete {...fieldToFAutocomplete(props)} />
)
export const inspectMuiInputProps = (IOProp = {}) => {
    const { inputProp, constraintProp } = IOProp
    const inputPropKeys = Object.keys(inputProp)
    const brokenKeys = []
    for (const key of inputPropKeys) {
        if (!constraintProp.includes(key)) {
            brokenKeys.push(key)
        }
    }
    return {
        isPropValid: brokenKeys.length === 0 ? true : false,
        brokenKeys,
    }
}
export const FAutocomplete = ({ ...fautocompleteProps }) => {
    const {
        formikProps: { errors, touched, values },
    } = useFFormProps()
    const {
        style: _Style,
        className: _ClassName,
        name: _Name,
        label: _Label,
        errorMessage: _ErrorMessage,
        options: _Options,
        muiInputProps,
    } = fautocompleteProps
    const { isError } = useFieldError({
        formikErrors: errors,
        formikTouched: touched,
        fieldName: _Name,
    })
    // Notes: Remove some props from MuiAutocompleteProps and MuiTextFieldProps
    const {
        AutocompleteProps: {
            style: $style,
            className: $className,
            name: $name,
            options: $options,
            getOptionLabel: $getOptionLabel,
            filterSelectedOptions: $filterSelectedOptions,
            freeSolo: $freeSolo,
            ...AutocompleteProps
        },
        TextFieldProps: {
            name: $$name,
            error: $error,
            helperText: $helperText,
            label: $label,
            ...TextFieldProps
        },
    } = {
        // Notes: Handle undefined value for AutocompleteProps and TextFieldProps
        AutocompleteProps: muiInputProps?.AutocompleteProps ?? {},
        TextFieldProps: muiInputProps?.TextFieldProps ?? {},
    }
    if (process.env.NODE_ENV !== 'production') {
        const constraintProp = ['TextFieldProps', 'AutocompleteProps']
        const { isPropValid, brokenKeys } = inspectMuiInputProps({
            inputProp: muiInputProps ?? {},
            constraintProp,
        })
        // Notes: Warning for `muiInputProps` prop
        invariant(
            isPropValid,
            `Prop of \`muiInputProps\` doesn't accept properties ${brokenKeys.join(
                ', '
            )}. Prop of \`muiInputProps\` from a FAutocomplete component accepts only properties ${constraintProp.join(
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
    const newErrorMessage = _ErrorMessage ?? errors[_Name]
    // Notes: Returns an unselected options if the _Options prop changes via component rendering
    const newOptionsProp = React.useMemo(() => {
        // Notes: Change values[_name] to array
        const selectedOptions = !Array.isArray(values[_Name])
            ? Array.of(values[_Name])
            : values[_Name]
        const renderedOptions = createOptionsProp(_Options)
        if (selectedOptions.length === 0) return renderedOptions
        const filteredOptions = (option) => {
            const result = selectedOptions.find(
                (selectedOption) => selectedOption?.label === option.label
            )
            if (!result) return option.label
        }
        return renderedOptions.filter(filteredOptions)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_Options, values])
    return (
        <Field
            component={Autocomplete}
            // Notes: Default Mui Autocomplete Props
            style={_Style}
            className={_ClassName}
            name={_Name}
            options={newOptionsProp}
            getOptionLabel={(option) => option.label ?? ''}
            filterSelectedOptions
            freeSolo
            {...AutocompleteProps}
            renderInput={(params) => (
                <MuiTextField
                    name={_Name}
                    error={isError}
                    helperText={isError ? newErrorMessage : null}
                    label={_Label}
                    {...params}
                    // Notes: In Autocomplete, default TextField `fullWidth` prop is `true`
                    {...TextFieldProps}
                />
            )}
        />
    )
}

FAutocomplete.propTypes = {
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
     * Name is basic attribute of input element (<Autocomplete/> and <TextField/>)
     *
     * @param {String}
     */
    name: PropTypes.string.isRequired,
    /**
     * Options is prop of Material UI Autocomplete
     *
     * @param {Array}
     */
    options: PropTypes.array.isRequired,
    /**
     * ErrorMessage in helperText prop of Material UI TextField
     *
     * @param {String}
     */
    errorMessage: PropTypes.string,
    /**
     * Label prop is basic attribute of input element (<TextField/>)
     *
     * @param {String}
     */
    label: PropTypes.string,
    /**
     * For FAutocomplete, muiInputProps consists of AutocompleteProps and TextFieldProps
     * AutocompleteProps API    : https://mui.com/api/autocomplete/
     * TextFieldProps API       : https://mui.com/api/text-field/
     *
     * @param {Object}
     */
    muiInputProps: PropTypes.shape({
        TextFieldProps: PropTypes.object,
        AutocompleteProps: PropTypes.object,
    }),
}
