from django.core.management.base import BaseCommand
from schedule import every, repeat, run_pending
import time
from scrapyd_api import ScrapydAPI
from api.models import Category

scrapyd = ScrapydAPI('http://localhost:6800')


class Command(BaseCommand):
    @repeat(every(1).hours)
    def update_currency_table():
        scrapyd.schedule(project='default', spider='currency')

    def category_table():
        categories = {'general': ['amazon'], 'phones': ['mobileshop', 'redmishope', 'electroplanet'],
                      'laptops': ['electroplanet'], 'accessories': ['electroplanet', 'myway']}

        # Clear category table
        data = Category.objects.all()
        data.delete()

        # Save data
        for category in categories:
            websites = categories.get(category)
            for website in websites:
                data = {'category': category, 'website': website}
                Category(**data).save()

    category_table()
    update_currency_table()

    def handle(self, *args, **options):
        while True:
            run_pending()
            time.sleep(1)
