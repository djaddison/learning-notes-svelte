<!-- Button S2: CSS simplification -->
<script>
  export let type = "button";
</script>

<button {type} {...$$props} on:click>
  <slot/>
</button>

<style>
  button {
    background-color: #1890ff;
    border-radius: 2px;
    border: unset;
    box-shadow: 0 2px #0000000b;
    color: #ffffff;
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
    background-color: #096dd9;
  }
  button:focus,
  button:hover {
    background-color: #40a9ff;
  }
</style>