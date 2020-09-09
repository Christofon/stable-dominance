import numpy as np
import pandas as pd
import time

from pycoingecko import CoinGeckoAPI
cg = CoinGeckoAPI()
now = int(time.time()) #current unix time

tether = pd.read_csv('tether_mcap.csv') #read old data
tether_lastrow = np.array(tether.iloc[-1:]) #get last row
print(int(tether_lastrow[:,1])) #[:,1] #0 = counter, 1 = unix, 2 = mcap

#get newest data in usable format
tether = cg.get_coin_market_chart_range_by_id(id='tether',vs_currency='usd',from_timestamp=int(tether_lastrow[:,1]),to_timestamp=now) 


#save to .csv