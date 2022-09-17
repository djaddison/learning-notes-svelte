### S3: Property relationships

#### Questions

- what css properties are related?
- what properties would be related to a theme or design system?
- what properties would be impacted by component variations?

#### Notes

- `button` height is often expressed as a combination of border + padding + line height
- a design system often constrains the vertical pacing. ex: height of 32px
- if `button` text (label) was allowed to flow to multiple lines, then `line-height` would impact the vertical pacing of the text
- text that wraps would ideally have a `line-height` that maintains the vertical pacing convention of the design system. Out of context numbers would break the visual conventions. ex: content that is in two columns would potentially have misaligned vertical pacing
- `background-color` and `color` are related
- a common design convention is to have `font-weight` be bolder when light color text is put on a dark color background
- `box-shadow`, `text-shadow`, `transition` are highly stylistic and subjective. Their use is specific to the design atheistic of a given system and not universally applied
- `border` properties are often expressed in context of a design system

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