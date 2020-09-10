import numpy as np
import pandas as pd
import time

from pycoingecko import CoinGeckoAPI
cg = CoinGeckoAPI()
now = int(time.time()) #current unix time
print('now', now)
tether = pd.read_csv('tether_mcap.csv') #read old data
tether_lastrow = np.array(tether.iloc[-1:]) #get last row [:,0] 0 = unix, 1 = mcap
tether = cg.get_coin_market_chart_range_by_id(id='tether',vs_currency='usd',from_timestamp=int(tether_lastrow[:,0]),to_timestamp=now) #get new data

#possible point of error if called too often?
tether_mcap = np.array(tether['market_caps'])[:,1] #formatting new mcap 
###

tether_unix = list(range(int(tether_lastrow[:,0]),now,int((now-int(tether_lastrow[:,0]))/len(tether_mcap)+1))) #formatting new unix
tether_mcap_pd = pd.DataFrame({'unix':tether_unix,'tether_mcap':tether_mcap}) #repackage as pandas
tether_mcap_pd.to_csv('tether_mcap.csv',sep=',',index=False,header=False,mode='a') #mode = 'a' append to existing csv
print(len(tether_mcap_pd))

tusd = pd.read_csv('tusd_mcap.csv') 
tusd_lastrow = np.array(tusd.iloc[-1:]) #
tusd = cg.get_coin_market_chart_range_by_id(id='true-usd',vs_currency='usd',from_timestamp=int(tusd_lastrow[:,0]),to_timestamp=now) 
tusd_mcap = np.array(tusd['market_caps'])[:,1] 
tusd_unix = list(range(int(tusd_lastrow[:,0]),now,int((now-int(tusd_lastrow[:,0]))/len(tusd_mcap)+1))) 
tusd_mcap_pd = pd.DataFrame({'unix':tusd_unix,'tusd_mcap':tusd_mcap}) 
tusd_mcap_pd.to_csv('tusd_mcap.csv',sep=',',index=False,header=False,mode='a') 
print(len(tusd_mcap_pd))

susd = pd.read_csv('susd_mcap.csv') 
susd_lastrow = np.array(susd.iloc[-1:]) #
susd = cg.get_coin_market_chart_range_by_id(id='nusd',vs_currency='usd',from_timestamp=int(susd_lastrow[:,0]),to_timestamp=now) 
susd_mcap = np.array(susd['market_caps'])[:,1] 
susd_unix = list(range(int(susd_lastrow[:,0]),now,int((now-int(susd_lastrow[:,0]))/len(susd_mcap)+1))) 
susd_mcap_pd = pd.DataFrame({'unix':susd_unix,'susd_mcap':susd_mcap}) 
susd_mcap_pd.to_csv('susd_mcap.csv',sep=',',index=False,header=False,mode='a') 
print(len(susd_mcap_pd))

pax = pd.read_csv('pax_mcap.csv') 
pax_lastrow = np.array(pax.iloc[-1:]) #
pax = cg.get_coin_market_chart_range_by_id(id='paxos-standard',vs_currency='usd',from_timestamp=int(pax_lastrow[:,0]),to_timestamp=now) 
pax_mcap = np.array(pax['market_caps'])[:,1] 
pax_unix = list(range(int(pax_lastrow[:,0]),now,int((now-int(pax_lastrow[:,0]))/len(pax_mcap)+1))) 
pax_mcap_pd = pd.DataFrame({'unix':pax_unix,'pax_mcap':pax_mcap}) 
pax_mcap_pd.to_csv('pax_mcap.csv',sep=',',index=False,header=False,mode='a') 
print(len(pax_mcap_pd))

usdc = pd.read_csv('usdc_mcap.csv') 
usdc_lastrow = np.array(usdc.iloc[-1:]) #
usdc = cg.get_coin_market_chart_range_by_id(id='usd-coin',vs_currency='usd',from_timestamp=int(usdc_lastrow[:,0]),to_timestamp=now) 
usdc_mcap = np.array(usdc['market_caps'])[:,1] 
usdc_unix = list(range(int(usdc_lastrow[:,0]),now,int((now-int(usdc_lastrow[:,0]))/len(usdc_mcap)+1))) 
usdc_mcap_pd = pd.DataFrame({'unix':usdc_unix,'usdc_mcap':usdc_mcap}) 
usdc_mcap_pd.to_csv('usdc_mcap.csv',sep=',',index=False,header=False,mode='a') 
print(len(usdc_mcap_pd))

dai = pd.read_csv('dai_mcap.csv') 
dai_lastrow = np.array(dai.iloc[-1:]) #
dai = cg.get_coin_market_chart_range_by_id(id='dai',vs_currency='usd',from_timestamp=int(dai_lastrow[:,0]),to_timestamp=now) 
dai_mcap = np.array(dai['market_caps'])[:,1] 
dai_unix = list(range(int(dai_lastrow[:,0]),now,int((now-int(dai_lastrow[:,0]))/len(dai_mcap)+1))) 
dai_mcap_pd = pd.DataFrame({'unix':dai_unix,'dai_mcap':dai_mcap}) 
dai_mcap_pd.to_csv('dai_mcap.csv',sep=',',index=False,header=False,mode='a') 
print(len(dai_mcap_pd))

#calculate new data total mcap - correct for different lengths of new data?
#calculate new data dominance
#append to existing .csv
