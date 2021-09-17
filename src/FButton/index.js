import * as React from 'react'
import { Button } from '@mui/material'
import { useFFormProps } from '../useFFormProps'
import PropTypes from 'prop-types'

export const FButton = ({ children, ...fbuttonProps }) => {
    const { style: _Style, className: _ClassName, muiInputProps } = fbuttonProps
    const {
        formikProps: { isSubmitting },
    } = useFFormProps()
    // Notes: Remove `type` prop from ButtonProps
    const {
        ButtonProps: { type: $type, disabled: $disabled, ...ButtonProps },
    } = { ButtonProps: muiInputProps?.ButtonProps ?? {} }
    return (
        // Notes: Remove some props from MuiButtonProps
        <Button style={_Style} className={_ClassName} type='submit' disabled={isSubmitting} {...ButtonProps}>
            {!children ? 'Submit' : children}
        </Button>
    )
}

FButton.propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
    style: PropTypes.object,
    className: PropTypes.string,
}
