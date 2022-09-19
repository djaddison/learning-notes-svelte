##  Component design
  
  
- allow for simple expression of visuals
- prioritize composition of components
- prioritize web standards
- it should be easy for a developer with little knowledge of the component library to create a new component or derive from an existing one
- prioritize simplification and readability
- reexamine custom/native web components. On first learning they appear overly complicated and the code is verbose
  
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
- what if CSS abstractions were greatly reduced?
- what if a single component represented a single visual instance?
  
####  Notes
  
  
- the resulting code for the sample component is *42* lines of code and fits on a single screen!
- removing a significant amount of css abstractions makes it easier to understand, copy, or derive work from this component
- the amount of code reduction is surprising. *1290* down to *42*! This is a significant reduction and would have a dramatic positive impact on code maintainability. Even with the additional code needed for adding design variations, the savings will still be dramatic
- when the css is stripped to its simplest form, it becomes more noticeable when properties aren't needed
- the sample button, in the code reference section, reimplements an `antd` primary button
- while the `antd` button implements additional features, with approximately *1290* of code and broad/mixed concerns, it requires a developer to have a deep understanding of the code before making changes
- in the sample button, the visual design intention is hard to understand since properties are expressed as hard coded values. The relationship to a design system is not conveyed in the code. There are no local code cues that convey the intention to the developer. For example, a developer needs additional external context to know that `background-color: #1890ff;` refers to a design system color value. It's also know that these hardcoded values are easy to mistype and keep synchronized across files
- it was generally observed across all referenced component systems that extending or reuse is awkward for a component since visual design assumptions are baked into the component. ex: If a component is intended to be used across multiple design systems, it would be difficult to add or remove visual properties like `text-shadow`, `border-radius`, `transition`, or `box-shadow`. While the user could easily duplicate a simple button component and replace the styling, that might not be an option for complex components. Additionally, any forked components have a series of other SDLC related complexities
- the sample component only implements `on:click` event forwarding. Ideally, the component user would be able to bind to any `button` events
- there are currently no means to represent all event bindings without explicitly listing all of events
- during runtime, `on:click` event listener is added even if consumer didn't request binding
  
  
####  Future exploration
  
  
- it's considered bad practice to copy code as a form of deriving work, so how would derivative components be created?
- is there a simple way to extend a base component in Svelte? Ideally there would be a way to express a component as a composition of `<ButtonS1>` with additional css overrides
- can event forwarding be expressed as a compile time option?
- can visual effects be composed in a different way? Visual effects are often tied to visual characteristics of a design system. Ideally, the components would be expressed in a way that would allow for adoption by a variety of design systems that have different visual needs. For example: `antd` wave, `material` ripple. The way components in frameworks such as `antd`, and `material` are expressed, the visual effects are coupled tightly to the components and css
- can the css be simplified now that the css abstractions have been unwound and removed? **(Study 2)**
- what is the relationship between css properties and design system? **(Study 3)**
- what approaches can be taken to describe the color relationship between a base color and interactive states? **(Study 4)**
- *The previous questions can also be framed of as:* what approaches can be taken to scope css when there needs to be a mix of local, local override, and global state?
  
####  Code reference
  
  
```html
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
  button:active {
    background-color: #096dd9;
    border-color: #096dd9;
  }
  button:focus,
  button:hover {
    background-color: #40a9ff;
    border-color: #40a9ff;
  }
</style>
```  
  
