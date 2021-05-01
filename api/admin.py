from django.contrib import admin
from .models import Product, Currency, Category

# Register your models here.
admin.site.register(Product)
admin.site.register(Currency)
admin.site.register(Category)
