from rest_framework import serializers
from .models import Product, Currency


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('source', 'name', 'price', 'url', 'img')

class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = ('symbol', 'rate')