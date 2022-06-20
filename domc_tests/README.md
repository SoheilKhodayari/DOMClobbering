# DOM Clobbering Test Cases

This folder contains a list of scripts for generating DOM Clobbering markups, covering all HTML tags, attributes, tags' relations, and attack targets (i.e., a variable `x`, an object property `x.y` or `x.x`, or a native browser API). 

## How it works?

First, we generate candidate HTML markups for a target `x` using all the 142 valid HTML tags, including a custom tag (i.e., `customtag`), and all the 244 valid HTML attributes, including a custom attribute. For each tag, we set the value of each attribute to `x` and add the JavaScript code that checks whether the markup clobbers the target `x`.

Then, we generate markups for object properties `x.y` and `x.x` combining all pairs of the 142 HTML tags considering three relations: sibling tags, parent-child tags, and the `srcdoc` attribute value. 

**Note:** As the experiments with a single tag showed that only `name` and `id` attributes create named properties, the generation of markups for object properties does not consider combinations of all HTML attributes, but only those of the `name` and `id`, e.g., `id=x`, or `id=x, name=y`.


## Test Cases

Test cases are organized into multiple pages based on the attack targets.

1. Clobbering a variable:
	- `fuzzer_x.html`
	- `fuzzer_x_custom.html`

2. Clobbering Object Properties:
	- `fuzzer_x_y11.html`
	- `fuzzer_x_y11_custom.html`
	- `fuzzer_x_y12.html`
	- `fuzzer_x_y12_custom.html`
	- `fuzzer_x_y21.html`
	- `fuzzer_x_y21_custom.html`
	- `fuzzer_x_y22.html`
	- `fuzzer_x_y22_custom.html`
	- `fuzzer_iframes.html`

3. Clobbering Native Browser APIs
	- `fuzzer_x_native.html`
	- `fuzzer_x_native_custom.html`


**Note.** Test files with the suffix `custom` mean that the test cases consider the `customtag` for testing.

**Note.** Test files with the suffix `native` mean that native browser APIs are tested against DOM Clobbering.

**Note.** Test files with the a suffix number specify the number of named attributes with a different value set per tag during testing. For example, `x_y12` means that the first tag only sets `id=x` or `name=x` or both, while the second tag sets `id=x` and `name=y` or `id=y` and `name=x`.



## Running

**Docker.** You can run the browser testing webapp by running the following command in the project root directory:

```bash
$ docker-compose build web
$ docker-compose up web
```

**Local Run.** Alternatively, you can run it in your host machine:

```bash
# install python dependencies
$ pip3 install -r requirements.txt
# run the django webapp
$ python3 manage.py runserver 0.0.0.0:3000
```

**Testing.** After the web application is up and running, visit `http://127.0.0.1` in your browser, set the browser name you are testing in the form, and click on the first test to start.

**Output.** The outputs will be stored in the `domc_markups` directory under the browser name and version you provide during testing. 



