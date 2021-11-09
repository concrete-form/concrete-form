import './setupYupLocale'
import * as Yup from 'yup'

describe('setupYupLocale', () => {
  /* note: not testing each strings, just confirming with one */
  it('changed yup locales globally', async () => {
    const schema = Yup.string().required()
    let error
    try {
      await schema.validate('')
    } catch (validationError: any) {
      error = validationError?.errors?.[0]
    }
    expect(error).toEqual({ key: 'required', meta: { from: 'yup' } })
  })
})
