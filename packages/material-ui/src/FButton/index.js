import * as React from 'react'
import { Button } from '@mui/material'
import { useFFormProps } from '../useFFormProps'
import PropTypes from 'prop-types'
import invariant from 'tiny-warning'
import { inspectMuiInputProps } from '../FInputs/FAutocomplete'

export const FButton = ({ children, ...fbuttonProps }) => {
    const { style: _Style, className: _ClassName, muiInputProps } = fbuttonProps
    const {
        formikProps: { isSubmitting },
    } = useFFormProps()
    // Notes: Remove `type` prop from ButtonProps
    const {
        ButtonProps: { type: $type, disabled: $disabled, ...ButtonProps },
    } = { ButtonProps: muiInputProps?.ButtonProps ?? {} }
    if (process.env.NODE_ENV !== 'production') {
        const constraintProp = ['ButtonProps']
        const { isPropValid, brokenKeys } = inspectMuiInputProps({
            inputProp: muiInputProps ?? {},
            constraintProp,
        })
        // Notes: Warning for `muiInputProps` prop
        invariant(
            isPropValid,
            `Prop of \`muiInputProps\` doesn't accept properties ${brokenKeys.join(
                ', '
            )}. Prop of \`muiInputProps\` from a FButton component accepts only properties ${constraintProp.join(
                ', '
            )}.`
        )
    }
    return (
        // Notes: Remove some props from MuiButtonProps
        <Button
            style={_Style}
            className={_ClassName}
            type='submit'
            disabled={isSubmitting}
            {...ButtonProps}
        >
            {!children ? 'Submit' : children}
        </Button>
    )
}

FButton.propTypes = {
    /**
     * Children prop
     *
     * @param {React.ReactNode}
     */
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
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
     * For FButton, muiInputProps consists of ButtonProps
     * ButtonProps API: https://mui.com/api/button/
     *
     * @param {Object}
     */
    muiInputProps: PropTypes.shape({
        ButtonProps: PropTypes.object,
    }),
}
