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