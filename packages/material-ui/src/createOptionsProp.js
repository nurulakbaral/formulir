export const createOptionsProp = (options = []) => {
    let optionsValue = []
    for (const option of options) {
        const [label, value] = Object.values(option)
        optionsValue = [
            ...optionsValue,
            {
                label,
                value,
            },
        ]
    }
    return optionsValue
}
