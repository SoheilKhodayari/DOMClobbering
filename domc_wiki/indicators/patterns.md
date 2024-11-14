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
  <img align="center" width="900" src="../../static/assets/images/wiki/code-patterns.png">
</p>


The most common mistakes are patterns A and E, in which the developer references an undefined variable through the `Window`object, and then use the result in a sensitive instruction, whereas the least common, but also more complex mistakes are patterns F, G and H where the vulnerability originates due to the position of the instructions that span across two different script tags. 

Other common mistakes are patterns B and C, where developers treat custom and native document and window properties as trusted values that can be safely used in sensitive operations. The rest of this section presents secure coding patterns that can prevent DOM Clobbering.


## Secure Patterns & Guidelines


This section presented a list of recommendations, best practices and secure coding patterns that can resolve [DOM Clobbering code patterns](#dom-clobbering-code-patterns), and will be incrementally updated. 


### Explicit Variable Declarations

As shown in the above table, a key element enabling DOM Clobbering is use of the `||` operator to rely on specific defaults when the primary, intended variable or property is undefined. As an alternative solution, developers can initialize those variables with the default value when they are undefined using `var` declarations, which prevents named properties to overshadow them according to the [named property visibility algorithm](https://webidl.spec.whatwg.org/#legacy-platform-object-abstract-ops). This solution could patch the patterns A, D, E, F, and H. When the value needs to be used in multiple scripts, as in patterns F and H, the declaration should be in the same (or a previous) script, but not in subsequent ones.


### Strict Type Checking

Another common mistake enabling DOM Clobbering is treating DOM properties, like `document` and `window` properties as safe, trusted values (e.g., patterns B, C, and G). Instead, developers should extend the trust boundary to these properties, verifying their type before using them in security-sensitive instructions, e.g., by leveraging the `instanceof` and `typeof` operators.

### Do Not Use Document for Global Variables

Properties of `document` can always be overwritten by DOM Clobbering, even immediately after they are assigned a value, as in pattern C. Accordingly, developers should refrain from using `document` as a means to store and retrieve global values. Instead, they can:

- rewrite their application to avoid global values.
- explicitly add them as properties on `window` (or [`globalThis`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis)), e.g. `window.x=1` - making sure to avoid pattern G and H.
- use `var` (NOT `let` nor `const`) in the global context to define global values, e.g. `var x=1` - making sure to avoid pattern A, B, and F.
- initialize global values without `var` (nor `let` or `const`), e.g. `x=1` - making sure to avoid pattern E, G, and H.

The following table shows how declerations affect global value access patterns in the precense of DOM Clobbering.

| Declaration        | Target         | Injection          | Clobbered |
| -----------------: | -------------: | ------------------ | --------- |
| `x = 1`            | `window.x`     | `id=x` OR `name=x` | No (*)    |
| `x = 1`            | `globalThis.x` | `id=x` OR `name=x` | No (*)    |
| `x = 1`            | `document.x`   | `name=x`           | Yes       |
| `x = 1`            | `x`            | `id=x` OR `name=x` | No (')    |
| `var x = 1`        | `window.x`     | `id=x` OR `name=x` | No (**)   |
| `var x = 1`        | `globalThis.x` | `id=x` OR `name=x` | No (**)   |
| `var x = 1`        | `document.x`   | `name=x`           | Yes       |
| `var x = 1`        | `x`            | `id=x` OR `name=x` | No        |
| `let x = 1`        | `window.x`     | `id=x` OR `name=x` | Yes       |
| `let x = 1`        | `globalThis.x` | `id=x` OR `name=x` | Yes       |
| `let x = 1`        | `document.x`   | `name=x`           | Yes       |
| `let x = 1`        | `x`            | `id=x` OR `name=x` | No        |
| `const x = 1`      | `window.x`     | `id=x` OR `name=x` | Yes       |
| `const x = 1`      | `globalThis.x` | `id=x` OR `name=x` | Yes       |
| `const x = 1`      | `document.x`   | `name=x`           | Yes       |
| `const x = 1`      | `x`            | `id=x` OR `name=x` | No        |
| `window.x = 1`     | `window.x`     | `id=x` OR `name=x` | No (***)  |
| `window.x = 1`     | `globalThis.x` | `id=x` OR `name=x` | No (***)  |
| `window.x = 1`     | `document.x`   | `name=x`           | Yes       |
| `window.x = 1`     | `x`            | `id=x` OR `name=x` | No (***)  |
| `globalThis.x = 1` | `window.x`     | `id=x` OR `name=x` | No (***)  |
| `globalThis.x = 1` | `globalThis.x` | `id=x` OR `name=x` | No (***)  |
| `globalThis.x = 1` | `document.x`   | `name=x`           | Yes       |
| `globalThis.x = 1` | `x`            | `id=x` OR `name=x` | No (***)  |

- (*): subject to pattern E, G, and H.
- (**): subject to pattern A, B, and F.
- (***): subject to pattern G and H.
- ('): subject to pattern G.

If you cannot avoid global values, a general approach is to include a script like the following as early as possible and exclusively use `appGlobals` for global variables (possibly enforced by a linter).

```html
<script>
// Don't do anything before the assignment to appGlobals.
appGlobals = {
  // Define your globals without reading from window or document, e.g.:
  foo: "bar",
};
</script>
```

### Namespace Isolation

While robust sanitizers may remove [named properties](https://webidl.spec.whatwg.org/#dfn-support-named-properties), an alternative solution is to separate the namespace of variables defined by JavaScript code and named properties in user-generated markups. For example, the markdown to HTML converter of source code version control applications often prefix `id` and `name` attribute values of user-generated markup with a specific string. If you use [DOMPurify](https://cure53.de/purify) you can use the [`SANITIZE_NAMED_PROPS`](https://github.com/cure53/DOMPurify/pull/710) option to automatically namespace `id`s and `name`s.

Alternatively, one can monitor runtime changes in the DOM tree via the [MutationObserver API](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver), and prefix named properties of all dynamically inserted markups before adding them to the tree like [@weizman/shield](https://weizmangal.com/shield/) does. This provides some protections provided you can ensure it is run first, but you need to be careful when dynamically inserting HTML because it can temporarily cause clobbering. Also, some newer `<iframe>`-based clobbering techniques might be able to sidestep it.
