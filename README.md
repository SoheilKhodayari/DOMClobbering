<p align="center">
	<a href="//soheilkhodayari.github.io/DOMClobbering/">
		<img align="center" alt="DOMC-BT" src="static/assets/images/logo.png" height="165">
	</a>
</p>

<p align="center">
	<span><b> DOMC-BT </b></span>
</p>

<p align="center">
	<a href="https://soheilkhodayari.github.io/DOMClobbering">Website</a> |
		<a href="https://github.com/SoheilKhodayari/DOMClobbering/tree/master/domc_tests">Browser Testing</a> |
	<a href="https://soheilkhodayari.github.io/DOMClobbering/domc_wiki/index">Wiki</a> |
	<a href="https://soheilkhodayari.github.io/DOMClobbering/domc_markups/list">Markups</a> |
	<a href="https://soheilkhodayari.github.io/DOMClobbering/domc_payload_generator/">Payload Generator</a>
</p>


# DOM Clobbering Browser Testing Framework

![Build Status](https://github.com/SoheilKhodayari/DOMClobbering/actions/workflows/github-actions-web.yml/badge.svg) [![Node](https://img.shields.io/badge/node%40latest-%3E%3D%206.0.0-brightgreen.svg)](https://img.shields.io/badge/node%40latest-%3E%3D%206.0.0-brightgreen.svg) [![made-with-python](https://img.shields.io/badge/Made%20with-Python-1f425f.svg)](https://www.python.org/) [![Open Source?Yes!](https://badgen.net/badge/Open%20Source%20%3F/Yes%21/blue?icon=github)](https://github.com/Naereen/badges/)

A comprehensive framework for testing web browsers against DOM Clobbering. DOMC-BT exhaustively generates test cases of candidate DOM Clobbering markups and automatically tests them against web browsers. 

DOMC-BT complements [`TheThing`](https://github.com/SoheilKhodayari/TheThing) a static-dynamic security analysis tool for DOM clobbering based on [JAW](https://soheilkhodayari.github.io/JAW/).

DOMC-BT has a website available at [https://soheilkhodayari.github.io/DOMClobbering](https://soheilkhodayari.github.io/DOMClobbering).


## ✨ What This Repository Includes?

- **[Automated Browser Testing](https://github.com/SoheilKhodayari/DOMClobbering/tree/master/domc_tests)**
	- A django webapp that serves DOM Clobbering test pages
		- Test your browser by visiting a single URL
		- Dockerized container
	- [Run test cases](https://github.com/SoheilKhodayari/DOMClobbering/blob/master/run_browserstack.py) against a pool of browser instances from [BrowserStack](https://www.browserstack.com/)
- **[DOM Clobbering Attack Payload Generator](https://github.com/SoheilKhodayari/DOMClobbering/tree/master/domc_payload_generator)**
	- Online [demo](https://soheilkhodayari.github.io/DOMClobbering/domc_payload_generator/)
- **[Interactive List of Clobbering Payloads](https://github.com/SoheilKhodayari/DOMClobbering/tree/master/domc_markups)** 
	- Clobbering Markups for `mobile` and `desktop` browsers
	- Online [demo](https://soheilkhodayari.github.io/DOMClobbering/domc_markups/list)
- **[DOM Clobbering Wiki](https://github.com/SoheilKhodayari/DOMClobbering/tree/master/domc_wiki)**
	- Clobbering techniques
	- Vulnerable code patterns
	- Defenses
	- Online [demo](https://soheilkhodayari.github.io/DOMClobbering/domc_wiki/index)



## 💥 What is DOM Clobbering? 


[DOM Clobbering](https://portswigger.net/web-security/dom-based/dom-clobbering) is an attack technique where the attacker achieves arbitrary client-side code execution by injecting a non-script HTML markup into a vulnerable webpage and transform the initially secure markup into executable code. 

DOM Clobbering originates from a naming collision between JavaScript variables and [named HTML markups](https://html.spec.whatwg.org/multipage/window-object.html#named-access-on-the-window-object), where attackers confuse the web application by injecting HTML elements whose `id` or `name` attribute matches the name of security-sensitive variables, such as variables used for fetching remote content (e.g., script `src`). 

For more information, See [here](https://soheilkhodayari.github.io/DOMClobbering/domc_wiki/).


## 🚀 Browser Testing


### 🏭 Building 

You can build the tool by:

```bash
$ docker-compose build web
$ docker-compose build browserstack
```


### 🔥 Running Tests in Your Browser

Run the web application that serves the test DOM Clobbering webpages:
```bash
$ docker-compose up web
```

Now, you should be able to visit the list of tests on `http://127.0.0.1:3000`, and run any of them in your browser by clicking on the links.

**Note:** The test pages automatically redirect to the next test webpage, therefore clicking the first test is sufficinet to run all the test cases.


### 🎡 Running Tests via BrowserStack

You can use [BrowserStack](https://www.browserstack.com/) to run the DOM clobbering testsuite for many browsers simultaneously.

**Step 1:** specify the browser configurations you would like to test in a `.json` file. See [here](https://www.browserstack.com/automate/capabilities) for more information about available list of browsers. You can find an example in [browser_capabilities.json](browser_capabilities.json) in the root project directory.

**Step 2:** Run the webapp hosting the test pages, and setup a proxy so that BrowserStack can access this webapp:
``` bash
$ docker-compose up web
$ ./browserstack_proxy ACCOUNT_KEY
```

**Note:** In the above command, replace `ACCOUNT_KEY` with your `BrowserStack` [access key](https://www.browserstack.com/docs/iaam/security/manage-access-keys).

**Note:** For setting up the proxy, you may need to download the appropriate `BrowserStack` [binary](https://www.browserstack.com/docs/local-testing/releases-and-downloads) and rename it to `BrowserStackLocal`. For more information, refer to the official BrowserStack local testing [documentation](https://www.browserstack.com/docs/local-testing).


**Step 3:** Run the automated docker service called `browserstack` to execute the tests:

``` bash
$ docker-compose up browserstack
```


## ➰ DOM Clobbering Markups

The raw data of DOM Clobbering markups are available in the [`domc_markups`](./domc_markups) folder in the root project directory for different  `mobile` and `desktop` browsers and browser versions. 

An interactive version of clobbering markups is available online [here](https://soheilkhodayari.github.io/DOMClobbering/domc_markups/list), which provides an online browser testing solution. For testing each markup in your browser, simply click on it. 

Found a new clobbering markup not in the [online list](https://soheilkhodayari.github.io/domc_markups/list) and that you would like to share? Then, open up a new PR [here](https://github.com/SoheilKhodayari/DOMClobbering/pulls).


## 📚 DOM Clobbering Wiki

This repository features one of the first online wikis for DOM Clobbering accessible at [https://soheilkhodayari.github.io/DOMClobbering](https://soheilkhodayari.github.io/DOMClobbering).

The `markdown` files of the wiki are available in the [`domc_wiki`](https://github.com/SoheilKhodayari/DOMClobbering/blob/master/domc_wiki) folder in the project root directory. 


### 🏭 Local Build

This repository uses the Jekyll [just-the-docs](https://github.com/just-the-docs/just-the-docs) as a GitHub pages [remote theme](https://blog.github.com/2017-11-29-use-any-theme-with-github-pages/), with the configuration specified in `_config.yaml`:

```
remote_theme: just-the-docs/just-the-docs
color_scheme: "dark"
```

**Docker:** You can build and run this Wiki inside a Docker container with:

```
$ docker-compose build wiki
$ docker-compose up wiki
```

**Host Machine:** alternatively, you can build it inside your host machine with:

```
$ gem install just-the-docs
$ bundle exec jekyll serve
```

For more information, please refer to the official [just-the-docs](https://github.com/just-the-docs/just-the-docs) and [Jekyll](https://jekyllrb.com/) documentations. 


### 💻 Automatic Deployment

The repository uses [Github Actions](https://github.com/features/actions) to automatically build and publish a static version of the DOM Clobbering Wiki with [Jekyll](https://jekyllrb.com/) once a commit is merged with the `master` branch (i.e., a Pull Request is accepted).



## 🙋 Questions

For any questions, suggestions, feedback or concerns, please [raise an issue in the repository](https://github.com/SoheilKhodayari/DOMClobbering/issues). 


## 🎃 Contribution and Code Of Conduct

Bug reports and pull requests are more than welcomed on [GitHub](https://github.com/SoheilKhodayari/DOMClobbering/pulls). For more information, please refer to [contribution guidelines](https://github.com/SoheilKhodayari/DOMClobbering/blob/master/domc_wiki/contributions.md). 

This project is intended to be a safe, welcoming space, and contributors are expected to adhere to the contributor [code of conduct](https://github.com/SoheilKhodayari/DOMClobbering/blob/master/CODE_OF_CONDUCT.md). 



## 📝 Academic Publication

The contents of this repository has been published as a part of a IEEE S&P'23 paper. If you use DOMC-BT for academic research, we encourage you to cite the following [paper](#coming-soon):

```
@inproceedings {SKhodayariSP23TheThing,
  author = {Soheil Khodayari and Giancarlo Pellegrino},
  title = {It's (DOM) Clobbering Time: Attack Techniques, Prevalence, and Defenses,
  booktitle = {To Appear at proceedings of the 44rd IEEE Symposium on Security and Privacy},
  year = {2023},
}
```

## Browser Testing

We thank the [BrowserStack Open-Source Program](https://www.browserstack.com/open-source) for supporting this project.

<a target="_blank" href="https://www.browserstack.com/"><img width="165" src="https://www.browserstack.com/images/layout/browserstack-logo-600x315.png"></a><br>




