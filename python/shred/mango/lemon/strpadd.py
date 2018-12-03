"""String Padding and Alignment Test

"""


print('{:>10} ::= ' , '{:>10}'.format('test'))
print('{:<10} ::= ' , '{:<10}'.format('test'))

print('{:^10} ::= ', '{:^10}'.format('test'))

make_column = lambda x,y : "!:^{0}@".format(x).replace('!', '{').replace('@','}').format(y)
print("!:^{0}@".format(10).replace('!', '{').replace('@','}').format('test'))

print("|" + "|".join([make_column(x, y) for x, y in zip([10, 20, 30], ["test2", "test3", "test5"])]) + "|")

make_row = lambda arr1, arr2: "|" + "|".join([make_column(x, y) for x, y in zip(arr1, arr2)]) + "|"

make_bound = lambda x, y, z: x*y + x*(z+1)

print(make_bound("-",60, 3))

print(make_row([10, 20, 30], ["test2", "test3", "test5"]))
