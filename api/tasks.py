from schedule import every, repeat, run_pending
import time
from scrapyd_api import ScrapydAPI

scrapyd = ScrapydAPI('http://localhost:6800')

@repeat(every(1).hours)
def job():
    scrapyd.schedule(project='default', spider='currency')

while True:
    run_pending()
    time.sleep(1)
