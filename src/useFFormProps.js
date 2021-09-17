import * as React from 'react'

const FFormPropsStore = React.createContext(null)

export const FFormPropsWrapper = ({ formikProps, children }) => {
    return <FFormPropsStore.Provider value={{ formikProps }}>{children}</FFormPropsStore.Provider>
}

export const useFFormProps = () => {
    return React.useContext(FFormPropsStore)
}
