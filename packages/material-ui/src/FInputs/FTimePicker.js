import * as React from 'react'
import { TextField } from '@mui/material'
import { TimePicker as MuiTimePicker } from '@mui/lab'
import { Field } from 'formik'
import { useFFormProps } from '../useFFormProps'
import { useDefaultValue } from '../useDefaultValue'
import PropTypes from 'prop-types'

// Credit: This was taken from formik-material-ui. Big thanks for the inspiration!
function fieldFTimePicker({
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
// Notes: Set some prop for default
const TimePicker = (props) => {
    return <MuiTimePicker {...fieldFTimePicker(props)} />
}
export const FTimePicker = ({ ...datepickerProps }) => {
    const { style: _Style, className: _ClassName, name: _Name, label: _Label, muiInputProps } = datepickerProps
    const { formikProps } = useFFormProps()
    const [isOpen, setIsOpen] = React.useState(false)
    // Notes: Remove some prop from MuiTimePickerProps and MuiTextFieldProps
    const {
        TimePickerProps: {
            style: $style,
            className: $className,
            name: $name,
            label: $label,
            open: $open,
            onClose: $onClose,
            disableMaskedInput: $disableMaskedInput,
            readOnly: $readOnly,
            disableOpenPicker: $disableOpenPicker,
            ...TimePickerProps
        },
        TextFieldProps: { onClick: $onClick, onBlur: $onBlur, ...TextFieldProps },
    } = {
        // Notes: Handle undefined value for TimePickerProps and TextFieldProps
        TimePickerProps: muiInputProps?.TimePickerProps ?? {},
        TextFieldProps: muiInputProps?.TextFieldProps ?? {},
    }
    useDefaultValue({ formikProps, fieldName: _Name, defaultValue: new Date() })
    if (!_Name) {
        throw new Error(`Prop of \`name\` has not been defined.`)
    }
    return (
        <Field
            component={TimePicker}
            // Notes: Default Mui TimePicker Props
            style={_Style}
            className={_ClassName}
            name={_Name}
            label={_Label}
            open={isOpen}
            onClose={() => setIsOpen(false)}
            disableMaskedInput
            readOnly
            disableOpenPicker
            // Notes: Optional default Mui TimePicker Props
            showToolbar
            {...TimePickerProps}
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

FTimePicker.propTypes = {
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
     * Basic attribute of input element (<TimePicker/>)
     *
     * @param {String}
     */
    name: PropTypes.string.isRequired,
    /**
     * Label prop is basic attribute of input element (<TimPicker/>)
     *
     * @param {String}
     */
    label: PropTypes.string,
    /**
     * For FTimPicker, muiInputProps consists of TimePickerProps and TextFieldProps
     * TimePickerProps API      : https://mui.com/api/time-picker/
     * TextFieldProps API       : https://mui.com/api/text-field/
     *
     * @param {Object}
     */
    muiInputProps: PropTypes.object,
}
