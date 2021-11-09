import { screen } from '@testing-library/react'
import render from '../testkit/render'
import CustomizableLayout from './CustomizableLayout'

type CustomLayoutProps = { name: string }
const CustomLayout: React.FC<CustomLayoutProps> = ({ name }) => <div>hello { name }</div>

describe('CustomizableLayout', () => {
  it('render children as default layout', () => {
    render(<CustomizableLayout type="control" props={{}}><span>foo</span></CustomizableLayout>)
    expect(screen.getByText('foo')).toBeInTheDocument()
    expect(screen.queryByText('custom')).not.toBeInTheDocument()
  })

  it('uses custom layout', () => {
    render(<CustomizableLayout type="control" props={{ name: 'world' }}><span>foo</span></CustomizableLayout>, {
      concreteFormConfig: { layout: { control: CustomLayout } },
    })
    expect(screen.getByText('hello world')).toBeInTheDocument()
    expect(screen.queryByText('foo')).not.toBeInTheDocument()
  })
})
