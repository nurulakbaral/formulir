import * as React from 'react'
import { TextField } from '@mui/material'
import { DatePicker as MuiDatePicker } from '@mui/lab'
import { Field } from 'formik'
import { useFFormProps } from '../useFFormProps'
import { useDefaultValue } from '../useDefaultValue'
import PropTypes from 'prop-types'

// Credit: This was taken from formik-material-ui. Big thanks for the inspiration!
function fieldToFDatePicker({
    field: { onChange: _onChange, ...field },
    form: { isSubmitting, setFieldValue },
    disabled,
    onChange,
    ...props
}) {
    return {
        disabled: disabled ?? isSubmitting,
        onChange:
            onChange ??
            function (dateValue) {
                setFieldValue(field.name, dateValue)
            },
        ...field,
        ...props,
    }
}
const DatePicker = (props) => {
    return <MuiDatePicker {...fieldToFDatePicker(props)} />
}
export const FDatePicker = ({ ...datepickerProps }) => {
    const { style: _Style, className: _ClassName, name: _Name, label: _Label, muiInputProps } = datepickerProps
    const { formikProps } = useFFormProps()
    const [isOpen, setIsOpen] = React.useState(false)
    // Notes: Remove some prop from MuiDatePickerProps and MuiTextFieldProps
    const {
        DatePickerProps: {
            style: $style,
            className: $className,
            name: $name,
            label: $label,
            open: $open,
            onClose: $onClose,
            disableMaskedInput: $disableMaskedInput,
            readOnly: $readOnly,
            disableOpenPicker: $disableOpenPicker,
            ...DatePickerProps
        },
        TextFieldProps: { onClick: $onClick, onBlur: $onBlur, ...TextFieldProps },
    } = {
        // Notes: Handle undefined value for DatePickerProps and TextFieldProps
        DatePickerProps: muiInputProps?.DatePickerProps ?? {},
        TextFieldProps: muiInputProps?.TextFieldProps ?? {},
    }
    useDefaultValue({ formikProps, fieldName: _Name, defaultValue: new Date() })
    if (!_Name) {
        throw new Error(`Prop of \`name\` has not been defined.`)
    }
    return (
        <Field
            component={DatePicker}
            // Notes: Default Mui DatePicker Props
            style={_Style}
            className={_ClassName}
            name={_Name}
            label={_Label}
            open={isOpen}
            onClose={() => setIsOpen(false)}
            disableMaskedInput
            readOnly
            disableOpenPicker
            {...DatePickerProps}
            renderInput={(params) => (
                <TextField
                    onClick={() => setIsOpen(true)}
                    onBlur={() => formikProps.setFieldTouched(_Name, true, false)}
                    {...TextFieldProps}
                    {...params}
                />
            )}
        />
    )
}

FDatePicker.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    muiInputProps: PropTypes.object,
    style: PropTypes.object,
    className: PropTypes.string,
}
