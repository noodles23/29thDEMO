"""hackathon1 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', 'hackland.views.home', name='home'),
    url(r'^idea/$', 'hackland.views.idea', name='idea'),
    url(r'^idea2/$', 'hackland.views.idea2', name='idea2'),
    url(r'^demo/$', 'hackland.views.demo', name='demo'),
    url(r'^dsales/$', 'hackland.views.dsales', name='dsales'),
    url(r'^dtop/$', 'hackland.views.dtop', name='dtop'),
    url(r'^dret/$', 'hackland.views.dret', name='dret'),
    url(r'^dguided/$', 'hackland.views.dguided', name='dguided'),
]
