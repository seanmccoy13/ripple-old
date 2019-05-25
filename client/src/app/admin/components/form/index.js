import React from 'react'
import { withFormik } from 'formik'
import Yup from 'yup'

import { StyledInputFeedback, StyledLabel, StyledInputGroupError, StyledInputGroup, StyledInputText } from './style'

export const formEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'C\'mon, your name is longer than that')
      .required('First name is required.'),
    lastName: Yup.string()
      .min(2, 'C\'mon, your name is longer than that')
      .required('Last name is required.'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required!'),
  }),

  mapPropsToValues: ({ user }) => ({
    ...user,
  }),
  handleSubmit: (payload, { setSubmitting }) => {
    alert(payload.email)
    setSubmitting(false)
  },
  displayName: 'MyForm',
})

const InputFeedback = ({ error }) =>
  error ? (
    <StyledInputFeedback>{error}</StyledInputFeedback>
  ) : null

const Label = ({
  children,
  ...props
}) => {
  return (
    <StyledLabel {...props}>
      {children}
    </StyledLabel>
  )
}

const TextInput = ({
  type,
  id,
  label,
  error,
  value,
  onChange,
  ...props
}) => {
  if (error) {
    return (
      <StyledInputGroupError>
        <Label htmlFor={id} error={error}>
          {label}
        </Label>
        <StyledInputText
          id={id}
          error={true}
          type={type}
          value={value}
          onChange={onChange}
          {...props}
        />
        <InputFeedback error={error} />
      </StyledInputGroupError>
    )
  }
  return (
    <StyledInputGroup>
      <Label htmlFor={id} error={error}>
        {label}
      </Label>
      <StyledInputText
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        {...props}
      />
      <InputFeedback error={error} />
    </StyledInputGroup>
  )

}
const MyForm = props => {
  const {
    values,
    touched,
    errors,
    dirty,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    isSubmitting,
  } = props
  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        id="firstName"
        type="text"
        label="First Name"
        placeholder="John"
        error={touched.firstName && errors.firstName}
        value={values.firstName}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <TextInput
        id="lastName"
        type="text"
        label="Last Name"
        placeholder="Doe"
        error={touched.lastName && errors.lastName}
        value={values.lastName}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <TextInput
        id="email"
        type="email"
        label="Email"
        placeholder="Enter your email"
        error={touched.email && errors.email}
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <button
        type="button"
        className="outline"
        onClick={handleReset}
        disabled={!dirty || isSubmitting}
      >
        Reset
      </button>
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
      <DisplayFormikState {...props} />
    </form>
  )
}

const MyEnhancedForm = formEnhancer(MyForm)

