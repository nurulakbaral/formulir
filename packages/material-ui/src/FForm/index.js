import * as React from 'react'
import { Formik, Form } from 'formik'
import { FFormPropsWrapper } from '../useFFormProps'
import * as Yup from 'yup'
import invariant from 'tiny-warning'
import PropTypes from 'prop-types'

const createValidationSchema = (schema = {}) => {
    let yupValidationSchema = {}
    for (const [key, value] of Object.entries(schema)) {
        switch (value) {
            case 'string': {
                yupValidationSchema = {
                    ...yupValidationSchema,
                    [key]: Yup.string()
                        .transform((_, value) => {
                            // Notes: Single string (TextField)
                            if (typeof value === 'string') {
                                return value
                            }
                            // Notes: Object string (Autocomplete)
                            if (typeof value === 'object') {
                                return value?.label ?? ''
                            }
                        })
                        .required(),
                }
                break
            }
            case 'number': {
                yupValidationSchema = {
                    ...yupValidationSchema,
                    [key]: Yup.number().required(),
                }
                break
            }
            case 'array': {
                yupValidationSchema = {
                    ...yupValidationSchema,
                    [key]: Yup.array().min(1),
                }
                break
            }
            default: {
                // Notes : Case when user pass Yup in validationSchema
                // Fix/Bugs (opt) : Periksa apakah yang di-passing Yup atau tidak kalo tidak berikan pesan kesalahan!
                yupValidationSchema = { ...yupValidationSchema, [key]: value }
            }
        }
    }
    return {
        yupValidationSchema: Yup.object(yupValidationSchema),
    }
}

export const FForm = ({ children, ...fformProps }) => {
    const {
        style: _Style,
        className: _ClassName,
        initialValues: _InitialValues,
        validationSchema: _ValidationSchema,
        onSubmit: _OnSubmit,
    } = fformProps
    const { yupValidationSchema } = createValidationSchema(_ValidationSchema)
    if (process.env.NODE_ENV !== 'production') {
        if (_ValidationSchema !== false) {
            invariant(
                !!_ValidationSchema,
                `Prop of \`validationSchema\` has not been defined, if you don't want to use schema validation, please set the value of the \`validationSchema\` prop to \`false\`.`
            )
        }
    }
    if (!_InitialValues || !_OnSubmit) {
        throw new Error(
            `Prop of \`initialValues\` or \`onSubmit\` has not been defined,`
        )
    }
    return (
        <Formik
            initialValues={_InitialValues}
            validationSchema={yupValidationSchema}
            onSubmit={_OnSubmit}
        >
            {(formikProps) => (
                <FFormPropsWrapper formikProps={formikProps}>
                    <Form style={_Style} className={_ClassName}>
                        {children}
                    </Form>
                </FFormPropsWrapper>
            )}
        </Formik>
    )
}

FForm.propTypes = {
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
     * <Formik/>: initialValues prop
     *
     * @param {Object}
     */
    initialValues: PropTypes.object.isRequired,
    /**
     * <Formik/>: validationSchema prop
     * Do       : { [key]: 'string' | 'number' | 'array' | Yup.string().required() }
     * Don't    : Yup.object({ [key]: 'string' | 'number' | 'array' | Yup.string().required() })
     *
     * @param {Object}
     */
    validationSchema: PropTypes.oneOfType([
        PropTypes.bool.isRequired,
        PropTypes.object.isRequired,
    ]),
    /**
     * <Formik/>: onSubmit prop
     *
     * @param {Function}
     */
    onSubmit: PropTypes.func.isRequired,
}
