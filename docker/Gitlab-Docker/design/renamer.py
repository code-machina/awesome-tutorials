import os
import glob

# Get Current Directory Path
print()
cur = os.path.dirname(__file__)
os.chdir(cur)

# Order by file timestamp

files = glob.glob("*.png")
files.sort(key=os.path.getmtime)
# print(files)

for i, fn in enumerate(files):
    print(i, fn, os.path.getmtime(fn))
    os.rename(fn, "Step-{0:03d}.png".format(i))
