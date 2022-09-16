## Trends
  - New generation of frameworks are leveraging compilers
    - improve developer experience
    - ergonomic improvements. ex: being able to use `class=""` instead of `className` in JSX
    - reduce amount of code written
    - provide significant performance improvements
    - reduce runtime complexity
    - makes targeting different patterns easier. ex: client-side, client-side with hydration, SSG, and ssr
  - solid, svelte,

## Highlights
  - Web standards
  - Attributes work exactly like their HTML counterparts. Developers can use properties such as `class`, `aria-label`
  ```html
    <div class="Viewport">
      <Input placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
    </div>

    <input type="text" class="form-control" {...$$restProps}>

    <!--
      Read more about properties
      https://svelte.dev/docs#template-syntax-attributes-and-props
    -->
  ```

  - The abstractions are well thought out
  - Doesn't take a developer too far away from vanilla javascript and web standards
  - Skills are transferable

## Simple reactive programming
  - Svelte's reactivity can be used to keep the DOM and variables in sync
  - Svelte can run arbitrary statements reactively

## Defaults to good habits and practices
  - scoped css
  - :global() css
  - Out-of-the-box warnings
    - ex: A11y: <img> element should have an alt attribute
  - data flow in Svelte is top down

## Improved workflow and development patterns
  - Attributes work exactly like their HTML counterparts.
  - Allows multiple root elements in a single component
  - Officially supported: Svelte language support for VS Code
  - Compared with some frameworks, developers do not need to avoid inline event handlers, particularly inside loops. The compiler frees the developer from the concerns of often-misunderstood performance optimizations
  - DOM event handlers modifiers are simple to learn, can be used to improve code legibility, and reduce the code complexity of event handler a developer has to write
  - bind:value directive provides a shorthand for
    - `on:input` event handler
    - that sets the value of `name` to `event.target.value`
    - normalizes the differences between form input types
  - With bind:value, Svelte takes care coercing numeric inputs. https://svelte.dev/tutorial/numeric-inputs
  ```
  <input type=number bind:value={a} min=0 max=10>
  <input type=range bind:value={a} min=0 max=10>
  ```
  - `<input type=checkbox bind:checked={varname}>`
  - https://svelte.dev/tutorial/component-bindings
  - `<div class:big={big}>` >> `<div class:big>`



## Props
```html
<script>
	export let name;
	export let version;
	export let speed;
	export let website;
</script>

<p>
	The <code>{name}</code> package is {speed} fast.
	Download version {version} from <a href="https://www.npmjs.com/package/{name}">npm</a>
	and <a href={website}>learn more here</a>
</p>
```

## Ability to spread props
```html
<script>
	import Info from './Info.svelte';

	const pkg = {
		name: 'svelte',
		version: 3,
		speed: 'blazing',
		website: 'https://svelte.dev'
	};
</script>

<Info {...pkg}/>
```

```html
<script>
	let cats = [
		{ id: 'J---aiyznGQ', name: 'Keyboard Cat' },
		{ id: 'z_AbfPXTKms', name: 'Maru' },
		{ id: 'OUtn3pvWmpg', name: 'Henri The Existential Cat' }
	];
</script>

<h1>The Famous Cats of YouTube</h1>

<ul>
	{#each cats as { id, name }, i}
		<li><a target="_blank" href="https://www.youtube.com/watch?v={id}">
			{i + 1}: {name}
		</a></li>
	{/each}
</ul>
```

```html
{#each cats as cat}
{#each cats as { id, name }}
{#each cats as { id, name }, i}
```

## Specify a unique identifier (or "key") for the each block
```html
{#each things as thing (thing.id)}
```

## Interesting snippet
`$: view = pin ? pin.replace(/\d(?!$)/g, '•') : 'enter your pin';`

## Resources
- SvelteScaling - Does Svelte Scale? - https://svelte-scaling.acmion.com/
- Will it Scale? - Finding Svelte's Inflection Point - https://github.com/halfnelson/svelte-it-will-scale
- JavaScript Frameworks, Performance Comparison 2020 - https://javascript.plainenglish.io/javascript-frameworks-performance-comparison-2020-cd881ac21fce
- https://www.youtube.com/watch?v=s6a1pbTVcUs
- https://www.youtube.com/watch?v=dB_YjuAMH3o
