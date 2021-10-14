import { Grid, Typography } from "@mui/material";
import {
  FForm,
  FButton,
  FTextField,
  FAutocomplete,
  FCheckbox,
  FRadioGroup,
  FDatePicker,
  FTimePicker,
} from "@formulir/material-ui";
import * as Yup from "yup";

export const FormFormulir = () => {
  const initialValues = {
    username: "",
    age: 0,
    email: {
      initialValue: "",
      validation: "string",
    },
    password: {
      initialValue: "",
      validation: "string",
    },
    // Initial values for FAutocomplete (single value)
    gender: {
      initialValue: "",
    },
    // Initial values for FAutocomplete (multiple values)
    hobbies: {
      initialValue: [],
      validation: "array",
    },
    favoriteSongs: {
      initialValue: [],
      validation: "array",
    },
    favoriteColor: [],
    birthDate: "",
    eventTime: "",
  };
  const onSubmit = (values, onSubmitProps) => {
    console.log(values);
    onSubmitProps.setSubmitting(false);
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Yup validation"),
    age: Yup.number().min(100000),
  });
  return (
    <FForm
      style={{ margin: "auto", width: 640 }}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography textAlign="center" variant="h5">
            Formulir - Material UI
          </Typography>
        </Grid>
        <Grid item>
          <FTextField
            muiInputProps={{ TextFieldProps: { fullWidth: true } }}
            label="Username"
            type="text"
            name="username"
          />
        </Grid>
        <Grid item>
          <FTextField muiInputProps={{ TextFieldProps: { fullWidth: true } }} label="Age" type="number" name="age" />
        </Grid>
        <Grid item>
          <FTextField
            muiInputProps={{ TextFieldProps: { fullWidth: true } }}
            label="Your Email"
            type="email"
            name="email"
          />
        </Grid>
        <Grid item>
          <FTextField
            muiInputProps={{ TextFieldProps: { fullWidth: true } }}
            label="Your Password"
            type="password"
            name="password"
          />
        </Grid>
        <Grid item>
          {/* Single value */}
          <FAutocomplete
            label="Your Gender"
            name="gender"
            options={[
              { label: "Male", value: "optionID-male-x10YhM" },
              {
                label: "Female",
                value: "optionID-female-x11YhM",
              },
            ]}
          />
        </Grid>
        <Grid item>
          {/* Multiple values */}
          <FAutocomplete
            muiInputProps={{
              AutocompleteProps: {
                multiple: true,
              },
            }}
            label="Your Hobbies"
            name="hobbies"
            options={[
              { label: "Football", value: "hobbyID-x10QWERTY" },
              { label: "Volleyball", value: "hobbyID-x11QWERTY" },
              { labelAndValue: "Hiking" },
            ]}
          />
        </Grid>
        <Grid item>
          <FCheckbox
            label="Favorite Songs"
            name="favoriteSongs"
            options={[
              { label: "Avenged Sevenfold", value: "A7X" },
              {
                label: "Marshall Bruce Mathers III",
                value: "Eminem",
              },
              { labelAndValue: "Rex Orange County" },
            ]}
          />
        </Grid>
        <Grid item>
          <FRadioGroup
            label="Favorite Color"
            name="favoriteColor"
            options={[
              { label: "Red", value: "colorID-x01" },
              { label: "Blue", value: "colorID-x02" },
              { labelAndValue: "Green" },
            ]}
          />
        </Grid>
        <Grid item>
          <FDatePicker
            muiInputProps={{
              DatePickerProps: {
                showToolbar: true,
              },
              TextFieldProps: {
                fullWidth: true,
              },
            }}
            name="birthDate"
          />
        </Grid>
        <Grid item>
          <FTimePicker
            muiInputProps={{
              TimePickerProps: {
                ampm: false,
              },
              TextFieldProps: {
                fullWidth: true,
              },
            }}
            name="eventTime"
          />
        </Grid>
        <Grid item>
          <FButton
            muiInputProps={{
              ButtonProps: {
                fullWidth: true,
                variant: "outlined",
              },
            }}
          >
            <Typography>Submit</Typography>
          </FButton>
        </Grid>
      </Grid>
    </FForm>
  );
};
