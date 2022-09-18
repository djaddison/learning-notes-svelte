### S3: Property relationships

#### Questions

- broadly, what css properties are related?
- what is the relationship between css properties and design system?
- what properties would be related to a theme or design system?
- what properties would be impacted by component variations?

#### Notes

- `button` height is often expressed as a combination of border + padding + line height
- a design system often constrains the vertical pacing. ex: height of 32px
- if `button` text (label) was allowed to flow to multiple lines, then `line-height` would impact the vertical pacing of the text
- text that wraps would ideally have a `line-height` that maintains the vertical pacing convention of the design system. Out of context numbers would break the visual conventions. Ex: content that is in two side-by-side columns would potentially have misaligned vertical pacing of text
- text needs to be legible and accessible, so the relative value of `background-color` and `color` forms an important relationship between the two properties
- a common design convention is to have `font-weight` be bolder when light color text is put on a dark color background
- `box-shadow`, `text-shadow`, `transition` are highly stylistic and subjective. Their use is specific to the design atheistic of a given system and not universally applied
- `border` properties are often expressed in context of a design system

#### Future exploration

- are there in editor accessibility tools that will flag
  - when the computed contrast of `background-color` and `color` fails to meet accessibly standards?
  - when the computed `font-size` fails to meet accessibly standards?
  - warn when a unit is used that doesn't match the visual pacing of the design system? A warning is often more appropriate, since there are many instances where a designer will want to break out of the constraints of a grid system. For example, to combat optical illusions that make exact measurements appear incorrect
- what convention should be used to capture the intention when a designer wants to override a visual pacing convention of a design system?
  - when another person reads the code, how does that person know if this is an intentional override or a typo?
  - are there linting rules that might cover this?

#### Code reference

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
