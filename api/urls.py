from django.urls import path
from .views import ProductAPI, CurrencyTableAPI, CurrencyDetailAPI


urlpatterns = [
    path('search', ProductAPI.as_view()),
    path('currencies', CurrencyTableAPI.as_view()),
    path('currencies/<str:symbol>', CurrencyDetailAPI.as_view()),
]
