# Description
# --------------------
# This script initializes the proxy for BrowserStack
# so that we can access the DOM Clobbering test webpages
# deployed within the local network
#
# Running
# --------------------
# ./browserstack_proxy ACCOUNT_KEY

# Note: obtain the appropriate BrowserStackLocal binary format from:
# https://www.browserstack.com/docs/local-testing/releases-and-downloads

./BrowserStackLocal --key $0 --local-proxy-host 127.0.0.1 --local-proxy-port 3000