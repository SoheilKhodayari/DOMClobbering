---
title: Defenses
nav_order: 5
---

{% include toggle_color.html %}

# DOM Clobbering Wiki

Stable
{: .label .label-green }


## Defenses and Mitigation Techniques

This section presents existing mitigation techniques against DOM Clobbering. 


### Secure Coding Patterns

DOM Clobbering vulnerabilities can be mitigated via [secure coding patterns](./../indicators/patterns.md), such as `namespace isolation`, where developers seperate the namespace of named properties, and JavaScript variables, e.g., by prefixing `id` and `name` properties of dynamically inserted DOM elements.

For more information, please refer to the documentation for [secure coding patterns and practices](./../indicators/patterns.md). 


### HTML Sanitization

HTML sanitizers can sanitize the input markups before adding them to the DOM tree, e.g., by removing the `id` and `name` attributes from potentially dangerous HTML markups.


Recently, the community is considering to incorporate a new, native [sanitizer API](https://wicg.github.io/sanitizer-api/#dom-clobbering) in web browsers to mitigate injection-based vulnerabilites. 

At its current state, however, the new sanitizer API **does not** prevent DOM Clobbering by default, requiring developers to explicitly opt-into DOM Clobbering protection. This would completely remove `id` and `name` attributes for all HTML tags and may disrupt legitimate functionalities that require those attributes.


### Content Security Policy (CSP)


When attackers can clobber the `src` attribute of dynamically created scripts, they can load and execute arbitrary JavaScript code. In these cases, the CSP [script-src directive](https://w3c.github.io/webappsec-csp/#directive-script-src) can be used to constrain the value of script sources to a set of trusted domains, preventing attacker-loaded code to be executed<sup>[\[1, 2\]](#references)</sup>.

However, unlike malicious JavaScript injected by the attacker, injected HTML code is not blocked by CSP. Accordingly, CSP does not mitigate other variants of DOM Clobbering that do not require script `src` manipulation, e.g., clobbering the parameters of dynamic code evaluation constructs `eval` or `new Function()`can lead to CSP-bypassable XSS.


### Freezing Object Properties

Another way to mitigate DOM Clobbering is to freeze DOM object properties<sup>[\[3\]](#references)</sup>, e.g., via [Object.freeze()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) method, which prevents the object to be overwritten by named DOM elements.

While effective, determining all objects and object properties that need to be frozen is a non-trivial, error-prone task. Also, sealed objects cannot be changed anymore, hindering the dynamic composition of webpages. 


### Disabling DOM Clobbering

DOM Clobbering can be solved by [disabling named properties](https://github.com/w3c/webappsec-permissions-policy/issues/349) in web browsers (see also [here](https://github.com/WICG/document-policy/issues/32) and [here](https://github.com/WICG/document-policy/issues/16)). 

However, according to [Chrome telemetry](https://chromestatus.com/metrics/feature/timeline/popularity/1824), disabling named properties for clobbered variable accesses could break \~10.5% of the webpages as of April 2022.



## References

1. Lekies, Sebastian and Kotowicz, Krzysztof and Gross, Samuel and Vela Nava, Eduardo A and Johns, Martin, "Code-reuse attacks for the web: Breaking cross-site scripting mitigations via script gadgets", CCS, 2017. [Link](https://research.google/pubs/pub46450/)

2. Michał Bentkowski, XSS in GMail’s AMP4Email via DOM Clobbering, 2019. [Link](https://research.securitum.com/xss-in-amp4email-dom-clobbering/)

3. Mario Heiderich and Marcus Niemietz and Jorg Schwenk, "Waiting for CSP – Securing Legacy Web Applications with JSAgents", ESORICS, 2015. [Link](https://link.springer.com/chapter/10.1007/978-3-319-24174-6_2)

