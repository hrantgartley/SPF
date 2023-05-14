

import random as r

def coin_flip():
    if r.randint(0,1) == 0:
        return 'Tails'
    else:
        return 'Heads'

if __name__ == '__main__':
    r.seed(5)  # Unique seed
    number_of_flips = int(input())
for i in range(number_of_flips):
    print(coin_flip())