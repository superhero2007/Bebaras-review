import sys

if len(sys.argv) != 4:
	print 'Usage: python gen.py <rows> <cols> <color>'
	sys.exit()

rows = int(sys.argv[1])
cols = int(sys.argv[2])
shade = sys.argv[3]

side = 30
line = 1

h = rows * side + 2 * line
w = cols * side + 2 * line

print '<?xml version="1.0"?>'
print '<svg version="1.1" xmlns="http://www.w3.org/2000/svg">'
for r in range(rows):
	for c in range(cols):
		x = c * side + line
		y = r * side + line
		print '<rect x="' + str(x) + '" y="' + str(y) + '" width="' + str(side) + '" height="' + str(side) + '" fill="' + shade + '" stroke="black" stroke-width="' + str(line) + '" />'
print '<rect x="' + str(line) + '" y="' + str(line) + '" width="' + str(cols * side) + '" height="' + str(rows * side) + '" fill="none" stroke="black" stroke-width="' + str(2 * line) + '" />'
print '</svg>'
