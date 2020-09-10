import numpy as np
import pandas as pd
import time

from pycoingecko import CoinGeckoAPI
cg = CoinGeckoAPI()
now = int(time.time()) #current unix time

tether = pd.read_csv('tether_mcap.csv') #read old data
tether_lastrow = np.array(tether.iloc[-1:]) #get last row [:,0] 0 = unix, 1 = mcap
tether = cg.get_coin_market_chart_range_by_id(id='tether',vs_currency='usd',from_timestamp=int(tether_lastrow[:,0]),to_timestamp=now) #get new data

#possible point of error if called too often?
tether_mcap = np.array(tether['market_caps'])[:,1] #formatting new mcap 
###

tether_unix = list(range(int(tether_lastrow[:,0]),now,int((now-int(tether_lastrow[:,0]))/len(tether_mcap)+1))) #formatting new unix
tether_mcap_pd = pd.DataFrame({'unix':tether_unix,'tether_mcap':tether_mcap}) #repackage as pandas
tether_mcap_pd.to_csv('tether_mcap.csv',sep=',',index=False,header=False,mode='a') #mode = 'a' append to existing csv