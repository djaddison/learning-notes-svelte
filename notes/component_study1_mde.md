### S1: Fully encapsulated button

#### Questions

- what does a component look like if abstractions were unwound and it was expressed in simple terms?
- what if CSS optimizations were greatly reduced?
- what if a single component represented a single visual instance?

#### Notes

- it is easy for a developer to understand, copy, or derive work from this component
- this sample button reimplements an `antd` primary button
- simple expression of a button in under 50 lines of code
- while the `antd` button implements additional features, with approximately 1290 of code and broad/mixed concerns, it requires a developer to have a deep understanding of the code before making changes
- only implements `on:click` event forwarding. Ideally, the component user would be able to bind to any `button` events
- currently no means to represent all event bindings without explicitly listing all of events
- `on:click` event listener is added even if consumer didn't request binding
- visual design intention is harder to understand
- reuse is awkward for component user since visual design is baked into the component. ex: It would be difficult to add or remove visual properties like `text-shadow`, `border-radius`, `transition`, or `box-shadow`. While the user could easily duplicate a simple button component and replace the styling, that might not be an option for complex components

#### Code reference

@import "../src/examples/ButtonS1.svelte"

```svelte
<script>
	import Button from "./Button.svelte";
</script>

<Button>S1: Button</Button>
<Button on:click={()=> console.log("clicked")}>S1: Button with on:click</Button>

<!--
	There is no clear way to express and scope css overrides
<style>
	button { << this fails because button is scoped to App
	  background-color: #f5222d;
	}
	Button { << this doesn't work. The css class Svelte uses for scoping is not exposed
		background-color: #f5222d;
	}
</style>
-->

<!-- User is forced to provide overrides using global css -->
<style>
:global(button) {
	background-color: #f5222d !important;
	border-color: #f5222d !important;
}
:global(button:hover, button:focus) {
	background-color: #ff7875 !important;
	border-color: #ff7875 !important;
}
:global(button:active) {
	background-color: #a8071a !important;
	border-color: #a8071a !important;
}
</style>
```
