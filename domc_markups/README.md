---
title: Markups
nav_order: 6
---

{% include toggle_color.html %}


# DOM Clobbering Makrups

The [`domc_markups`](https://github.com/SoheilKhodayari/DOMClobbering/tree/master/domc_markups) folder contains the list of DOM Clobbering markups and their mapping to different mobile and desktop browsers.

An interactive version of the markups is available in [list.html](list.html). See an online version [here](https://soheilkhodayari.github.io/DOMClobbering/domc_markups/list).


These markups are generated by running the test cases available at: [`domc_tests`](https://github.com/SoheilKhodayari/DOMClobbering/tree/master/domc_tests)


## How to interpret the results?

For each browser, the results are organized as follows:

1. Clobbering a variable `x`:
	- `fuzzer_x.json`
	- `fuzzer_x_custom.json`

2. Clobbering Object Properties `x.y`:
	- `fuzzer_x_y11.json`
	- `fuzzer_x_y11_custom.json`
	- `fuzzer_x_y12.json`
	- `fuzzer_x_y12_custom.json`
	- `fuzzer_x_y21.json`
	- `fuzzer_x_y21_custom.json`
	- `fuzzer_x_y22.json`
	- `fuzzer_x_y22_custom.json`
	- `fuzzer_iframes.json`

3. Clobbering Native Browser APIs:
	- `fuzzer_x_native.json`
	- `fuzzer_x_native_custom.json`


**Note.** Test files with the suffix `custom` mean that the test cases consider the `customtag` for testing.

**Note.** Test files with the suffix `native` mean that native browser APIs are tested against DOM Clobbering.

**Note.** Test files with the a suffix number specify the number of named attributes with a different value set per tag during testing. For example, `x_y12` means that the first tag only sets `id=x` or `name=x` or both, while the second tag sets `id=x` and `name=y` or `id=y` and `name=x`.
