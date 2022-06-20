from django.conf import settings
from django.shortcuts import redirect, resolve_url, render
from django.urls import reverse
from django.views.decorators.http import require_GET,require_POST
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import os, json


@require_GET
def get_domc_test(request):


	def build_link(url, b, v, t):
		return "{0}?b={1}&v={2}&t={3}".format(url,b[0],v[0],t)


	query_params = dict(request.GET)

	has_t = 't' in query_params and query_params['t'][0] != '' 
	has_b = 'b' in query_params and query_params['b'][0] != '' 
	has_v = 'v' in query_params and query_params['v'][0] != '' 

	fuzzer_x = 'fuzzer_x';
	fuzzer_x_custom = 'fuzzer_x_custom';

	fuzzer_x_native = 'fuzzer_x_native';
	fuzzer_x_native_custom = 'fuzzer_x_native_custom';

	fuzzer_x_y_11 = 'fuzzer_x_y11';
	fuzzer_x_y_12 = 'fuzzer_x_y12';
	fuzzer_x_y_21 = 'fuzzer_x_y21';
	fuzzer_x_y_22 = 'fuzzer_x_y22';

	fuzzer_x_y_11_custom = 'fuzzer_x_y11_custom';
	fuzzer_x_y_12_custom = 'fuzzer_x_y12_custom';
	fuzzer_x_y_21_custom = 'fuzzer_x_y21_custom';
	fuzzer_x_y_22_custom = 'fuzzer_x_y22_custom';

	fuzzer_iframes = 'fuzzer_iframes';
    
	if has_t and has_b and has_v:


		context = query_params
		context[fuzzer_x] = build_link(request.path, query_params['b'], query_params['v'], fuzzer_x)
		context[fuzzer_x_custom] = build_link(request.path, query_params['b'], query_params['v'], fuzzer_x_custom)

		context[fuzzer_x_native] = build_link(request.path, query_params['b'], query_params['v'], fuzzer_x_native)
		context[fuzzer_x_native_custom] = build_link(request.path, query_params['b'], query_params['v'], fuzzer_x_native_custom)

		context[fuzzer_x_y_11] = build_link(request.path, query_params['b'], query_params['v'], fuzzer_x_y_11)
		context[fuzzer_x_y_12] = build_link(request.path, query_params['b'], query_params['v'], fuzzer_x_y_12)
		context[fuzzer_x_y_21] = build_link(request.path, query_params['b'], query_params['v'], fuzzer_x_y_21)
		context[fuzzer_x_y_22] = build_link(request.path, query_params['b'], query_params['v'], fuzzer_x_y_22)


		context[fuzzer_x_y_11_custom] = build_link(request.path, query_params['b'], query_params['v'], fuzzer_x_y_11_custom)
		context[fuzzer_x_y_12_custom] = build_link(request.path, query_params['b'], query_params['v'], fuzzer_x_y_12_custom)
		context[fuzzer_x_y_21_custom] = build_link(request.path, query_params['b'], query_params['v'], fuzzer_x_y_21_custom)
		context[fuzzer_x_y_22_custom] = build_link(request.path, query_params['b'], query_params['v'], fuzzer_x_y_22_custom)

		context[fuzzer_iframes] = build_link(request.path, query_params['b'], query_params['v'], fuzzer_iframes)



		resource_file_name = query_params['t'][0] + '.html'
		return render(request, resource_file_name , context)

	elif not has_t and has_b and has_v:


		context = {}
		for key in query_params:
			context[key] = query_params[key]

		context = query_params
		context[fuzzer_x] = build_link(request.path, query_params['b'], query_params['v'], fuzzer_x)
		context[fuzzer_x_custom] = build_link(request.path, query_params['b'], query_params['v'], fuzzer_x_custom)

		context[fuzzer_x_native] = build_link(request.path, query_params['b'], query_params['v'], fuzzer_x_native)
		context[fuzzer_x_native_custom] = build_link(request.path, query_params['b'], query_params['v'], fuzzer_x_native_custom)

		context[fuzzer_x_y_11] = build_link(request.path, query_params['b'], query_params['v'], fuzzer_x_y_11)
		context[fuzzer_x_y_12] = build_link(request.path, query_params['b'], query_params['v'], fuzzer_x_y_12)
		context[fuzzer_x_y_21] = build_link(request.path, query_params['b'], query_params['v'], fuzzer_x_y_21)
		context[fuzzer_x_y_22] = build_link(request.path, query_params['b'], query_params['v'], fuzzer_x_y_22)


		context[fuzzer_x_y_11_custom] = build_link(request.path, query_params['b'], query_params['v'], fuzzer_x_y_11_custom)
		context[fuzzer_x_y_12_custom] = build_link(request.path, query_params['b'], query_params['v'], fuzzer_x_y_12_custom)
		context[fuzzer_x_y_21_custom] = build_link(request.path, query_params['b'], query_params['v'], fuzzer_x_y_21_custom)
		context[fuzzer_x_y_22_custom] = build_link(request.path, query_params['b'], query_params['v'], fuzzer_x_y_22_custom)

		context[fuzzer_iframes] = build_link(request.path, query_params['b'], query_params['v'], fuzzer_iframes)


		return render(request, "index.html", context)

	else:
		return HttpResponse("[404] Bad request, please provide the b,v,t query parameters, i.e., browser name, browser version, and test number.")


@csrf_exempt
@require_POST
def post_tests_results(request):


	query_params = dict(request.GET)

	browser = query_params['b'][0]
	browser_version = query_params['v'][0]
	test_name = query_params['t'][0]

	body_unicode = request.body.decode('utf-8')
	body = json.loads(body_unicode)
	data = body['data']

	results_folder = os.path.join(settings.OUTPUT_DIR, browser + '_' + browser_version)
	if not os.path.exists(results_folder):
		os.makedirs(results_folder)

	test_file = os.path.join(results_folder, test_name + '.json')
	with open(test_file, 'w+') as fd:
		json.dump(data, fd, indent=4)

	return JsonResponse({"OperationStatus": 200 })