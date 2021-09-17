export const createOptionsProp = (componentName = '', options = []) => {
    let newOptionsProp = []
    for (const option of options) {
        const [label, value] = Object.values(option)
        // Notes: Options prop for FCheckbox or FRadioGroup
        if (['fcheckbox', 'fradiogroup'].includes(componentName)) {
            newOptionsProp = [
                ...newOptionsProp,
                {
                    label,
                    value,
                },
            ]
            continue
        }
        // Notes: Options prop for FAutocomplete
        newOptionsProp = [
            ...newOptionsProp,
            {
                label,
            },
        ]
    }
    return newOptionsProp
}
