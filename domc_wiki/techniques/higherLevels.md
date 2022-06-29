---
title: Clobbering Higher Levels
parent: Techniques
nav_order: 9
---

{% include toggle_color.html %}

# DOM Clobbering Wiki

Stable
{: .label .label-green }


## Clobbering Higher Levels

DOM Clobbering techniques presented in this wiki have been exemplified to clobber up to two levels. 
However, to clobber more complex JavaScript member expressions like `x_1.x_2.x_3...x_n`, 
one can combine two different techniques, or recursively apply multiple instantiations of the same technique. 

Consider, for instance, the case of nested iframes with `srcdoc` where each iframe is named with `x_i`. In this scenario, the attacker reuses the same technique multiple times. A more complex case is when the attacker combines the different techniques. 

For instance, the following code listing shows an example where attackers combine [HTMLCollections](htmlCollections) and [parent-child relationships](formParentChild.md) to clobber up to three levels.

The listing shows the case where a `form` and a `button` (i) have the same `id` and also (ii) have a parent-child relationship. As a result, member expressions like `x.y.x` can be clobbered.



```js
// HTML Payload
<form id="x" name="y">
    <button id="x" name="y">
</form>		
// JavaScript
console.log(x);       // Returns HTMLCollection c
console.log(x.x);     // Returns key x of c: Form f
console.log(x.y);     // Returns key y of c: Form f
console.log(x.x.x);   // Returns child x of f: Button
console.log(x.x.y);   // Returns child y of f: Button
console.log(x.y.x);   // Returns child x of f: Button 
console.log(x.y.y);   // Returns child y of f: Button 
```

**Note.**  When combining the different classes, the resulting instance would only work in the intersection of the set of browsers that each constituent class applies to. 