import * as React from 'react'

export const useDefaultValue = ({ formikProps, fieldName, defaultValue } = {}) => {
    const { initialValues, setFieldValue } = formikProps
    React.useEffect(() => {
        if (initialValues[fieldName] === '') {
            setFieldValue(fieldName, defaultValue)
            return
        }
        setFieldValue(fieldName, initialValues[fieldName])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}
