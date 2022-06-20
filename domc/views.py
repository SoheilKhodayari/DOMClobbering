from django.views.decorators.http import require_GET
from django.http import HttpResponseRedirect



@require_GET
def index(request):
	return HttpResponseRedirect("/domc/test?b=your-browser&v=browser-version")

