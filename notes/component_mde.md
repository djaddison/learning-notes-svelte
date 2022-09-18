## Component design

- allow for simple expression of visuals
- prioritize composition of components
- prioritize web standards
- it should be easy for a developer with little knowledge of the component library to create a new component or derive from an existing one
- prioritize simplification and readability
- reexamine custom/native web components. On first learning they appear overly complicated and the code is verbose

## Question / Theory / Angle

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

## Notes & Constraints

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

@import "./component_study_button_mde.md"
