import scrapy
from crawler.items import CurrencyItem
from api.models import Currency


class CurrencySpider(scrapy.Spider):
    name = 'currency'
    allowed_domains = [ 'www.exchange-rates.org' ]
    search_url = 'https://www.exchange-rates.org/converter/'
    target_currency = 'MAD'
    currencies = [ 'USD', 'EUR', 'GBP', 'CNY', 'JPY', 'AUD', 'SGD', 'CAD', 'JOD', 'SAR' ]
    index = 0
    start_urls = [ search_url + currencies[index] + f'/{target_currency}/1' ]
    first_look = True

    def parse(self, response):
        if self.first_look:
            data = Currency.objects.all()
            data.delete()
            self.first_look = False

        item = CurrencyItem()
        item['symbol'] = self.currencies[self.index]
        rate = response.css('#ctl00_M_lblToAmount::text').get()
        item['rate'] = float(rate)

        yield item

        self.index += 1
        if self.index < len(self.currencies):
            yield scrapy.Request(self.search_url + self.currencies[self.index] + f'/{self.target_currency}/1', callback=self.parse)
