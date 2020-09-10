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
tether_mcap = np.array(tether['market_caps'])[:,1]
tether_unix = list(range(int(tether_lastrow[:,1]),now,int((now-int(tether_lastrow[:,1]))/len(tether_mcap)+1)))
print(len(tether_mcap),len(tether_unix))
tether_mcap_pd = pd.DataFrame({'unix':tether_unix,'tether_mcap':tether_mcap})
print(tether_mcap_pd)

#save to .csv