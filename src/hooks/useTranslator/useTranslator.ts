import { Translation } from '../../types'
import useConcreteFormConfig from '../useConcreteFormConfig'
import defaultTranslator from '../../translation/defaultTranslator'

const useTranslator = () => {
  const { translator: customTranslator, language } = useConcreteFormConfig()
  const translator = customTranslator ?? defaultTranslator(language)

  return (item: Translation) => translator(item)
}

export default useTranslator
