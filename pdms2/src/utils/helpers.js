export const isChecked = value =>
  value === true ? undefined : 'You have to agree to the Terms & Conditions';
  
export const isRequired = value => (value ? undefined : 'Required');

export const isValidEmail = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Must be a valid email address'
    : undefined;