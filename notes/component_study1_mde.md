### S1: Fully encapsulated button

#### Questions

- what does a component look like if abstractions were unwound and it was expressed in simple terms?
- what if CSS abstractions were greatly reduced?
- what if a single component represented a single visual instance?

#### Notes

- the resulting component fits on a single screen!
- simple expression of a button in *42* lines of code
- removing a significant amount of css abstractions makes it easier to understand, copy, or derive work from this component
- the amount of code reduction was surprising. *1290* down to *42*! This is a significant reduction and would have a dramatic positive impact on code maintainability. Even with the additional code needed for adding design variations, the savings would still be dramatic
- when the css is stripped to its simplest form, it becomes more noticeable when properties aren't needed
- this sample button reimplements an `antd` primary button
- while the `antd` button implements additional features, with approximately *1290* of code and broad/mixed concerns, it requires a developer to have a deep understanding of the code before making changes
- only implements `on:click` event forwarding. Ideally, the component user would be able to bind to any `button` events
- currently no means to represent all event bindings without explicitly listing all of events
- `on:click` event listener is added even if consumer didn't request binding
- visual design intention is harder to understand since properties are expressed with hard coded values. For example, the relationship to a design system is not conveyed in the code. There are no local code cues that hint the intention to the developer. They needs additional external context to know that `background-color: #1890ff;` refers to a design system color value
- reuse is awkward for component user since visual design is baked into the component. ex: It would be difficult to add or remove visual properties like `text-shadow`, `border-radius`, `transition`, or `box-shadow`. While the user could easily duplicate a simple button component and replace the styling, that might not be an option for complex components

#### Future exploration

- it's considered bad practice to copy code as a form of deriving work, so how would derivative components be created?
- is there a simple way to extend a base component in Svelte? Ideally there would be a way to express a component as a composition of `<ButtonS1>` with additional css overrides
- can event forwarding be expressed as a compile time binding?
- can visual effects be composed in a different way? Visual effects are often tied to visual characteristics of a design system. Ideally, the components would be expressed in a way that would allow for adoption by a variety of design systems that have different visual needs. For example: `antd` wave, `material` ripple. The way components in frameworks such as `antd`, and `material` are expressed, the visual effects are coupled tightly to the components and css
- can the css be simplified now that the css abstractions have been unwound and removed? **(Study 2)**

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
