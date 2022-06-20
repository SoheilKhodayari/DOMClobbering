from django.conf.urls import url
from . import views

app_name = 'django_gitlab_auth'
urlpatterns = [
     url(r'^test/$', views.get_domc_test, name='get_domc_test'),
     url(r'^post-test/$', views.post_tests_results, name='post_domc_test'),
]