```html
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
  
  
- can the css be simplified now that the css abstractions have been unwound and removed?
- why does a button have borders with the same color as `background-color` or transparent?
  
####  Notes
  
  
- removing duplicate or conflicting properties further reduced the amount of component code to *34* lines of code
- care should be taken to ensure correct heights if a component is expressed using padding + line-height + border
- the sample component could be improved by handling the case where the height collapses when child text is omitted. This could be solved by adding a `height`, `min-height`, or providing default slot content. Addressing this concern is outside of the scope of this exercise, but would need to be considered before fully productionizing a button component
- the default border properties of a `button` element is noted in the code reference section
- changing the `border` property to `unset`
  - allows for `transition` property to have a more targeted rule (`all` to `background-color`)
  - simplifies the colors in `focus`, `hover`, and `active` pseudo-classes
- the most plausible answer that could be determined for the second question is that transparent or borders with the same color as `background-color` are related to `button` having a default user agent `border-width` and might be related to historical aspects of browser compatibility. It appears this has been in practice since bootstrap era css frameworks. This choice likely predates the `unset` value. Additionally, when dealing with a design system that has bordered, ghost, or other design variations, setting the border to transparent or the same color as the background might work around sizing issues where the size of the border impacts the dimensions of the button
  
####  Future exploration
  
  
- (to be continued...) why does a button have borders with the same color as `background-color` or transparent?
- in code editor dx
  - is there a mechanism that would flag css properties:values that are duplicating the user agent?
  - as browser standards improve, it would be a great user experience to have a mechanism that flags properties that may no longer be needed so they can be removed
  - it would also be useful to have something similar to in-browser dev tools "computed css" directly
- is there a way to flag a css property as "don't know what's it's used for"? This might be useful for developers that are porting components but aren't certain under what condition the property is used. It could be something that was for legacy browser support and is no longer needed
- what would be a clear way to communicate, in code, css properties that were added for the sake of browser compatibility? Could there be a way to express the relationship of the property to the browser that needs the fix? This would be useful for the long-term maintenance of a component library. Currently, most of that knowledge is gained through experiencing browser compatibility issues and is often retained by a single developer who authored or fixed the component
- why do some css frameworks set `cursor: pointer;`? Presumably changing the value away from the user agent value would have accessibility or usability implications.
- does changing the cursor value confuse users as it moves them away from learnt behavior and expected visual cues?
- what do users expect the cursor for a button to look like?
- what does a user agent property without value mean? Ex: `font-size: ;`
  
####  Code reference
  
  
```css
/* user agent button properties in chrome */
{
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
}
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
  
```html
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
  button:active {
    background-color: #096dd9;
  }
  button:focus,
  button:hover {
    background-color: #40a9ff;
  }
</style>
```  
  
  
###  S3: Property relationships
  
  
####  Questions
  
  
- broadly, what css properties are related?
- what is the relationship between css properties and design system?
- what properties would be related to a theme or design system?
- what properties would be impacted by component variations?
  
####  Notes
  
  
- `button` height is often expressed as a combination of border + padding + line height
- a design system often constrains the vertical pacing. ex: height of 32px
- if `white-space: nowrap;` is removed, allowing text (label) to span multiple lines, text that wraps would ideally have a `line-height` that maintains the vertical pacing convention of the design system. Out of context numbers would break the visual conventions. Ex: content that is in two side-by-side columns would potentially have misaligned vertical pacing of text
- text needs to be legible and accessible, so the relative value of `background-color` and `color` forms an important relationship between the two properties
- a common design convention is to have `font-weight` be bolder when light color text is put on a dark color background
- `box-shadow`, `text-shadow`, `transition` are highly stylistic and subjective. Their use is specific to the design atheistic of a given system and not universally applied
- `border` properties are often expressed in context of a design system
  
####  Future exploration
  
  
- are there in editor accessibility tools that will flag
  - when the computed contrast of `background-color` and `color` fails to meet accessibly standards?
  - when the computed `font-size` fails to meet accessibly standards?
  - warn when a unit is used that doesn't match the visual pacing of the design system? A warning is often more appropriate, since there are many instances where a designer will want to break out of the constraints of a grid system. For example, to combat optical illusions that make exact measurements appear incorrect
- what convention should be used to capture the intention when a designer wants to override a visual pacing convention of a design system?
  - when another person reads the code, how does that person know if this is an intentional override or a typo?
  - are there linting rules that might cover this?
