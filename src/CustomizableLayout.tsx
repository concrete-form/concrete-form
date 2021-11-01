import { useConcreteFormConfig } from './context/concreteForm.context'

type LayoutProps = {
  type: string
  children: React.ReactElement
  props: any
}

const CustomizableLayout: React.FC<LayoutProps> = ({ type, children, props }) => {
  const { layout } = useConcreteFormConfig()
  const CustomLayout = (layout as any)?.[type]
  if (CustomLayout) {
    return <CustomLayout {...props} />
  }
  return children
}

export default CustomizableLayout
