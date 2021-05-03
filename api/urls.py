from django.urls import path
from .views import ProductAPI, CurrencyAPI


urlpatterns = [
    path('search', ProductAPI.as_view()),
    path('currency', CurrencyAPI.as_view())
]
