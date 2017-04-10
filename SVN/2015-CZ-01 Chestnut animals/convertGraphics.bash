# Use this with Linux and inkscape installed

for svg in `ls *.svg`
do
    echo "Making png of" $svg
    inkscape -D --export-dpi=100 --export-png=${svg:0:-3}png $svg
done


