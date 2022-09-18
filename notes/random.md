## Random ideas about css processing
- are there tools that can pre-compute and compile the css?
- what if css were to be processed in multi stages?
  - src would be described in simple terms
  - first pass would examine all the css across an application or component system
    ```css
    button {
      background-color: #aabbcc; /* this will be removed since the value is overwritten later in the cascade */
    }
    button {
      background-color: var(--color-primary);
      border-radius: var(--border-radius);
      border: unset;
      box-shadow: var(--box-shadow);
      color: var(--color-text-on-primary-bg);
      font-size: var(--font-size);
    }
    input {
      background-color: var(--color-primary);
      border-radius: var(--border-radius);
      border: 1px solid var(--color-primary);
      box-shadow: var(--box-shadow);
      color: var(--color-text-on-primary-bg);
      font-size: var(--font-size);
    }
    ```
  - second pass would extract the common properties and assign them to a class
    ```css
    /*
      The following class identifiers were manually made
      A compiler would likely use hashed identifiers and minimize the string length
    */
    .bc {
      background-color: var(--color-primary);
    }
    .br {
      border-radius: var(--border-radius);
    }
    .bu {
      border: unset;
    }
    .b1px {
      border: 1px solid var(--color-primary);
    }
    .bxs {
      box-shadow: var(--box-shadow);
    }
    .c {
      color: var(--color-text-on-primary-bg);
    }
    .fs {
      font-size: var(--font-size);
    }
    ```
  - third pass would reassign classes to the compiled markup
    ```html
    <button class="bc br bu bxs c fs">...</button>
    <input class="bc br b1x bxs c fs">...</button>
    ```
