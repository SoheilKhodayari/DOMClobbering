---
title: Named Access Window
parent: Techniques
nav_order: 1
---

{% include toggle_color.html %}

# DOM Clobbering Wiki

Stable
{: .label .label-green }


## Named Access on the Window Object

These group of markups leverage a single HTML element whose `id` or `name`is set to a target variable `x`, clobbering `window.x` due to browsers’ compliance with the [Named Access on the Window Object](https://html.spec.whatwg.org/multipage/window-object.html#named-access-on-the-window-object) rule.



| Name                	| Rule                                                                                              	| Target      	| Target Type               	| Reference Type 	| Tag                             	| Attribute 	| Total 	|
|---------------------	|---------------------------------------------------------------------------------------------------	|-------------	|---------------------------	|----------------	|---------------------------------	|-----------	|-------	|
| Named Access Window 	| [R1](https://html.spec.whatwg.org/multipage/window-object.html#named-access-on-the-window-object) 	| window.x, x 	| Object Property, Variable 	| WindowProxy    	| iframe                          	| name=x    	| 1     	|
|                     	|                                                                                                   	| window.x, x 	| Object Property, Variable 	| HTMLElement    	| form, embed, object, img, image 	| name=x    	| 5     	|
|                     	|                                                                                                   	| window.x, x 	| Object Property, Variable 	| HTMLELement    	| Any                             	| id=x      	| 141   	|


**Note.** We can use `window.x` and `x` interchangeably because all global variables belong to the global `Window` object by default.



**Cause.** The [Window](https://html.spec.whatwg.org/multipage/window-object.html#window) object supports [named properties](https://webidl.spec.whatwg.org/#dfn-support-named-properties). This means that it is possible to reference DOM elements through `Window` with their named property, i.e., `id` or `name` attribute value in the DOM tree.

**Example.** consider the following `anchor` node:

```html
<a id="x" href="https://example.com">
```

The `Window` object supporting named properties means it is possible to reference this element with `window.x` where `x` is the id of the `anchor` tag. 