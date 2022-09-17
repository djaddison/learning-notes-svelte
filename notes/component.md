##  Component design
  
  
- allow for simple expression of visuals
- prioritize composition of components
- prioritize web standards
- acknowledge that custom/native web components are overly complicated and the code is verbose
- it should be easy for a developer with little knowledge of the component library to create a new component or derive from an existing one
- prioritize simplification and readability
  
##  Question / Theory / Angle
  
  
- can compilers be used to
  - reduce complexity
  - reduce the amount of code that needs to be written
  - improve code quality
  - feel closer to web standards
  - improve readability
  - reduce bundle size
  - reduce bundle size by optimizing css
- what happens if `var(--foo)` is compiled out?
- what would be the DX if DRY/abstractions were not a priority?
- what would the maintenance and extendability look like if copying code was a property a component library?
- is a highly abstracted (DRY) component library easier to extend and reuse?
- what would happen if the theme or stylistic variations were not a property of the component?
  
##  Notes & Constraints
  
  
- css is a rule-based language that uses `selectors` to pattern match against the DOM
- css selectors match against elements or parent element to child relationships
- a common css pattern is to describe parent to child relationships. ex: `article h2`, `.list .list-item`
- a common css pattern is to define stylistic parameters or variations. ex: `article.blog h2`, `btn-primary`
- design systems describe an overarching visual language and pattern
- parameters of a design systems are often implemented as a theme, css variables, or transpiled css
- component design aims to be fully encapsulated
  
  - implementations that are strict about encapsulation result in a discordance between css and components
  - coding patterns that are effective in css can break the encapsulation
  
  ```css
  /**
   * Ex 1: Global CSS variables
   * Notes:
   *   - components are dependant on external styling
   *   - default values would ideally be provided when used in component
   *   - variable names would ideally be consistent across design systems for reuse
   */
  root: {
    --color-product-primary: #aaa;
    --color-product-secondary: #bbb;
    --color-product-accent: #ccc;
  }
  ```
  
  ```css
  /**
   * Ex 2: The use of parent child relationship
   * Notes:
   *   - often this relationship is difficult to expressed with a component framework that uses strict encapsulation
   *   - working around encapsulation often results in loosing css scoping
   */
  ul li {
    /* ... css that is specific to items of an unordered list */
  }
  ul.contextual-class li {
    /* ... css that is specific to the contextual class */
  }
  .menu .item {
    /* ... */
  }
  ```
  
  ```css
  /**
   * Ex 3: Global CSS being used to set base parameters
   * Notes:
   *   - components are dependant on external styling
   *   - components are less portable due to a reliance on global styling
   *   - global styling is harder to merge across design systems
   */
  button {
    /* ... something global but breaks component encapsulation */
  }
  ```
  
  
##  Study: button component
  
  
###  Goal
  
  
- that `Button` component has web standard `button` API/interfaces
  - to prevent re-declaring all tag specific attributes
  - to prevent re-declaring accessibility features (aria) and global attributes
  - to prevent re-declaring all event bindings
- to expose proper type safety without having to re-declare typings. Extending types where appropriate
- allow for default values for attributes. Ex: Recommended practice for `<button type="button">` is to have `type` default to `button`
- allow component to be extended or composed
- to have a small amount of abstraction for when duplication would become a burden
  
###  Reference components
  
  
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
  
  
###  S1: Fully encapsulated button
  
  
####  Questions
  
  
- what does a component look like if abstractions were unwound and it was expressed in simple terms?
- what if CSS optimizations were greatly reduced?
- what if a single component represented a single visual instance?
  
####  Notes
  
  
- it is easy for a developer to understand, copy, or derive work from this component
- this sample button reimplements an `antd` primary button
- simple expression of a button in under 50 lines of code
- while the `antd` button implements additional features, with approximately 1290 of code and broad/mixed concerns, it requires a developer to have a deep understanding of the code before making changes
- only implements `on:click` event forwarding. Ideally, the component user would be able to bind to any `button` events
- currently no means to represent all event bindings without explicitly listing all of events
- `on:click` event listener is added even if consumer didn't request binding
- visual design intention is harder to understand
- reuse is awkward for component user since visual design is baked into the component. ex: It would be difficult to add or remove visual properties like `text-shadow`, `border-radius`, `transition`, or `box-shadow`. While the user could easily duplicate a simple button component and replace the styling, that might not be an option for complex components
  
