n = int(input())
out = 0
for i in range(n+1):
  out += i
print(out)
if not n%2:
  print("even")