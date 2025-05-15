export const addError = (field, form) => {
  field.classList.remove('_is-filled');
  field.classList.add('_has-error');
  form.classList.add('_has-error');
};

export const removeError = (field, form) => {
  if (field.classList.contains('_has-error')) {
    field.classList.remove('_has-error');
    form.classList.remove('_has-error');
  }
};
