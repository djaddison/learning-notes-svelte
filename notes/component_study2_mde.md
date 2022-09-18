### S2: CSS simplification

#### Questions

- can the css be simplified now that the css abstractions have been unwound and removed?
- why does a button have borders with the same color as `background-color` or transparent?

#### Notes

- further reduction in size to 34 lines of code
- care should be taken to ensure correct heights if a component is expressed using padding + line-height + border
- the default border properties of a `button` element is noted in the code reference section
- changes allow for `transition` (`transition-property`) to be targeted more effectively
- the most plausible answer I could determine for the second question is that transparent or borders with the same color as `background-color` are related to `button` having a default user agent `border-width` and historical browser compatibility. It appears this has been in practice since bootstrap era css frameworks. This choice likely predates the `unset` value. Additionally, when dealing with a design system that has bordered, ghost, or other design variations, setting the border to transparent or the same color as the background might work around sizing issues where the size of the border impacts the dimensions of the button

#### Future exploration

- (to be continued...) why does a button have borders with the same color as `background-color` or transparent?
- in code editor dx
  - is there a mechanism that would flag css properties:values that are duplicating the user agent?
  - it would be a great user experience to have a mechanism to flag properties so they can be removed
  - it would also be useful to have something similar to in-browser dev tools "computed css" directly
- is there a way to flag a css property as "don't know what's it's used for"? This might be useful for developers that are porting components but aren't certain under what condition the property is used. It could be something that was for legacy browser support and is no longer needed
- what would be a clear way to communicate, in code, css properties that were added for the sake of browser compatibility? Could there be a way to express the relationship of the property to the browser that needs the fix? This would be useful for the long-term maintenance of a component library. Currently, most of that knowledge is gained through experiencing browser compatibility issues and is often retained by a single developer who authored or fixed the component
- as browser standards improve, it would be useful to have a tool that flags properties that may no longer be needed

#### Code reference

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

@import "../src/examples/ButtonS2.svelte"
