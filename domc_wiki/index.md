---
title: Overview
nav_order: 1
---

{% include toggle_color.html %}


# DOM Clobbering

Stable
{: .label .label-green }

This wiki is meant to introduce readers to DOM Clobbering and also serve as a reference guide for experienced researchers and developers for DOM Clobbering vulnerabilities. 
{: .fs-5 .fw-300 }

[Contribute Now](https://soheilkhodayari.github.io/DOMClobbering/domc_wiki/contributions){: .btn .btn-purple .fs-5 .mb-4 .mb-md-0 .mr-2 } [View it on GitHub](https://github.com/SoheilKhodayari/DOMClobbering){: .btn .btn-blue .fs-5 .mb-4 .mb-md-0 }

<hr>


## Overview

[DOM Clobbering](https://wicg.github.io/sanitizer-api/#dom-clobbering)<sup>[\[1, 2, 3\]](#references)</sup> is a type of JavaScript-less injection attack where attackers confuse the client-side JavaScript code of web applications by inserting a piece of non-script HTML markup into webpages, and transforming it into executable code leveraging [named property accesses](https://html.spec.whatwg.org/multipage/window-object.html#named-access-on-the-window-object).

DOM Clobbering vulnerabilities originate from a naming collision between JavaScript variables and named HTML markups, i.e., markups with an `id` or `name` attribute

## Named Properties in DOM

One of the ways JavaScript programs can manipulate the contents of webpages is through the [Document Object Model (DOM)](https://www.w3.org/TR/WD-DOM/introduction.html) a tree-structured representation of the rendered webpages.

Normally, DOM tree elements can be accessed in JavaScript via the object [selector methods](https://www.w3.org/TR/selectors-4/) of the [document](https://developer.mozilla.org/en-US/docs/Web/API/Document) object, e.g., `document.getElementById(x)` to locate the element with id `x`.

However, that is not the only way and the same can be acheived via a **property** of the `document` and global `window` objects, e.g., `document.x`, or `window.x`, known as `named property access`, as specified in [HTML](https://html.spec.whatwg.org/multipage/window-object.html#named-access-on-the-window-object) and [DOM](https://html.spec.whatwg.org/multipage/dom.html#dom-tree-accessors) living standards. 

Accordingly, web browsers map HTML elements to JavaScript objects automatically based on the element `named` properties. Such named properties are, for example, `id` and `name` HTML tag attributes. 



## Attack Examples

When an [undefined variable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) and an HTML markup have the same name, the browser replaces the content of the variable with the DOM object mirroring the markup type. 

**Example 1:** 

```js
1. var s = document.createElement('script');
2. let config = window.globalConfig || {href: 'script.js'};
3. s.src = config.href;
4. document.body.appendChild(s);
```

The snippet shows a vulnerable code, which loads a script whose URL is stored in a global configuration object, i.e., `window.globalConfig`. Specifically, the code first creates a `script` tag (line 1), and then, it retrieves the global configuration object and stores it in a local variable `config` (line 2). If the configuration object does not exist, it uses a minimal default configuration, i.e., `{href: script.js'}` (line 2). Then, the program sets the `src` attribute of the newly created script tag to the `href` property of the configuration object (line 3) and appends the new script to the DOM tree, resulting in the execution of the script (line 4). 

The vulnerability originates in the assignment in line 2 because
attackers can control the value of `window.globalConfig`, and ultimately, pick the script `src` value of their choosing by injecting an HTML tag with `id="globalConfig"`, e.g., `<a id="globalConfig" href="malicious.js">`. 

When parsing such a markup code, the browser maps the anchor tag element to the `window.globalConfig` property as mandated by the [named property accesses](https://html.spec.whatwg.org/multipage/window-object.html#named-access-on-the-window-object). The escalation to arbitrary code execution happens in line 3, when the code reads the `href` property of the object `window.globalConfig`, which no longer contains the object with the global configuration but it contains the attacker-controlled anchor tag whose `href` property value is `malicious.js`. 


**Note.** Attackers can abuse named property accesses in other ways, where instead of overwriting variables by HTML nodes, they can overshadow [browser APIs](https://developer.mozilla.org/en-US/docs/Web/API). For example, if the attacker inserts a markup with `id=getElementbyId` in DOM, then the API `document.getElementbyId` no longer refers to the built-in API for finding an element in the DOM tree, but rather mirrors the DOM element with id `getElementbyId` in the DOM tree. This behaviour is due to the so-called [named property visibility algorithm](https://webidl.spec.whatwg.org/#legacy-platform-object-abstract-ops).


**Example 2:** 

```js
1. document.conf = {};
2. const queryParams = new URLSearchParams(window.location.search);
3. if(isTrustedOrigin(queryParams.get('next'))){
4.   document.conf.src = queryParams.get('next');
5. }
6. // [...]
7. let next = document.conf.src || 'https://benign1.com/index.html';
8. window.location.href = next;
9. // [...]
10. function isTrustedOrigin(url){ 
11.  let targetOrigin = new URL(url).origin;
12.  let trustedOrigins= [
13.    new URL('https://benign1.com').origin, 
14.    new URL('https://benign2.com').origin
15.  ];
16.  if(trustedOrigins.indexOf(targetOrigin) !== -1) return true;
17.  return false;
18. }
```

The snippet above reads the value of a query parameter `next`, and if it belongs to a trusted domain, it stores it globally in `document.conf.src` (lines 1-4). Then, it redirects the page to `document.conf.src` or a default value (line 6).

This script is vulnerable because it ignores the fact that assignments to `document` are always overshadowed by DOM Clobbering. For example, if attackers inject `<img name="conf" src="javascript:alert(1)">`, the `document.conf` would point to the image tag, so `document.conf.src` is an attacker-controlled JavaScript payload. Hence, this results in XSS when assigned to the top window location (line 8).


## About This Wiki

While the wiki covers different aspects of DOM Clobbering, new clobbering techniques and threats are always emerging. Improvements and suggestions, whether to add new content or expand existing documentation, are always more than appreciated. For more information, please refer to [contribution guidelines](./contributions).


## References

1. Gareth Heyes, "DOM Clobbering strikes back." [Link](https://portswigger.net/research/dom-clobbering-strikes-back).

2. Neil Jenkins, "Sanitising HTML – the DOM clobbering issue." [Link](https://fastmail.blog/advanced/sanitising-html-the-dom-clobbering-issue/).

3. Mario Heiderich, Christopher Späth, Jörg Schwenk, "DOMPurify: Client-side Protection Against XSS and Markup Injection", [Link](https://link.springer.com/chapter/10.1007/978-3-319-66399-9_7).

