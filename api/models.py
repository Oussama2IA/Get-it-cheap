from django.db import models

class Product(models.Model):
    search_id = models.CharField(max_length=100, null=True)
    source = models.CharField(max_length=30)
    name = models.CharField(max_length=500)
    price = models.FloatField()
    url = models.TextField()
    img = models.TextField()

    def __str__(self):
        return self.name

class Currency(models.Model):
    symbol = models.CharField(max_length=3, unique=True)
    rate = models.FloatField()

    def __str__(self):
        return self.symbol

class Category(models.Model):
    category = models.CharField(max_length=30, unique=True)
    website = models.CharField(max_length=30)

    def __str__(self):
        return self.category
