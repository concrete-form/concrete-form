const translations = {
  default: 'this field is invalid',
  required: 'this field is required',
  'one-of': 'this field must be one of the following values: {{values}}',
  'not-one-of': 'this field must not be one of the following values: {{values}}',
  length: 'this field must be exactly {{length}} characters',
  minlength: 'this field must be at least {{min}} characters',
  maxlength: 'this field must be at most {{max}} characters',
  email: 'this field must be a valid email',
  url: 'this field must be a valid URL',
  min: 'this field must be greater than or equal to {{min}}',
  max: 'this field must be less than or equal to {{max}}',
  'less-than': 'this field must be less than {{less}}',
  'more-than': 'this field must be greater than {{more}}',
  positive: 'this field must be a positive number',
  negative: 'this field must be a negative number',
  integer: 'this field must be an integer',
  'min-date': 'this field must be later than {{min}}',
  'max-date': 'this field must be at earlier than {{max}}',
  'min-items': 'this field must have at least {{min}} items',
  'max-items': 'this field must have less than or equal to {{max}} items',
}

export default translations
