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

tusd = pd.read_csv('tusd_mcap.csv') 
tusd_lastrow = np.array(tusd.iloc[-1:]) #
tusd = cg.get_coin_market_chart_range_by_id(id='true-usd',vs_currency='usd',from_timestamp=int(tusd_lastrow[:,0]),to_timestamp=now) 
tusd_mcap = np.array(tusd['market_caps'])[:,1] 
tusd_unix = list(range(int(tusd_lastrow[:,0]),now,int((now-int(tusd_lastrow[:,0]))/len(tusd_mcap)+1))) 
tusd_mcap_pd = pd.DataFrame({'unix':tusd_unix,'tusd_mcap':tusd_mcap}) 
tusd_mcap_pd.to_csv('tusd_mcap.csv',sep=',',index=False,header=False,mode='a') 

susd = pd.read_csv('susd_mcap.csv') 
susd_lastrow = np.array(susd.iloc[-1:]) #
susd = cg.get_coin_market_chart_range_by_id(id='nusd',vs_currency='usd',from_timestamp=int(susd_lastrow[:,0]),to_timestamp=now) 
susd_mcap = np.array(susd['market_caps'])[:,1] 
susd_unix = list(range(int(susd_lastrow[:,0]),now,int((now-int(susd_lastrow[:,0]))/len(susd_mcap)+1))) 
susd_mcap_pd = pd.DataFrame({'unix':susd_unix,'susd_mcap':susd_mcap}) 
susd_mcap_pd.to_csv('susd_mcap.csv',sep=',',index=False,header=False,mode='a') 

pax = pd.read_csv('pax_mcap.csv') 
pax_lastrow = np.array(pax.iloc[-1:]) #
pax = cg.get_coin_market_chart_range_by_id(id='paxos-standard',vs_currency='usd',from_timestamp=int(pax_lastrow[:,0]),to_timestamp=now) 
pax_mcap = np.array(pax['market_caps'])[:,1] 
pax_unix = list(range(int(pax_lastrow[:,0]),now,int((now-int(pax_lastrow[:,0]))/len(pax_mcap)+1))) 
pax_mcap_pd = pd.DataFrame({'unix':pax_unix,'pax_mcap':pax_mcap}) 
pax_mcap_pd.to_csv('pax_mcap.csv',sep=',',index=False,header=False,mode='a') 

usdc = pd.read_csv('usdc_mcap.csv') 
usdc_lastrow = np.array(usdc.iloc[-1:]) #
usdc = cg.get_coin_market_chart_range_by_id(id='usd-coin',vs_currency='usd',from_timestamp=int(usdc_lastrow[:,0]),to_timestamp=now) 
usdc_mcap = np.array(usdc['market_caps'])[:,1] 
usdc_unix = list(range(int(usdc_lastrow[:,0]),now,int((now-int(usdc_lastrow[:,0]))/len(usdc_mcap)+1))) 
usdc_mcap_pd = pd.DataFrame({'unix':usdc_unix,'usdc_mcap':usdc_mcap}) 
usdc_mcap_pd.to_csv('usdc_mcap.csv',sep=',',index=False,header=False,mode='a') 

dai = pd.read_csv('dai_mcap.csv') 
dai_lastrow = np.array(dai.iloc[-1:]) #
dai = cg.get_coin_market_chart_range_by_id(id='dai',vs_currency='usd',from_timestamp=int(dai_lastrow[:,0]),to_timestamp=now) 
dai_mcap = np.array(dai['market_caps'])[:,1] 
dai_unix = list(range(int(dai_lastrow[:,0]),now,int((now-int(dai_lastrow[:,0]))/len(dai_mcap)+1))) 
dai_mcap_pd = pd.DataFrame({'unix':dai_unix,'dai_mcap':dai_mcap}) 
dai_mcap_pd.to_csv('dai_mcap.csv',sep=',',index=False,header=False,mode='a') 

print('lengths',len(tether_mcap_pd),len(tusd_mcap_pd),len(susd_mcap_pd),len(pax_mcap_pd),len(usdc_mcap_pd), len(dai_mcap_pd)) #output lengths for reference
S = min([tether_mcap_pd, tusd_mcap_pd, susd_mcap_pd, pax_mcap_pd, usdc_mcap_pd, dai_mcap_pd], key=len) #determine shortest dataset - to correct for differing lengths

def total(): #calculate sum of marketcaps
    total = []
    for i in range(0,len(S)): 
        total.append(tether_mcap[i] + tusd_mcap[i] + susd_mcap[i] + pax_mcap[i] + usdc_mcap[i] + dai_mcap[i]) 
    return total 
total_mcap = np.array(total())
total_mcap_pd = pd.DataFrame({'unix':S['unix'],'total_mcap':total_mcap})
total_mcap_pd.to_csv('total_mcap.csv',sep=',',index=False,header=False,mode='a')

#calculate new tether dominance - change to functional if mcap is greatest
dominance = (tether_mcap[0:len(S)]/total_mcap)*100 #corrected for length = len(S)
dominance_pd = pd.DataFrame({'unix':S['unix'],'tether_dominance':dominance})
dominance_pd.to_csv('tether_dominance.csv',sep=',',index=False,header=False,mode='a')
