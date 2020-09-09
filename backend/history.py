import numpy as np
import pandas as pd

from pycoingecko import CoinGeckoAPI
cg = CoinGeckoAPI()

tether = cg.get_coin_market_chart_range_by_id('tether','usd',1426377600,1599523200) #tether data 15.3.2015-8.9.2020
tether_mcap = np.array(tether['market_caps'])[:,1]
tether_unix = list(range(1427673600,1599523200,86400)) #offset 15x86400
tether_mcap_pd = pd.DataFrame({'unix':tether_unix,'tether_mcap':tether_mcap})
tether_mcap_pd.to_csv('tether_mcap.csv',sep=',')

tusd = cg.get_coin_market_chart_range_by_id('true-usd','usd',1521936000,1599523200) #tusd data 25.3.2018-8.9.2020
tusd_mcap = np.array(tusd['market_caps'])[:,1]
tusd_unix = list(range(1521849600,1599523200,86400)) #offset 1x86400
tusd_mcap_pd = pd.DataFrame({'unix':tusd_unix,'tusd_mcap':tusd_mcap})
tusd_mcap_pd.to_csv('tusd_mcap.csv',sep=',')

susd = cg.get_coin_market_chart_range_by_id('nusd','usd',1534204800,1599523200) #susd data 14.8.2018 -8.9.2020
susd_mcap = np.array(susd['market_caps'])[:,1]
susd_unix = list(range(1534204800,1599523200,86400))
susd_mcap_pd = pd.DataFrame({'unix':susd_unix,'susd_mcap':susd_mcap})
susd_mcap_pd.to_csv('susd_mcap.csv',sep=',')

pax = cg.get_coin_market_chart_range_by_id('paxos-standard','usd',1538006400,1599523200) #paxos-standard data 27.9.2018-8.9.2020
pax_mcap = np.array(pax['market_caps'])[:,1]
pax_unix = list(range(1537920000,1599523200,86400)) #offset 1x86400
pax_mcap_pd = pd.DataFrame({'unix':pax_unix,'pax_mcap':pax_mcap})
pax_mcap_pd.to_csv('pax_mcap.csv',sep=',')

usdc = cg.get_coin_market_chart_range_by_id('usd-coin','usd',1539129600,1599523200) #usdc data 10.10.2018-8.9.2020
usdc_mcap = np.array(usdc['market_caps'])[:,1]
usdc_unix = list(range(1539043200,1599523200,86400)) #offset 1x86400
usdc_mcap_pd = pd.DataFrame({'unix':usdc_unix,'usdc_mcap':usdc_mcap})
usdc_mcap_pd.to_csv('usdc_mcap.csv',sep=',')

dai = cg.get_coin_market_chart_range_by_id('dai','usd',1574380800,1599523200) #dai data 22.11.2019-8.9.2020
dai_mcap = np.array(dai['market_caps'])[:,1]
dai_unix = list(range(1574294400,1599523200,86400)) #offset 1x86400
dai_mcap_pd = pd.DataFrame({'unix':dai_unix,'dai_mcap':dai_mcap})
dai_mcap_pd.to_csv('dai_mcap.csv',sep=',')

#to add - busd, husd, mUSD, USDK, gUSD, SAI, EOSDT

def total(): #calculate sum of marketcaps
    total = []
    for i in range(0,len(tether_mcap)): #longest array
        j = i - 1697 #differences in array lengths (tether-X), sorted by newest - dai
        k = i - 1289 #usdc
        l = i - 1276 #pax
        p = i - 1233 #susd
        o = i - 1090 #tusd
        if i > 1696:
            total.append(tether_mcap[i] + tusd_mcap[o] + susd_mcap[p] + pax_mcap[l] + usdc_mcap[k] + dai_mcap[j]) #newest sum incl. dai
        elif i > 1288:
            total.append(tether_mcap[i] + tusd_mcap[o] + susd_mcap[p] + pax_mcap[l] + usdc_mcap[k]) 
        elif i > 1275:
            total.append(tether_mcap[i] + tusd_mcap[o] + susd_mcap[p] + pax_mcap[l])
        elif i > 1232:
            total.append(tether_mcap[i] + tusd_mcap[o] + susd_mcap[p])
        elif i > 1089:
            total.append(tether_mcap[i] + tusd_mcap[o])
        else:
            total.append(tether_mcap[i]) #oldest sum
    return total #list output

total_mcap = np.array(total())
total_mcap_pd = pd.DataFrame({'unix':tether_unix,'total_mcap':total_mcap})
total_mcap_pd.to_csv('total_mcap.csv',sep=',')

#Tether dominance calculater - change to functional if mcap is greatest
dominance = (tether_mcap/total_mcap)*100 
dominance_pd = pd.DataFrame({'unix':tether_unix,'tether_dominance':dominance})
dominance_pd.to_csv('tether_dominance.csv',sep=',')

#add stable coin protocol dominance - ETH/omni/EOS etc.
#add EUR/CHF/CAD
#add BTC protocol dominance vs. layer2 lighting/liquid/renbtc/wbtc