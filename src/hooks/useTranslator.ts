import { Translation } from '../types'
import { useConcreteFormConfig } from '../context/concreteForm.context'
import defaultTranslator from '../translation/defaultTranslator'

const useTranslator = () => {
  const { translator: customTranslator, language } = useConcreteFormConfig()
  const translator = customTranslator ?? defaultTranslator(language)

  return (item: Translation) => translator(item)
}

export default useTranslator
