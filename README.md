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

## Examples

-   [CodeSandbox](https://codesandbox.io/s/formulir-build-instant-material-ui-forms-m9n86?file=/src/App.js)
-   Documentation _(coming soon)_
