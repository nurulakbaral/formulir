# Formulir - Build instant Material UI forms

Formulir is a simple library for building instant forms with Material UI (MUI) components.

## Installation

You’ll want to install Formulir and its peer-dependencies via yarn (or npm).

**MUI Core**

```sh
yarn add @mui/material @emotion/react @emotion/styled
```

**MUI Lab**

```sh
yarn add @mui/lab date-fns @date-io/date-fns
```

**Formulir**

```sh
yarn add formulir
```

**Note** :
_If you use ex. Next.js make sure server rendering is in Material UI (MUI), to make it easier, you can follow the sample project from the Material UI documentation._

-   [Example Projects (Official)](https://mui.com/getting-started/example-projects/)

## Basic Usage

```jsx
import {
    FForm,
    FButton,
    FTextField,
    FAutocomplete,
    FCheckbox,
    FDatePicker,
    FRadioGroup,
    FTimePicker,
} from 'formulir'

const initialValues = {
    // FTextField {String}
    username: '',
    // FAutocomplete {String | Array}
    gender: '', // Single value
    favoriteSongs: [], // Multiple values
    // FCheckbox {Array}
    hobbies: [],
    // FDatePicker {Date}
    birthDate: '',
    // FRadioGroup {Array}
    yearOfCollege: [],
    // FTimePicker {Date}
    eventTime: '',
}
const validationSchema = {
    // [initialValues key]: 'string' | 'number' | 'array' | Yup Validation
}
const handleSubmit = (values, { setSubmitting }) => {
    console.log(values)
    setSubmitting(false)
}

;<FForm
    initialValues={initialValues}
    onSubmit={handleSubmit}
    validationSchema={validationSchema}
>
    <FTextField
        name='username'
        type='text'
        errorMessage='Cusutom error message'
    />
    <FAutocomplete
        name='gender'
        options={[{ label: 'Male' }, { label: 'Female' }]}
        muiInputProps={{
            TextFieldProps: {
                variant: 'outlined',
            },
        }}
    />
    <FAutocomplete
        name='favoriteSongs'
        options={[
            { label: 'Eminem' },
            { label: 'Rex Orange Country' },
            { label: 'A7X' },
        ]}
        muiInputProps={{
            AutocompleteProps: {
                multiple: true,
            },
            TextFieldProps: {
                placeholder: 'My Placeholder',
            },
        }}
    />
    <FCheckbox
        name='hobbies'
        options={[{ label: 'Football' }, { label: 'Vollybal' }]}
    />
    <FDatePicker name='birthDate' />
    <FRadioGroup
        name='yearOfCollege'
        options={[
            { label: '55', value: 'Saga Agrisatya' },
            { label: '54' },
            { label: '53' },
        ]}
    />
    <FTimePicker
        name='eventTime'
        muiInputProps={{
            TimePickerProps: {
                ampm: false,
            },
        }}
    />
    <FButton />
</FForm>
```

## Setup

**DatePicker and TimePicker**

```jsx
// App.js
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            ...
        </LocalizationProvider>
    )
}
```

## API Reference

### FForm

| Name             | Type     | Note     |
| ---------------- | -------- | -------- |
| initialValues    | object   | required |
| validationSchema | object   | required |
| onSubmit         | function | required |

### FButton

| Name          | Type                   | Note     |
| ------------- | ---------------------- | -------- |
| muiInputProps | { ButtonProps: {...} } | optional |

### FTextField

| Name          | Type                      | Note     |
| ------------- | ------------------------- | -------- |
| muiInputProps | { TextFieldProps: {...} } | optional |
| name          | string                    | required |
| label         | string                    | optional |
| errorMessage  | string                    | optional |
| type          | string                    | required |

### FAutocomplete

| Name          | Type                                                | Note     |
| ------------- | --------------------------------------------------- | -------- |
| muiInputProps | { TextFieldProps: {...}, AutocompleteProps: {...} } | optional |
| name          | string                                              | required |
| label         | string                                              | optional |
| errorMessage  | string                                              | optional |
| options       | array                                               | required |

### FDatePicker

| Name          | Type                                              | Note     |
| ------------- | ------------------------------------------------- | -------- |
| muiInputProps | { TextFieldProps: {...}, DatePickerProps: {...} } | optional |
| name          | string                                            | required |
| label         | string                                            | optional |

### FTimePicker

| Name          | Type                                              | Note     |
| ------------- | ------------------------------------------------- | -------- |
| muiInputProps | { TextFieldProps: {...}, TimePickerProps: {...} } | optional |
| name          | string                                            | required |
| label         | string                                            | optional |

### FCheckbox

| Name          | Type                            | Note     |
| ------------- | ------------------------------- | -------- |
| muiInputProps | { FormControlLabelProps : {...} | optional |
| name          | string                          | required |
| label         | string                          | optional |
| errorMessage  | string                          | optional |
| options       | array                           | required |

### FRadioGroup

| Name          | Type                            | Note     |
| ------------- | ------------------------------- | -------- |
| muiInputProps | { FormControlLabelProps : {...} | optional |
| name          | string                          | required |
| label         | string                          | optional |
| errorMessage  | string                          | optional |
| options       | array                           | required |

**Note** :
TextFieldProps (https://mui.com/api/text-field/#props), ButtonProps (https://mui.com/api/button/), FormControlLabelProps (https://mui.com/api/form-control-label/), etc.

## Examples

-   [CodeSandbox](https://codesandbox.io/s/formulir-build-instant-material-ui-forms-m9n86?file=/src/App.js)
-   Documentation _(coming soon)_
