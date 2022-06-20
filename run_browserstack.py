"""
	Copyright (C) 2022  Soheil Khodayari, CISPA
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Affero General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Affero General Public License for more details.
	You should have received a copy of the GNU Affero General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
	

	Description:
	------------
	Tests browsers from the BrowserStack pool for DOM Clobbering markups
	

	Usage:
	------------
	python3 run_browserstack.py --help


"""


import os, json
import sys
import argparse
import time

from threading import Thread
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities


# URL of the webapp hosting the DOM Clobbering test pages
BASE_URL_DEFAULT = "http://127.0.0.1:3000"
BASE_URL = BASE_URL_DEFAULT


def get_test_url(browser_name, version):

	url =  BASE_URL + '/domc/test?b=%s&v=%s&t=fuzzer_x'%(browser_name, version) 
	return url


def get_output_folder_name(browser_cap):
	
	if 'browser' in browser_cap and 'os' in browser_cap and 'browser_version' in browser_cap:
		return browser_cap['browser'].capitalize() + '-Desktop_' + browser_cap['browser_version']
	else:
		return browser_cap['name'] + '_' + browser_cap['os_version']


def run_session(desired_cap, remote_driver):
	"""
	runs the test
	"""
	driver = webdriver.Remote(
		command_executor=remote_driver,
		desired_capabilities=desired_cap)


	# we specify the name / version of the browser we are testing via URL get query params
	# so that the server can associate the results with the correct browser
	test_url_start = get_test_url(desired_cap['browser'], desired_cap['browser_version']) 
	
	# visit the test pages 
	driver.get(test_url_start)

	driver.quit()


def main():

	p = argparse.ArgumentParser(description='This script tests and identifies the DOM Clobbering markups for BrowserStack automate browsers.')
	p.add_argument('--caps', "-C",
		metavar="FILE",
		default="browser_capabilities.json",
		help='Input browser capabilities JSON file for testing (default: %(default)s)',
		type=str)


	p.add_argument('--browserstack_username', "-U",
		help='BrowserStack Username',
		type=str)

	p.add_argument('--browserstack_access_key', "-K",
		help='BrowserStack Access Key',
		type=str)


	p.add_argument('--base_url', "-B",
		help='Base URL of the webapp hosting the test pages',
		type=str)


	args= vars(p.parse_args())


	if args['base_url'] is not None:
		BASE_URL = args['base_url']


	if args['browserstack_username'] is None:
		message = "Please specify the BROWSERSTACK_USERNAME for testing in .env file."
		print(message)
		sys.exit(1)

	if args['browserstack_access_key'] is None:
		message = "Please specify the BROWSERSTACK_ACCESS_KEY for testing in .env file."
		print(message)
		sys.exit(1)


	remote_driver= "https://BROWSERSTACK_USERNAME:BROWSERSTACK_ACCESS_KEY@hub-cloud.browserstack.com/wd/hub"
	remote_driver = remote_driver.replace("BROWSERSTACK_USERNAME", args['browserstack_username'])
	remote_driver = remote_driver.replace("BROWSERSTACK_ACCESS_KEY",  args['browserstack_access_key'])

	
	# load browsers for testing
	browser_capabilities_file = args["caps"]
	fd = open(browser_capabilities_file, "r")
	caps = json.loads(fd.read())
	fd.close()


	# run the tests, one separate thread per browser to be tested
	for cap in caps:
		Thread(target=run_session, args=(cap, remote_driver)).start()


if __name__ == "__main__":
	main()



