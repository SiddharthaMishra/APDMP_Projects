from django.urls import path
from . import views

app_name = 'locator'

urlpatterns = [
    path('', views.index),
    path('getareas', views.get_geom),
    path('getborder', views.get_border),
    path('getapdmpborder', views.get_APDMP_border),

]