- are there definable units of measurement? Ex: 0.5su (spacial unit). Is this `rem`?
  
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
button:active {
  background-color: #096dd9; /* design system - darker color */
}
button:focus,
button:hover {
  background-color: #40a9ff; /* design system - lighter color  */
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
button:active {
  background-color: #096dd9; /* darker color */
}
button:focus,
button:hover {
  background-color: #40a9ff; /* lighter color  */
}
```
  
  
###  S4: Expressing colors using hwb()
  
  
####  Questions
  
  
- what approaches can be taken to describe the color relationship between a base color and interactive states?
  
####  Notes
  
  
- https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hwb
- `hwb()` is hue, whiteness, and blackness
- `hwb()` appears to be a simple was to express lighter and darker variations of colors
- `lch()` or `lab()`
  - would improve the perceptive feel, quality, or "sameness" of colors
  - browser support is experimental
  
####  Future exploration
  
  
- can `lch()` or `lab()` support be added through preprocessing?
- do `hwb()` gradations or color variations feel perceptively similar?
- https://www.smashingmagazine.com/2022/06/simplify-color-palette-css-color-mix/
  
####  Code reference
  
  
```css
button {
  background-color: hwb(210deg 9% 0%); /* base */
}
button:active {
  background-color: hwb(210deg 4% 15%); /* dark */
}
button:focus,
button:hover {
  background-color: hwb(210deg 25% 0%); /* light */
}
```
  
```html
<!-- Button S4: Expressing colors using hwb() -->
<script>
  export let type = "button";
</script>
  
<button {type} {...$$props} on:click>
  <slot/>
</button>
  
<style>
  button {
    background-color: hwb(210deg 9% 0%);
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
  button:active {
    background: hwb(210deg 4% 15%);
  }
  button:focus,
  button:hover {
    background: hwb(210deg 25% 0%);
  }
</style>
```  
  
  
###  S5: Fully encapsulated button with custom properties
  
  
####  Questions
  
  
####  Notes
  
  
####  Code reference
  
  
```html
<!-- Button S5: Fully encapsulated button with custom properties -->
<script>
  export let type = "button";
</script>
  
<button {type} {...$$props} on:click>
  <slot/>
</button>
  
<style>
  button {
    background-color: var(--background-color, hwb(210deg 9% 0%));
    border-radius: 2px;
    border: unset;
    box-shadow: 0 2px #0000000b;
    color: var(--color, #ffffff);
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
    background-color: var(--background-color-active, hwb(210deg 4% 15%));
  }
  button:focus {
    background-color: var(--background-color-focus, hwb(210deg 25% 0%));
  }
  button:hover {
    background-color: var(--background-color-hover, hwb(210deg 25% 0%));
  }
</style>
```  
  
  
###  S6: Methods of breaking encapsulation to apply global styling
  
  
####  Questions
  
  
####  Notes
  
  
####  Code reference
  
  
```css
:root {
  /* Typography */
  --font-family: "Inter", sans-serif;
  --font-size: 14px;
  --line-height: 24px;
  
  --font-weight-thin: 100;
  --font-weight-extra-light: 200;
  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semi-bold: 600;
  --font-weight-bold: 700;
  --font-weight-extra-bold: 800;
  --font-weight-black: 900;
  
  /* Colors */
  --color-primary: hwb(210deg 9% 0%);
  --color-primary-active: hwb(210deg 4% 15%);
  --color-primary-focus: hwb(210deg 25% 0%);
  --color-primary-hover: hwb(210deg 25% 0%);
  --color-text-on-primary-bg: #ffffff;
  
  /* Spatial System */
  --spatial-unit-half: 4px;
  --spatial-unit: 8px;
  --spatial-unit-2x: 16px;
  --spatial-unit-4x: 32px;
  
  /* Shapes & Lines */
  --border-radius: 2px;
  --border-width: 1px;
  
  /* Visual Effects */
  --box-shadow: 0 2px #0000000b;
  --text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
  --transition: 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}
```
  
```html
<!-- Button S6a: Using global custom properties -->
<script>
  export let type = "button";
</script>
  
<button {type} {...$$props} on:click>
  <slot/>
</button>
  
<style>
  button {
    background-color: var(--color-primary);
    border-radius: var(--border-radius);
    border: unset;
    box-shadow: var(--box-shadow);
    color: var(--color-text-on-primary-bg);
    font-size: var(--font-size);
    font-weight: var(--font-weight-regular);
    line-height: var(--line-height);
    padding: var(--spatial-unit-half) var(--spatial-unit-2x);
    text-shadow: var(--text-shadow);
    touch-action: manipulation;
    transition: background-color var(--transition);
    user-select: none;
    vertical-align: middle;
    white-space: nowrap;
  }
  button:active {
    background-color: var(--color-primary-active);
  }
  button:focus {
    background-color: var(--color-primary-focus);
  }
  button:hover {
    background-color: var(--color-primary-hover);
  }
</style>
```  
  
  
  