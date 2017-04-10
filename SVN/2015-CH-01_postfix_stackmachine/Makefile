JS = 2015-CH-01.js

all:	$(JS)

.PHONY:	$(JS)

$(JS):	
	$(MAKE) -C graphics
	ruby includeImages.rb


clean:
	rm -f *~
	$(MAKE) -C graphics clean
