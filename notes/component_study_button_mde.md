## Study: button component

### Goal

- that `Button` component has web standard `button` API/interfaces
  - to prevent re-declaring all tag specific attributes
  - to prevent re-declaring accessibility features (aria) and global attributes
  - to prevent re-declaring all event bindings
- to expose proper type safety without having to re-declare typings. Extending types where appropriate
- allow for default values for attributes. Ex: Recommended practice for `<button type="button">` is to have `type` default to `button`
- allow component to be extended or composed
- to have a small amount of abstraction for when duplication would become a burden

### Reference components

- Ant Design `Button`
  - https://ant.design/components/button
  - https://ant.design/components/button/#API
  - 319 lines of JSX code: https://github.com/ant-design/ant-design/blob/master/components/button/button.tsx
  - 292 lines of CSS: https://github.com/ant-design/ant-design/blob/master/components/button/style/index.less
  - 589 lines of CSS mixins: https://github.com/ant-design/ant-design/blob/master/components/button/style/mixin.less
  - 90 lines of RTL language CSS: https://github.com/ant-design/ant-design/blob/master/components/button/style/rtl.less
  - Approximately 1290 of code that doesn't include LESS utilities that are used across the design system
- Bootstrap `button`
  - https://getbootstrap.com/docs/5.2/components/buttons/
  - 186 lines of CSS: https://github.com/twbs/bootstrap/blob/main/scss/_buttons.scss
  - Difficult to read with a high degree of abstraction using scss
  - Unknown amount of scss code that is expressed using mixins and includes

@import "./component_study1_mde.md"
@import "./component_study2_mde.md"
@import "./component_study3_mde.md"
@import "./component_study4_mde.md"
@import "./component_study5_mde.md"
