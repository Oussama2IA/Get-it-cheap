import scrapy
from crawler.items import ProductItem
from api.models import Currency
from api.serializers import CurrencySerializer


# General search
class AmazonSpider(scrapy.Spider):
    name = 'amazon'
    allowed_domains = [ 'amazon.com' ]
    try:
        data = Currency.objects.get(symbol='USD')
        rate = CurrencySerializer(data).data.get('rate')
    except Currency.DoesNotExist:
        rate = None

    def __init__(self, *args, **kwargs):
        self.search_id = kwargs.get('search_id')
        product = kwargs.get('product')
        self.start_urls = [ 'https://www.amazon.com/s?k=' + product.replace(" ", "+") ]
        super(AmazonSpider, self).__init__(*args, **kwargs)

    def parse(self, response):
        if self.rate == None:
            return None

        results = response.css('.s-latency-cf-section')

        for result in results:
            name = result.css('.a-size-medium::text').get()
            price_whole = result.css('.a-price-whole::text').get()
            price_fraction = result.css('.a-price-fraction::text').get()
            url = result.css('.a-link-normal.a-text-normal::attr(href)').get()
            img = result.css('.s-image::attr(src)').get()

            if name != None and price_whole != None and url != None and img != None:
                item = ProductItem()
                item['search_id'] = self.search_id
                item['source'] = 'amazon.com'
                item['name'] = name.strip()
                item['price'] = float(price_whole.replace(',', '') + '.' + price_fraction) * self.rate
                item['url'] = 'https://www.amazon.com' + url
                item['img'] = img

                yield item

        next_page = response.css('.a-padding-base .a-text-center .a-last a::attr(href)').get()
        if next_page is not None:
            next_page = 'https://www.amazon.com' + next_page
            yield scrapy.Request(next_page, callback=self.parse)


# Mobile phones Category
class MobileshopSpider(scrapy.Spider):
    name = 'mobileshop'
    allowed_domains = [ 'mobileshop.eu' ]
    try:
        data = Currency.objects.get(symbol='EUR')
        rate = CurrencySerializer(data).data.get('rate')
    except Currency.DoesNotExist:
        rate = None

    def __init__(self,*args, **kwargs):
        self.search_id = kwargs.get('search_id')
        product = kwargs.get('product').replace(' ','+')
        self.start_urls = [ 'https://www.mobileshop.eu/search/?keyword=' + product ]
        super(MobileshopSpider, self).__init__(*args, **kwargs)

    def parse(self, response):
        if self.rate == None:
            return None

        results = response.css('.product-module')

        for result in results :
            item = ProductItem()
            name = result.css('.product-name a::text').get()
            price = result.css('.price div::text').get()
            url = result.css('.product-name a::attr(href)').get()
            img = result.css('a img::attr(data-src)').get()

            if name != None and price != None and url != None and img != None:
                item['source'] = 'mobileshop.eu'
                item['search_id'] = self.search_id
                item['name'] = name
                item['price'] = float(price.replace('\xa0€','')) * self.rate
                item['url'] = 'https://www.mobileshop.eu' + url
                item['img'] = img

                yield item

        next_page = response.css('.pager div a::attr(href)').get()
        if next_page != None :
            next_page = 'https://www.mobileshop.eu' + next_page
            yield scrapy.Request(next_page,callback=self.parse)

