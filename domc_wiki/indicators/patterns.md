---
title: Patterns & Guidelines
parent: Indicators
nav_order: 1
---

{% include toggle_color.html %}

# DOM Clobbering Wiki

Stable
{: .label .label-green }


## DOM Clobbering Code Patterns

Common DOM Clobbering vulnerable code patterns are listed below. 


<p align="center">
  <img align="center" width="900" src="https://github.com/SoheilKhodayari/DOMClobbering/blob/master/static/assets/images/wiki/code-patterns.png?raw=true">
</p>


The most common mistakes are patterns A and E, in which the developer references an undefined variable through the `Window`object, and then use the result in a sensitive instruction, whereas the least common, but also more complex mistakes are patterns F, G and H where the vulnerability originates due to the position of the instructions that span across two different script tags. 

Other common mistakes are patterns B and C, where developers treat custom and native document and window properties as trusted values that can be safely used in sensitive operations. The rest of this section presents secure coding patterns that can prevent DOM Clobbering.



## Secure Patterns & Guidelines


This section presented a list of recommendations, best practices and secure coding patterns that can resolve [DOM Clobbering code patterns](patterns.md), and will be incrementally updated. 


### Explicit Variable Declarations



### Strict Type Checking


### Do Not Use Document for Global Variables


### Namespace Isolation