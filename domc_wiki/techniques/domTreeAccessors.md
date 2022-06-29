---
title: DOM Tree Accessors
parent: Techniques
nav_order: 2
---

{% include toggle_color.html %}

# DOM Clobbering Wiki

Stable
{: .label .label-green }


## DOM Tree Accessors

The markups of this group can shadow `document` properties because browsers comply with the [DOM Tree Accessors](https://html.spec.whatwg.org/multipage/dom.html#dom-tree-accessors) specification rule, which instructs browsers how to retrieve properties of the `document` object (e.g., DOM elements). These markups use a single named HTML element to clobber a property `x` of the document.


| Name               	| Rule                                                                     	| Target     	| Target Type     	| Reference Type 	| Tag                             	| Attribute         	| Total 	|
|--------------------	|--------------------------------------------------------------------------	|------------	|-----------------	|----------------	|---------------------------------	|-------------------	|-------	|
| DOM Tree Accessors 	| [R2](https://html.spec.whatwg.org/multipage/dom.html#dom-tree-accessors) 	| document.x 	| Object Property 	| WindowProxy    	| iframe                          	| name=x            	| 1     	|
|                    	|                                                                          	| document.x 	| Object Property 	| HTMLElement    	| form, embed, object, img, image 	| name=x            	| 5     	|
|                    	|                                                                          	| document.x 	| Object Property 	| HTMLELement    	| object                          	| id=x              	| 1     	|
|                    	|                                                                          	| document.x 	| Object Property 	| HTMLElement    	| img, image                      	| id=x (& name=any) 	| 2     	|





**Note.** Unlike the `Window` object, we cannot use `document.x` and `x` interchangeably.


