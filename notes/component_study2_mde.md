### S2: CSS simplification

#### Questions

- if design concerns are separated can the css be simplified?
- why does a button have a same color or transparent border?

#### Notes

- further reduction in size to 34 lines of code
- care should be taken to ensure correct heights if a component is expressed using padding + line-height + border
- transparent borders and same color borders appear to be an artifact of abstraction. When dealing with a design system that has bordered, ghost, or other design variations, sizing can change if the size of the border is not consistent between all variants.
- the default border properties of a `button` element is noted in the code reference section
- changes allow for `transition` (`transition-property`) to be targeted more effectively

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