class RedmiShope(scrapy.Spider):
    name = 'redmishope'
    allowed_domains = [ 'mi-store.ma' ]

    def __init__(self,*args, **kwargs):
        self.search_id = kwargs.get('search_id')
        product = kwargs.get('product').replace(' ','+')
        self.start_urls = [ f'https://mi-store.ma/?product_cat=&s={product}&post_type=product' ]
        super(RedmiShope, self).__init__(*args, **kwargs)

    def parse(self, response):
        main_result = response.css('.single-main-content')

        if main_result != None:
            item = ProductItem()
            name = main_result.css('.product_title.entry-title::text').get()
            price = main_result.css('bdi::text').get()
            url = self.start_urls[0]
            img = main_result.css('a::attr(href)').get()

            if name != None and price != None and url != None and img != None:
                item['source'] = 'mobileshop.eu'
                item['search_id'] = self.search_id
                item['name'] = name
                item['price'] = float(price.replace('\xa0','').replace(',', ''))
                item['url'] = url
                item['img'] = img

                yield item

        results = response.css('.v1')
        
        for reuslt in results:
            item = ProductItem()
            name = reuslt.css('.name a::text').get()
            price = reuslt.css('bdi::text').get()
            url = reuslt.css('.name a::attr(href)').get()
            img = reuslt.css('img::attr(data-src)').get()

            if name != None and price != None and url != None and img != None:
                item['source'] = 'mi-store.ma'
                item['search_id'] = self.search_id
                item['name'] = name
                item['price'] = float(price.replace('\xa0','').replace(',', '')) * self.rate
                item['url'] = url
                item['img'] = img

                yield item


# laptops & mobile phones & tech accessories categories
class ElectroPlanet(scrapy.Spider):
    name = 'electroplanet'
    allowed_domains = [ 'electroplanet.ma' ]

    def __init__(self,*args, **kwargs):
        self.search_id = kwargs.get('search_id')
        product = kwargs.get('product').replace(' ','+')
        self.start_urls = [ f'https://www.electroplanet.ma/recherche?q={product}' ]
        super(ElectroPlanet, self).__init__(*args, **kwargs)

    def parse(self, response):
        results = response.css('.product-item-info')

        for result in results:
            item = ProductItem()
            sub_name_1 =  result.css('.ref::text').get()
            sub_name_2 =  result.css('.product-item-link .brand::text').get()
            sub_name_3 =  result.css('.product-item-link .ref::text').get()
            price = result.css('.price::text').get()
            url = result.css('.box-image a::attr(href)').get()
            img = result.css('.box-image img::attr(src)').get()

            if sub_name_1 != None and sub_name_2 != None and sub_name_3 != None and price != None and url != None and img != None:
                item['source'] = 'electroplanet.ma'
                item['search_id'] = self.search_id
                item['name'] = sub_name_1.strip() + ' ' + sub_name_2.strip() + ' ' + sub_name_3.strip()
                item['price'] = float(price.strip().replace(' ', ''))
                item['url'] = url.strip()
                item['img'] = img.strip()

                yield item

            next_page = response.css('.pages-item-next a::attr(href)').get()
            if next_page is not None:
                yield scrapy.Request(next_page, callback=self.parse)


# Tech accessories category 
class MywaySpider(scrapy.Spider):
    name = 'myway'
    allowed_domain = [ 'myway.ma' ]

    def __init__(self,*args, **kwargs):
        self.search_id = kwargs.get('search_id')
        product = kwargs.get('product').replace(' ','+')
        self.start_urls = [f'https://www.myway.ma/search?controller=search&orderby=position&orderway=desc&search_query={product}']
        super(MywaySpider, self).__init__(*args, **kwargs)  
                  
    def parse(self,response):
        results = response.css('.product-container')

        for result in results:
            item = ProductItem()
            name = result.css('.product-name::text').get()
            price = result.css('.price::text').get()
            url = result.css('.product-name ::attr(href)').get()
            img = result.css('.front-image::attr(src)').get()

            if name != None and price != None and url != None and img != None:
                item['source'] = 'myway.ma'
                item['search_id'] = self.search_id
                item['name'] = name.strip()
                item['price'] = float(price.strip().replace(" Dhs","").replace(' ', ''))
                item['url'] = url.strip()
                item['img'] = img.strip()

                yield item

            next_page = response.css('.pagination_next a::attr(href)').get()
            if next_page is not None:
                next_page = 'https://www.myway.ma' + next_page
                yield scrapy.Request(next_page,callback=self.parse)
