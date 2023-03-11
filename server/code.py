def a(n):
   if n == 0:
      return 0 
   return n+a(n-1)

x = int(input())
print(a(x))
print("even" if x%2==0 else "odd")