####  Code reference
  
  
```svelte
<!-- Button Example 1: Fully encapsulated button -->
<script>
  export let type = "button";
</script>
  
<button {type} {...$$props} on:click>
  <slot/>
</button>
  
<style>
  button {
    background-color: #1890ff;
    border-radius: 2px;
    border: 1px solid #1890ff;
    box-shadow: 0 2px #0000000b;
    box-sizing: border-box;
    color: #ffffff;
    cursor: pointer;
    display: inline-block;
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    padding: 4px 16px;
    position: relative;
    text-align: center;
    text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
    touch-action: manipulation;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    user-select: none;
    vertical-align: middle;
    white-space: nowrap;
  }
  button:focus,
  button:hover {
    background-color: #40a9ff;
    border-color: #40a9ff;
  }
  button:active {
    background-color: #096dd9;
    border-color: #096dd9;
  }
</style>
```  
  
```svelte
<script>
	import Button from "./Button.svelte";
</script>
  
<Button>S1: Button</Button>
<Button on:click={()=> console.log("clicked")}>S1: Button with on:click</Button>
  
<!--
	There is no clear way to express and scope css overrides
<style>
	button { << this fails because button is scoped to App
	  background-color: #f5222d;
	}
	Button { << this doesn't work. The css class Svelte uses for scoping is not exposed
		background-color: #f5222d;
	}
</style>
-->
  
<!-- User is forced to provide overrides using global css -->
<style>
:global(button) {
	background-color: #f5222d !important;
	border-color: #f5222d !important;
}
:global(button:hover, button:focus) {
	background-color: #ff7875 !important;
	border-color: #ff7875 !important;
}
:global(button:active) {
	background-color: #a8071a !important;
	border-color: #a8071a !important;
}
</style>
```
  
  
###  S2: CSS simplification
  
  
####  Questions
  
  
- if design concerns are separated can the css be simplified?
- why does a button have a same color or transparent border?
  
####  Notes
  
  
- further reduction in size to 34 lines of code
- care should be taken to ensure correct heights if a component is expressed using padding + line-height + border
- transparent borders and same color borders appear to be an artifact of abstraction. When dealing with a design system that has bordered, ghost, or other design variations, sizing can change if the size of the border is not consistent between all variants.
- the default border properties of a `button` element is noted in the code reference section
- changes allow for `transition` (`transition-property`) to be targeted more effectively
  
####  Code reference
  
  
```css
/* user agent button properties in chrome */
align-items: flex-start;
appearance: auto;
background-color: buttonface;
border-color: buttonborder;
border-image: initial;
border-style: outset;
border-width: 2px;
box-sizing: border-box;
color: buttontext;
cursor: default;
display: inline-block;
font-family: ;
font-size: ;
font-stretch: ;
font-style: ;
font-variant-caps: ;
font-variant-east-asian: ;
font-variant-ligatures: ;
font-variant-numeric: ;
font-weight: ;
letter-spacing: normal;
line-height: normal;
margin: 0em;
padding: 1px 6px;
text-align: center;
text-indent: 0px;
text-rendering: auto;
text-shadow: none;
text-transform: none;
word-spacing: normal;
writing-mode: horizontal-tb !important;
```
  
```css
/* Removed properties */
button {
  border: 1px solid #1890ff; /* changed to unset */
  display: inline-block; /* duplicates user agent */
  text-align: center; /* duplicates user agent */
  cursor: pointer; /* ux conflict with default button */
  display: inline-block; /* duplicates user agent */
  position: relative; /* no longer needed for this variation */
  text-align: center; /* duplicates user agent */
}
button:focus,
button:hover {
  border-color: #40a9ff; /* no longer needed */
}
button:active {
  border-color: #096dd9; /* no longer needed */
}
```
  
```css
/* Properties that other frameworks define. It's unclear if they are needed */
button {
  touch-action: manipulation; /* Unclear the purpose or impact of this property */
  user-select: none; /* This appears to be the default behavior of a button */
  vertical-align: middle; /* used to resolve vertical alignment issue?? */
  white-space: nowrap; /* It's unclear if this is always desirable */
}
```
  
```svelte
<!-- Button S2: CSS simplification -->
<script>
  export let type = "button";
</script>
  
<button {type} {...$$props} on:click>
  <slot/>
</button>
  
<style>
  button {
    background-color: #1890ff;
    border-radius: 2px;
    border: unset;
    box-shadow: 0 2px #0000000b;
    color: #ffffff;
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    padding: 4px 16px;
    text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
    touch-action: manipulation;
    transition: background-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    user-select: none;
    vertical-align: middle;
    white-space: nowrap;
  }
  button:focus,
  button:hover {
    background-color: #40a9ff;
  }
  button:active {
    background-color: #096dd9;
  }
</style>
```  
  
  
###  S3: Property relationships
  
  
####  Questions
  
  
- what css properties are related?
- what properties would be related to a theme or design system?
- what properties would be impacted by component variations?
  
