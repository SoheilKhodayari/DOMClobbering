---
title: Form Parent-Child
parent: Techniques
nav_order: 3
---

{% include toggle_color.html %}

# DOM Clobbering Wiki

Stable
{: .label .label-green }


## Form Parent-Child Elements

These markups clobber properties `X.y` where `X` can be any of `x`, window.x, and document.x. First, they exploit either the rules [R1](windowNamedAccess.md) or [R2](domTreeAccessors.md) to clobber the base object `X`. 

Then, they use the [Form Element](https://html.spec.whatwg.org/multipage/forms.html#the-form-element) specification rule to clobber property `y` of object `X`, i.e., the form elements' parent-child relationships where the browser creates a property of the second element for the first element's accessor variable. 

DOM Clobbering code that rely on this technique comprise a `form` tag and a child (e.g., an `input` whose named attributes are set to variables `x` and `y`, respectively. 


| Name              	| Rule                                                                                                                                                                                                        	| Target                        	| Target Type               	| Reference Type 	| Tag 1 	| Tag 2                                              	| Attribute 1      	| Attribute 2      	| Relation 	| Total 	|
|-------------------	|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|-------------------------------	|---------------------------	|----------------	|-------	|----------------------------------------------------	|------------------	|------------------	|----------	|-------	|
| Form Parent-Child 	| [R3](https://html.spec.whatwg.org/multipage/forms.html#the-form-element) + [R1](windowNamedAccess.md), [R3](https://html.spec.whatwg.org/multipage/forms.html#the-form-element) + [R2](domTreeAccessors.md) 	| x.y, window.x.y, document.x.y 	| Object Property, Variable 	| HTMLElement    	| form  	| object, img, image                                 	| id=x \|\| name=x 	| id=y \|\| name=y 	| child    	| 12    	|
|                   	|                                                                                                                                                                                                             	| x.y, window.x.y, document.x.y 	| Object Property, Variable 	| HTMLElement    	| form  	| button, fieldset, input, output, select, textarea. 	| id=x \|\| name=x 	| id=y \|\| name=y 	| child    	| 24    	|

