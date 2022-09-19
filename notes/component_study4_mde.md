### S4: Expressing colors using hwb()

#### Questions

- what approaches can be taken to describe the color relationship between a base color and interactive states?

#### Notes

- https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hwb
- `hwb()` is hue, whiteness, and blackness
- `hwb()` appears to be a simple was to express lighter and darker variations of colors
- `lch()` or `lab()`
  - would improve the perceptive feel, quality, or "sameness" of colors
  - browser support is experimental

#### Future exploration

- can `lch()` or `lab()` support be added through preprocessing?
- do `hwb()` gradations or color variations feel perceptively similar?
- https://www.smashingmagazine.com/2022/06/simplify-color-palette-css-color-mix/

#### Code reference

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

@import "../src/examples/ButtonS4.svelte" {as="html"}
