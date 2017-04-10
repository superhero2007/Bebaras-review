script = File.open("2015-CH-01.js","r").read.split("\n")


Dir.glob("graphics/*.b64") {|f|
  puts f
  b64 = File.open(f,"r").read
  name = f[9..-5]
  script.map!{|l|     (l=~/#{name}ImageData : "/) ? "        #{name}ImageData : \"#{b64}\","  : l  }
}

File.open("2015-CH-01.js","w").puts script

