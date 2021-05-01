from django.urls import path
from .views import ProductAPI, CurrencyAPI


urlpatterns = [
    path('product', ProductAPI.as_view()),
    path('currency', CurrencyAPI.as_view())
]
