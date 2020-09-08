import numpy as np
from pycoingecko import CoinGeckoAPI
cg = CoinGeckoAPI()

coins_list = cg.get_coins_list() #to extract relevant ids

tether = cg.get_coin_market_chart_range_by_id('tether','usd',1426377600,1599523200) #tether data 15.3.2015-8.9.2020
tether_mcap = np.array(tether['market_caps'])[:,1]
tether_mcap.tofile('tether_mcap.csv',sep=',') #update to save in order

usdc = cg.get_coin_market_chart_range_by_id('usd-coin','usd',1539129600,1599523200) #usdc data -8.9.2020
usdc_mcap = np.array(usdc['market_caps'])[:,1]
usdc_mcap.tofile('usdc_mcap.csv',sep=',')

dai = cg.get_coin_market_chart_range_by_id('dai','usd',1574380800,1599523200) #dai data -8.9.2020
dai_mcap = np.array(dai['market_caps'])[:,1]
dai_mcap.tofile('dai_mcap.csv',sep=',')

def total(): #function to calculate sum of marketcaps
    total = []
    for i in range(0,len(tether_mcap)): #longest array
        k = i - 1289 #differences in array length
        j = i - 1697
        if i > 1696:
            total.append(tether_mcap[i] + usdc_mcap[k] + dai_mcap[j]) #newest sum incl. dai
        elif i > 1288:
            total.append(tether_mcap[i] + usdc_mcap[k]) #mid sum incl usdc
        else:
            total.append(tether_mcap[i]) #oldest sum
    return total #list output
total_mcap = np.array(total())
total_mcap.tofile('total_mcap.csv',sep=',')

#format as 2 columns with UNIX timestamps

dominance = (tether_mcap/total_mcap)*100 
dominance.tofile('dominance.csv',sep=',')

