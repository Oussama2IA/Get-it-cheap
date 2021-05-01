import scrapy
from crawler.items import CurrencyItem
from api.models import Currency


class CurrencySpider(scrapy.Spider):
    name = 'currency'
    allowed_domains = [ 'www.exchange-rates.org' ]
    target_currency = 'MAD'
    currencies = [ 'USD', 'EUR', 'GBP', 'CNY', 'JPY', 'AUD', 'SGD', 'CAD', 'JOD', 'SAR' ]
    index = 0
    start_urls = [ f'https://www.exchange-rates.org/converter/{currencies[index]}/{target_currency}/1' ]
    first_look = True

    def parse(self, response):
        if self.first_look:
            data = Currency.objects.all()
            data.delete()
            self.first_look = False

        rate = response.css('#ctl00_M_lblToAmount::text').get()

        if rate != None:
            item = CurrencyItem()
            item['symbol'] = self.currencies[self.index]
            item['rate'] = float(rate)

            yield item

        self.index += 1
        if self.index < len(self.currencies):
            yield scrapy.Request(f'https://www.exchange-rates.org/converter/{self.currencies[self.index]}/{self.target_currency}/1', callback=self.parse)
