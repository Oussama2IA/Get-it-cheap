from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from .models import Product, Currency, Category
from .serializers import ProductSerializer, CurrencySerializer, CategorySerializer
from scrapyd_api import ScrapydAPI
from uuid import uuid4

scrapyd = ScrapydAPI('http://localhost:6800')


class ProductAPI(APIView):
    serializer_class = ProductSerializer

    def post(self, request, format=None):
        category = request.GET.get('category')
        product = request.GET.get('product')
        id = str(uuid4())
        items = Category.objects.filter(category=category)
        spider_id = []
        for item in items:
            data = CategorySerializer(item).data
            website = data.get('website')
            spider_id.append(scrapyd.schedule(
                project='default', spider=website, search_id=id, product=product))
        return Response({'status': 'Crawling started', 'spider_id': spider_id, 'search_id': id}, status=status.HTTP_202_ACCEPTED)

    def get(self, request, format=None):
        spider_id = request.GET.get('spider_id').split(',')
        for id in spider_id:
            spider_status = scrapyd.job_status(project='default', job_id=id)
            if spider_status == 'finished':
                continue
            else:
                return Response({'status': 'Crawling not finished yet'}, status=status.HTTP_200_OK)

        id = request.GET.get('search_id')
        data = Product.objects.filter(search_id=id)
        results = ProductSerializer(data, many=True)
        return Response({'status': 'Crawling finished', 'result': results.data}, status=status.HTTP_200_OK)

    def delete(self, request, format=None):
        id = request.GET.get('search_id')
        data = Product.objects.filter(search_id=id)
        data.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CurrencyAPI(APIView):
    serializer_class = CurrencySerializer

    def get_object(self, symbol):
        try:
            return Currency.objects.get(symbol=symbol)
        except Currency.DoesNotExist:
            raise Http404

    def get(self, request, format=None):
        symbol = request.GET.get('symbol')
        data = self.get_object(symbol)
        currency = CurrencySerializer(data)
        return Response(currency.data, status=status.HTTP_200_OK)
