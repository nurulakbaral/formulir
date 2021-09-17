import * as React from 'react'
import { Field } from 'formik'
import { TextField as MuiTextField } from '@mui/material'
import { useFFormProps } from '../useFFormProps'
import { useFieldError } from '../useFieldError'
import invariant from 'tiny-warning'
import PropTypes from 'prop-types'

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
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    errorMessage: PropTypes.string,
    label: PropTypes.string,
    muiInputProps: PropTypes.object,
    style: PropTypes.object,
    className: PropTypes.string,
}
