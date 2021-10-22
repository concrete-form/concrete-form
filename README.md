<p align="center">
  <img alt="Concrete Form" src="./doc/logo.png" />
</p>

<p align="center">
  A <strong>UI implementation</strong> of the most popular form libraries for <strong>React</strong>
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
  <a href="https://bundlephobia.com/package/@concrete-form/core">
    <img alt="bundle size" style="margin:3px" 
    src="https://img.shields.io/bundlephobia/min/@concrete-form/core?label=size&style=flat-square&v=2" />
  </a>
  <a href="https://www.npmjs.com/package/@concrete-form/core">
    <img alt="License" style="margin:3px" 
    src="https://img.shields.io/npm/l/@concrete-form/core?color=%23007ec6&style=flat-square&v=2" />
  </a>
</div>

---

## Example
> [Material-UI](https://mui.com/) [TextField](https://mui.com/components/text-fields/) connected to [React hook form](https://react-hook-form.com)

```jsx
import Form from '@concrete-form/addon-react-hook-form'
import { Input } from '@concrete-form/material-ui'
import { useForm } from 'react-hook-form'

const Example = () => {
  const form = useForm()
  return (
    <Form form={form} onSubmit={...}>
      <Input name="foo" />
    </Form>
  )
}
```

## **Concrete Form** in a nutshell
1) Select the form provider you're using (ex `React Hook Form`).
2) Select the UI kit you're using (ex `Material-UI`).
3) Start working your forms, `Concrete Form` connects all the libraries together

## What this library is NOT
1) **Concrete Form** is **NOT** a form library, just an implementation of existing libraries
2) **Concrete Form** is **NOT** changing the form behavior
3) **Concrete Form** is **NOT** making any design decision for you when rendering the controls

<br />

---

<br />


## Work in progress
This library is not implemented yet. Poke me if you're curious and want to contribute !