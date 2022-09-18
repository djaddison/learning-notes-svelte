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