####  Notes
  
  
- `button` height is often expressed as a combination of border + padding + line height
- a design system often constrains the vertical pacing. ex: height of 32px
- if `button` text (label) was allowed to flow to multiple lines, then `line-height` would impact the vertical pacing of the text
- text that wraps would ideally have a `line-height` that maintains the vertical pacing convention of the design system. Out of context numbers would break the visual conventions. ex: content that is in two columns would potentially have misaligned vertical pacing
- `background-color` and `color` are related
- a common design convention is to have `font-weight` be bolder when light color text is put on a dark color background
- `box-shadow`, `text-shadow`, `transition` are highly stylistic and subjective. Their use is specific to the design atheistic of a given system and not universally applied
- `border` properties are often expressed in context of a design system
  
####  Code reference
  
  
```css
button {
  background-color: #1890ff; /* design system - interactive color or style variation */
  border-radius: 2px; /* design system - unique visual property specific to design system */
  border: unset; /* design system - outlined variations would set border properties */
  box-shadow: 0 2px #0000000b; /* design system - unique visual property specific to design system */
  color: #ffffff; /* design system - typography - color relates to background color */
  font-size: 14px; /* design system - typography */
  font-weight: 400; /* design system - typography - weight changes for some variations */
  line-height: 24px; /* design system - vertical space */
  padding: 4px 16px; /* design system - vertical and horizontal space */
  text-shadow: 0 -1px 0 rgb(0 0 0 / 12%); /* design system - unique visual property specific to design system */
  touch-action: manipulation; /* common */
  transition: background-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1); /* design system - unique visual property specific to design system */
  user-select: none; /* common */
  vertical-align: middle; /* common */
  white-space: nowrap; /* common */
}
button:focus,
button:hover {
  background-color: #40a9ff; /* design system - lighter color  */
}
button:active {
  background-color: #096dd9; /* design system - darker color */
}
```
  
```css
/**
 * Grouping related properties
 */
  
/* Design system level properties */
button {
  border-radius: 2px;
  box-shadow: 0 2px #0000000b;
  font-size: 14px;
  font-weight: 400;
  text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
  transition: background-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1); /* background-color is component specific */
}
  
/* Common component level properties. Has relationship to vertical and horizontal spacing */
button {
  border: unset;
  line-height: 24px; /* Derived from vertical spacing */
  padding: 4px 16px; /* Derived from vertical and horizontal spacing */
  touch-action: manipulation;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
}
  
/* Variation. Additional properties would be included for specific variations. ex: font-weight and border */
button {
  background-color: #1890ff; /* Based on colors in the design system */
  color: #ffffff;
}
button:focus,
button:hover {
  background-color: #40a9ff; /* lighter color  */
}
button:active {
  background-color: #096dd9; /* darker color */
}
```
  
  
###  S4: Expressing colors using hwb()
  
  
####  Questions
  
  
####  Notes
  
  
####  Code reference
  
  
```svelte
<!-- Button S4: Expressing colors using hwb() -->
<script>
  export let type = "button";
</script>
  
<button {type} {...$$props} on:click>
  <slot/>
</button>
  
<style>
  button {
    border: unset;
    touch-action: manipulation;
    user-select: none;
    vertical-align: middle;
    white-space: nowrap;
  }
  button {
    background-color: hwb(210deg 9% 0%);
    border-radius: 2px;
    box-shadow: 0 2px #0000000b;
    color: #ffffff;
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    padding: 4px 16px;
    text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
    transition: background-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  button:focus,
  button:hover {
    background: hwb(210deg 25% 0%);
  }
  button:active {
    background: hwb(210deg 4% 15%);
  }
</style>
```  
  
  
###  S5: Fully encapsulated button with custom properties
  
  
####  Questions
  
  
####  Notes
  
  
####  Code reference
  
  
```svelte
<!-- Button S5: Fully encapsulated button with custom properties -->
<script>
  export let type = "button";
</script>
  
<button {type} {...$$props} on:click>
  <slot/>
</button>
  
<style>
  button {
    --background-color-active: hwb(210deg 4% 15%);
    --background-color-focus: hwb(210deg 25% 0%);
    --background-color-hover: hwb(210deg 25% 0%);
    --background-color: hwb(210deg 9% 0%);
    --color: #ffffff;
  }
  button {
    background-color: var(--background-color);
    border-radius: 2px;
    border: unset;
    box-shadow: 0 2px #0000000b;
    color: var(--color);
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    padding: 4px 16px;
    text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
    touch-action: manipulation;
    transition: background-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    user-select: none;
    vertical-align: middle;
    white-space: nowrap;
  }
  button:active {
    background-color: var(--background-active);
  }
  button:focus {
    background-color: var(--background-color-focus);
  }
  button:hover {
    background-color: var(--background-color-focus);
  }
</style>
```  
  
  
  