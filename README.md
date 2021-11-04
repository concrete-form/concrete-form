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

## Example
> [Material-UI](https://mui.com/) [TextField](https://mui.com/components/text-fields/) connected to [React hook form](https://react-hook-form.com)

```jsx
import Form from '@concrete-form/react-hook-form'
import { Input, SubmitButton } from '@concrete-form/material-ui'

const App = () => (
  <Form onSubmit={...}>
    <Input name="name" placeholder="Enter your name" />
    <SubmitButton>Send</SubmitButton>
  </Form>
)
```

## **Concrete Form** in a nutshell
1) Select the form provider you want (ex `React Hook Form`, `Formik`).
2) Select the UI kit you want (ex `Material-UI`, `Materialize`).
3) Enjoy. `Concrete Form` connects the form and the UI for you.

## FAQ
> What new form feature do I get ?

**None.** Concrete form only take care of the rendering of the ui. Refer to your form prodiver doc.

<br />

> Can I implement custom form control ?

**Absolutely**. The same way you would normally. (your existing custom controls will work without change too)

<br />

> Can I customize the UI ?

**YES**. The rendering is higly customizable and follow the UI kits best practices.

<br />

---

<br />


## Work in progress
This library is not implemented yet. Poke me if you're curious and want to contribute !