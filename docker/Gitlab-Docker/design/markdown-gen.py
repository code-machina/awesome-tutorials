#
# 일정 반복되는 문자열을 찍어낸다.
# usage: python markdown-gen.py | clip

import os

for x in range(0, 41): # it will produces number list, which has range from 0 to 40.
    print("-----")
    print("![Step-{0:03d}](./Step-{0:03d}.png)".format(x))
