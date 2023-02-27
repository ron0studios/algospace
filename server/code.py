from decimal import *
getcontext().prec = 10000
n = int(input())
print(int((n*(n+1))/Decimal(2)))
if n%2 == 0:
  print("even")