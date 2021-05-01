from api.models import Product, Currency
from scrapy_djangoitem import DjangoItem


class ProductItem(DjangoItem):
    django_model = Product


class CurrencyItem(DjangoItem):
    django_model = Currency
