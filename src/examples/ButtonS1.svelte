<!-- Button Example 1: Fully encapsulated button -->
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
    border: 1px solid #1890ff;
    box-shadow: 0 2px #0000000b;
    box-sizing: border-box;
    color: #ffffff;
    cursor: pointer;
    display: inline-block;
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    padding: 4px 16px;
    position: relative;
    text-align: center;
    text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
    touch-action: manipulation;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    user-select: none;
    vertical-align: middle;
    white-space: nowrap;
  }
  button:focus,
  button:hover {
    background-color: #40a9ff;
    border-color: #40a9ff;
  }
  button:active {
    background-color: #096dd9;
    border-color: #096dd9;
  }
</style>