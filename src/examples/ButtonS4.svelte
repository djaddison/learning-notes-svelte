<!-- Button S4: Expressing colors using hwb() -->
<script>
  export let type = "button";
</script>

<button {type} {...$$props} on:click>
  <slot/>
</button>

<style>
  button {
    border: unset;
    touch-action: manipulation;
    user-select: none;
    vertical-align: middle;
    white-space: nowrap;
  }
  button {
    background-color: hwb(210deg 9% 0%);
    border-radius: 2px;
    box-shadow: 0 2px #0000000b;
    color: #ffffff;
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    padding: 4px 16px;
    text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
    transition: background-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  button:focus,
  button:hover {
    background: hwb(210deg 25% 0%);
  }
  button:active {
    background: hwb(210deg 4% 15%);
  }
</style>