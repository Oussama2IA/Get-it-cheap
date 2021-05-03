from django.urls import path
from .views import index


urlpatterns = [
    path('', index),
    path('<str:category>/<str:product>', index)
]
