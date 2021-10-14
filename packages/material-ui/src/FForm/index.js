import * as React from "react";
import { Formik, Form } from "formik";
import { FFormPropsWrapper } from "../useFFormProps";
import invariant from "tiny-warning";
import PropTypes from "prop-types";
import { isPlainObject, startCase } from "lodash";

const formSchema = (initialValuesAPI = {}) => {
  const initialValues = {};
  const validationIdentifier = {};
  for (const [key, value] of Object.entries(initialValuesAPI)) {
    if (isPlainObject(value)) {
      initialValues[key] = value.initialValue;
      validationIdentifier[key] = value.validation;
      continue;
    }
    initialValues[key] = value;
  }
  return {
    initialValues,
    validationIdentifier,
  };
};

export const FForm = ({ children, ...fformProps }) => {
  const {
    style: _Style,
    className: _ClassName,
    initialValues: _InitialValues,
    validationSchema: _ValidationSchema,
    validate: _Validate,
    onSubmit: _OnSubmit,
  } = fformProps;
  const handleStandardErrors = (formikValues) => {
    const validationIdentifier = formSchema(_InitialValues).validationIdentifier;
    const errors = {};
    const valuesKey = Object.keys(formikValues);
    for (const key of valuesKey) {
      // Notes: Standard string validation
      if (validationIdentifier[key] === "string") {
        if (!formikValues[key]) {
          errors[key] = `${startCase(key)} is a required field`;
        }
        // Notes: Standard array validation
      } else if (validationIdentifier[key] === "array") {
        if (!formikValues[key].length) {
          errors[key] = `${startCase(key)} must have at least 1 items`;
        }
        // Notes: Standard number validation
      } else if (validationIdentifier[key] === "number") {
        if (["", 0].includes(formikValues[key])) {
          errors[key] = `${startCase(key)} be greater than 0`;
        }
      }
    }
    return errors;
  };
  if (process.env.NODE_ENV !== "production") {
    // Notes: Checks if entered a value other than 'string' | 'number' | 'array' in standard validation in initialValues
    const constraintIndetifier = ["string", "number", "array"];
    const validationIdentifier = Object.values(formSchema(_InitialValues).validationIdentifier);
    const isIdentifierValid = validationIdentifier.find((value) => !constraintIndetifier.includes(value));
    invariant(
      !isIdentifierValid,
      `validation of \`${isIdentifierValid}\` does not exist. Validation accepts only \`string\` | \`number\` | \`array\``
    );
  }
  if (!_InitialValues || !_OnSubmit) {
    throw new Error(`Prop of \`initialValues\` or \`onSubmit\` has not been defined,`);
  }
  return (
    <Formik
      initialValues={formSchema(_InitialValues).initialValues}
      validationSchema={_ValidationSchema}
      validate={_Validate ?? handleStandardErrors}
      onSubmit={_OnSubmit}
    >
      {(props) => (
        <FFormPropsWrapper formikProps={props}>
          <Form style={_Style} className={_ClassName}>
            {children}
          </Form>
        </FFormPropsWrapper>
      )}
    </Formik>
  );
};

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
   * Optional: InitialValues can be combined with validation (standard validation)
   * {
   *    [name] : {
   *        initialValue: string,
   *        validation: 'string' | 'number' | 'array'
   *    }
   * }
   *
   * @param  {object}
   */
  initialValues: PropTypes.object.isRequired,

  /**
   * <Formik/>: validationSchema prop
   *
   * @param {Object}
   */
  validationSchema: PropTypes.object,

  /**
   * <Formik/>: validate prop
   *
   * @param {Object}
   */
  validate: PropTypes.func,

  /**
   * <Formik/>: onSubmit prop
   *
   * @param {Function}
   */
  onSubmit: PropTypes.func.isRequired,
};
