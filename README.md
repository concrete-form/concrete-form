<p align="center">
  <img alt="Concrete Form" src="https://raw.githubusercontent.com/concrete-form/concrete-form/master/doc/logo.png" />
</p>

<p align="center">
  The most popular <strong>React form libraries</strong> implemented for you
</p>

---

<div align="center">
  <img alt="Made with Typescript" style="margin:3px"
  src="https://img.shields.io/badge/Made%20with-Typescript-2f74c0?style=for-the-badge&logo=typescript&labelColor=#333" />
  <img alt="Made for React 16+" style="margin:3px"
  src="https://img.shields.io/badge/Made%20for-React%2016+-5ed3f3?style=for-the-badge&logo=react&labelColor=#333" />
</div>

<div align="center">
  <a href="https://ci.appveyor.com/project/kegi/concrete-form/history">
    <img alt="test coverage" style="margin:3px"
    src="https://img.shields.io/appveyor/build/kegi/concrete-form?style=flat-square" />
  </a>
  <a href="https://coveralls.io/github/concrete-form/concrete-form">
    <img alt="test coverage" style="margin:3px"
    src="https://img.shields.io/coveralls/github/concrete-form/concrete-form?style=flat-square" />
  </a>
  <img alt="Tree shaking supported"src="https://img.shields.io/badge/Tree%20shaking-supported-success?style=flat-square" style="margin:3px" />
  <a href="https://www.npmjs.com/package/@concrete-form/core">
    <img alt="License" style="margin:3px" 
    src="https://img.shields.io/npm/l/@concrete-form/core?color=%23007ec6&style=flat-square&v=2" />
  </a>
</div>

---

## Installation
<a href="https://concrete-form.com/docs/getting-started/install" target="_blank">Check the installation helper</a>

## Example
> <a href="https://mui.com" target="_blank">Material-UI</a> <a href="https://mui.com/components/text-fields/" target="_blank">TextField</a> connected with <a href="https://react-hook-form.com" target="_blank">React hook form</a>


Concrete Form fill the implementation gap between form libraries and UI libraries. No more boilerplate !

```jsx
import Form from '@concrete-form/react-hook-form'
import Input from '@concrete-form/mui/Input'
import SubmitButton from '@concrete-form/mui/SubmitButton'

const Demo = () => (
  <Form onSubmit={data => alert(data.name)}>
    <Input name="name" label="Enter your name" margin="normal" />
    <SubmitButton fullWidth>Submit</SubmitButton>
  </Form>
)
```

Live example on <a href="https://codesandbox.io/s/fast-lake-grxo5?file=/src/App.tsx" target="_blank">codesandbox</a> and on <a href="https://concrete-form.com/docs/#example" target="_blank">documentation site</a>

## Documentation
https://concrete-form.com