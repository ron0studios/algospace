from decimal import *
import sys
getcontext().prec = 10000
sys.set_int_max_str_digits(10000)
n = int(input())
print(int((n*(n+1))/Decimal(2)))
if n%2 == 0:
  print("even")

