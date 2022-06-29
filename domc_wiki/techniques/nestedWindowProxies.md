---
title: Nested Window Proxies
parent: Techniques
nav_order: 4
---

{% include toggle_color.html %}

# DOM Clobbering Wiki

Stable
{: .label .label-green }


## Nested Window Proxies

These markups use the Iframe `srcdoc` rule (R4) to create nested window proxies that are named with `x` and `y`, respectively. 

Similarly to the previous group of markups, it uses the rule R1 or R2 to clobber the base object.
Then, the stacked iframes enable attackers to exploit frame navigation features to clobber object properties like `x.y`.

| Name                  	| Rule                                                                                                                                                                                                                                          	| Target                        	| Target Type               	| Reference Type 	| Tag 1  	| Tag 2  	| Attribute 1 	| Attribute 2 	| Relation 	| Total 	|
|-----------------------	|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|-------------------------------	|---------------------------	|----------------	|--------	|--------	|-------------	|-------------	|----------	|-------	|
| Nested Window Proxies 	| [R4](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#the-iframe-element) + [R1](windowNamedAccess.md), [R4](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#the-iframe-element) + [R2](domTreeAccessors.md) 	| x.y, window.x.y, document.x.y 	| Object Property, Variable 	| WindowProxy    	| iframe 	| iframe 	| name=x      	| name=y      	| srcdoc   	| 1     	|


