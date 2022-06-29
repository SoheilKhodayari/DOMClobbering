---
title: HTMLCollections
parent: Techniques
nav_order: 5
---

{% include toggle_color.html %}

# DOM Clobbering Wiki

Stable
{: .label .label-green }


## HTMLCollections

When two or more elements have the same `id` or `name` in the DOM tree, browsers create an array-like object called [HTMLCollection](https://portswigger.net/research/dom-clobbering-strikes-back), which contains all elements with the same id. 

Elements inside HTMLCollections can accessed by (i) their index in the collection and (ii) their `id` and `name`.
Attackers can exploit feature (i) to clobber arrays and loop elements (e.g., `x` and `x[i]`), where the length of the array can be controlled by the number of elements with the same id in the payload. Also, they can leverage feature (ii) to create payloads that clobber properties like `x.x` and `x.y`, where `x` references the collection, `x.x` points to the first element in the collection with id `x`, and finally `x.y` refers to the first element with id `x` and name `y` (see, e.g., [here](https://research.securitum.com/xss-in-amp4email-dom-clobbering/))



| Name            	| Rule                                                                                                                                                                              	| Target          	| Target Type               	| Reference Type 	| Tag 1              	| Tag 2              	| Attribute 1  	| Attribute 2 	| Relation       	| Total 	|
|-----------------	|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|-----------------	|---------------------------	|----------------	|--------------------	|--------------------	|--------------	|-------------	|----------------	|-------	|
| HTMLCollections 	| [R5](https://dom.spec.whatwg.org/#interface-htmlcollection) + [R1](windowNamedAccess.md), [R5](https://dom.spec.whatwg.org/#interface-htmlcollection) + [R2](domTreeAccessors.md) 	| x.x, window.x.x 	| Object Property, Variable 	| HTMLCollection 	| any                	| any                	| id=x         	| id=x        	| child, sibling 	| 141   	|
|                 	|                                                                                                                                                                                   	| document.x.x    	| Object Property           	| HTMLCollection 	| object, img, image 	| object, img, image 	| id=x         	| id=x        	| child, sibling 	| 3     	|
|                 	|                                                                                                                                                                                   	| x.y, window.x.y 	| Object Property, Variable 	| HTMLCollection 	| any                	| any                	| id=x, name=y 	| id=x        	| child, sibling 	| 141   	|
|                 	|                                                                                                                                                                                   	| document.x.y    	| Object Property           	| HTMLCollection 	| object, img, image 	| object, img, image 	| id=x, name=y 	| id=x        	| child, sibling 	| 3     	|