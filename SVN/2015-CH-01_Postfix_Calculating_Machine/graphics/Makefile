SVG = $(wildcard *.svg)
PNG = $(patsubst %.svg,%.png,$(SVG))
B64 = $(patsubst %.svg,%.b64,$(SVG))

all:	$(B64)


%.png:	%.svg
	inkscape -e $@ $<

%.b64:	%.png
	echo -n "data:image/png;base64," > $@ && base64 -w 0 $< >> $@


clean:	
	rm -f $(PNG) $(B64) *~
