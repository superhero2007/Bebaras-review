class Graphics
  def initialize(file, coordinates, viewboxy=-0.1, viewboxh=0.4, offset=0.1)
    @file = file
    @coords = coordinates
    @offset = offset
    @viewboxy = viewboxy
    @viewboxh = viewboxh
  end

  def header(n)    
    width = 640
    dim = "width='#{width}' height='#{width/(n+(n-1)*@offset+0.1)*@viewboxh}' "
    '<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  '+dim+' viewBox="'+"-0.05 #{@viewboxy} #{n+(n-1)*@offset+0.1} #{@viewboxh}"+'">
   <defs>
    <linearGradient
       id="linearGradient5313">
      <stop
         id="stop5315"
         style="stop-color:#c5ab25;stop-opacity:1"
         offset="0" />
    </linearGradient>
    <linearGradient
       id="linearGradient5305">
      <stop
         id="stop5307"
         style="stop-color:#c5ab25;stop-opacity:1"
         offset="0" />
    </linearGradient>
    <linearGradient
       id="linearGradient3795">
      <stop
         id="stop3797"
         style="stop-color:#b7a43e;stop-opacity:1"
         offset="0" />
      <stop
         id="stop3799"
         style="stop-color:#62440d;stop-opacity:1"
         offset="1" />
    </linearGradient>
    <linearGradient
       id="linearGradient3781">
      <stop
         id="stop3783"
         style="stop-color:#33200e;stop-opacity:1"
         offset="0" />
      <stop
         id="stop3793"
         style="stop-color:#64421f;stop-opacity:1"
         offset="0.19318181" />
      <stop
         id="stop3791"
         style="stop-color:#26180a;stop-opacity:1"
         offset="0.43181819" />
      <stop
         id="stop3785"
         style="stop-color:#95661f;stop-opacity:1"
         offset="1" />
    </linearGradient>
    <linearGradient
       id="linearGradient3759">
      <stop
         id="stop3761"
         style="stop-color:#613e1e;stop-opacity:1"
         offset="0" />
      <stop
         id="stop3775"
         style="stop-color:#ca6e1a;stop-opacity:1"
         offset="0.125" />
      <stop
         id="stop3773"
         style="stop-color:#5f3915;stop-opacity:1"
         offset="0.25" />
      <stop
         id="stop3769"
         style="stop-color:#cc701a;stop-opacity:1"
         offset="0.5" />
      <stop
         id="stop3771"
         style="stop-color:#4b2e11;stop-opacity:1"
         offset="0.75" />
      <stop
         id="stop3777"
         style="stop-color:#bf6f19;stop-opacity:1"
         offset="0.875" />
      <stop
         id="stop3763"
         style="stop-color:#3e2b17;stop-opacity:1"
         offset="1" />
    </linearGradient>
    <radialGradient
       cx="0.0703125"
       cy="0.013671875"
       r="0.0390625"
       fx="0.0703125"
       fy="0.013671875"
       id="radialGradient3767"
       xlink:href="#linearGradient3759"
       gradientUnits="userSpaceOnUse"
       gradientTransform="matrix(1,0,0,2.25,0,-0.01708984)" />
    <linearGradient
       x1="0.46484375"
       y1="-0.07421875"
       x2="0.46484375"
       y2="0.09765625"
       id="linearGradient3787"
       xlink:href="#linearGradient3781"
       gradientUnits="userSpaceOnUse" />
    <linearGradient
       x1="0.91184264"
       y1="-0.017757494"
       x2="0.98246491"
       y2="0.028520407"
       id="linearGradient5321"
       xlink:href="#linearGradient3795"
       gradientUnits="userSpaceOnUse" />
     <g
     transform="translate(-0.00390625,-1051.3701)"
     id="iter0">
    <rect
       width="0.83984375"
       height="0.171875"
       x="0.05859375"
       y="-0.078125"
       transform="matrix(0.94883721,0,0,1,-0.02043968,1051.3622)"
       id="rect3779"
       style="fill:url(#linearGradient3787);fill-opacity:1;fill-rule:nonzero;stroke:none" />
    <path
       d="M 1.0072446,0.03109136 0.90234375,-0.08203125 0.90193076,0.13821429 z"
       transform="matrix(1.6564455,0,0,0.79813145,-0.66196789,1051.3456)"
       id="path2987"
       style="fill:url(#linearGradient5321);fill-opacity:1;stroke:none" />
    <path
       d="m 0.109375,0.01367188 a 0.0390625,0.08789062 0 1 1 -0.078125,0 0.0390625,0.08789062 0 1 1 0.078125,-1e-8 z"
       transform="translate(-0.02734375,1051.3583)"
       id="path3757"
       style="fill:url(#radialGradient3767);fill-opacity:1;fill-rule:nonzero;stroke:none" />
  </g>
' + '<linearGradient id="mycrosshatched" x1="0" y1="0" x2="0.08" y2="0.04" spreadMethod="repeat" gradientUnits="userSpaceOnUse">
      <stop style="stop-color:#ffffff;stop-opacity:0.95" offset="0" />
      <stop style="stop-color:#ffffff;stop-opacity:0.9" offset="0.1" />
      <stop style="stop-color:#ffffff;stop-opacity:0.55" offset="0.4" />
      <stop style="stop-color:#ffffff;stop-opacity:0.5" offset="0.5" />
      <stop style="stop-color:#ffffff;stop-opacity:0.55" offset="0.6" />
      <stop style="stop-color:#ffffff;stop-opacity:0.9" offset="0.9" />
      <stop style="stop-color:#ffffff;stop-opacity:0.95" offset="1" />
    </linearGradient>
'

  end

  def makeDefs(n)
    res = ""
    1.upto(n){|i|
      res+="<g id='iter#{i}'>\n"
      (@coords.size-1).times{|j|
        res += "<use xlink:href='#iter#{i-1}' transform='matrix("
        dx = @coords[j+1][0]-@coords[j][0]
        dy = @coords[j+1][1]-@coords[j][1]
        res += "#{dx}, "
        res += "#{dy}, "
        res += "#{-dy}, "
        res += "#{dx}, "
        res += "#{@coords[j][0]}, "
        res += "#{@coords[j][1]})' />\n"
      }
      res += "</g>\n"
      if (i>1)
        res+="<g id='iterexplain#{i}'>\n"
        (@coords.size-1).times{|j|
          res += "<use xlink:href='#iterexplain#{i-1}' transform='matrix("
          dx = @coords[j+1][0]-@coords[j][0]
          dy = @coords[j+1][1]-@coords[j][1]
          res += "#{dx}, "
          res += "#{dy}, "
          res += "#{-dy}, "
          res += "#{dx}, "
          res += "#{@coords[j][0]}, "
          res += "#{@coords[j][1]})' />\n"
        }
        res += "</g>\n"
      else
        res+="<g id='iterexplain1'>\n"
        res += "<use xlink:href='#iter0' x='0' y='0'/>\n"
        res += "<rect x='0' y='-0.09' width='1' height='0.18' fill='url(#mycrosshatched)' stroke='none'/>\n"
        res += "<use xlink:href='#iter1' x='0' y='0'/>\n"
        res += "</g>\n"
      end
    }
    return res
  end
  
  def save(n, saveiter=true, saveexplain=true)
    html = ""
    res = header(n)+makeDefs(n)+" </defs>\n"
    n.times{|i|
      use = "<use xlink:href='#iter#{i}' x='#{i+i*@offset}' y='0' />\n"
      res += use
      if (saveiter)
        use = "<use xlink:href='#iter#{i}' x='0' y='0' />\n"
        File.open(@file.gsub(/\.svg/, "-iter#{i}.svg"), "w"){|f| f.puts header(1)+makeDefs(i)+"</defs>\n"+use+"</svg>\n"}
      end
      if (saveexplain && i>=1)
        use = "<use xlink:href='#iterexplain#{i}' x='0' y='0' />\n"
        File.open(@file.gsub(/\.svg/, "-explain-iter#{i}.svg"), "w"){|f| f.puts header(1)+makeDefs(i)+"</defs>\n"+use+"</svg>\n"}        
        html += "<img src='#{@file.gsub(/\.svg/, "-explain-iter#{i}.svg")}'>"
      end
    }    
    if (saveexplain)
      html+="<br/>\n";
    end
    res += "</svg>\n"
    puts "<h1>#{@file}</h1>\n"
    File.open(@file, "w"){|f| f.puts res}
    puts "<img src='#{@file}'/><br/>\n"
    puts html
  end

end

n=3

Graphics.new("2014-CH-01-koch-curve.svg", 
             [[0.0,0.0],
              [1.0/3.0,0.0],
              [0.5,Math.sqrt(3)/6.0],
              [2.0/3.0,0.0],
              [1.0,0.0]]).save(n)

alpha = 80.0/180*Math::PI
x = 0.5/(1.0+Math.cos(alpha))
y = Math.sin(alpha)*x


Graphics.new("2014-CH-01-koch-general80.svg", 
             [[0.0,0.0],
              [x,0.0],
              [0.5,y],
              [1-x,0.0],
              [1.0,0.0]],-0.1,0.6).save(n)

alpha = 30.0/180*Math::PI
x = 0.5/(1.0+Math.cos(alpha))
y = Math.sin(alpha)*x


Graphics.new("2014-CH-01-koch-general30.svg", 
             [[0.0,0.0],
              [x,0.0],
              [0.5,y],
              [1-x,0.0],
              [1.0,0.0]]).save(n,-0.1,0.3)

alpha = 35.0/180*Math::PI
x = 1.0/(2.0+1.0/Math.cos(alpha))
y = Math.tan(alpha)*x

Graphics.new("2014-CH-01-kohl.svg", 
             [[0.0,0.0],
              [x,y],
              [1.0-x, y],
              [1.0,0.0]],-0.1, 0.5).save(n)


alpha = 35.0/180*Math::PI
x = 0.5/(1.0+1.0/Math.cos(alpha))
y = Math.tan(alpha)*x

Graphics.new("2014-CH-01-four-kohl.svg", 
             [[0.0,0.0],
              [x,y],
              [0.5,y],
              [1.0-x, y],
              [1.0,0.0]],-0.1, 0.5).save(n)

Graphics.new("2014-CH-01-zigzag.svg", 
             [[0.0,0.0],
              [0.4,0.2],
              [0.6,-0.2],
              [1.0,0.0]],-0.3, 0.6).save(n)




Graphics.new("2014-CH-01-square.svg", 
             [[0.0,0.0],
              [1.0/3.0,0.0],
              [1.0/3.0,1.0/3.0],
              [2.0/3.0,1.0/3.0],
              [2.0/3.0,0.0],
              [1.0,0.0]],-0.1, 0.7).save(n)


y = Math.sqrt(0.25**2-0.125**2)

Graphics.new("2014-CH-01-kohl2.svg", 
             [[0.0,0.0],
              [0.25,0.0],
              [0.375,y],
              [0.625,y],
              [0.75,0.0],
              [1.0,0.0]],-0.1, 0.6).save(n)


Graphics.new("2014-CH-01-double-triangle.svg", 
             [[0.0,0.0],
              [0.25,0.2],
              [0.5,0],
              [0.75,0.2],
              [1.0,0.0]],-0.1, 0.6).save(n)


Graphics.new("2014-CH-01-four-zigzag.svg", 
             [[0.0,0.0],
              [0.25,0.2],
              [0.5,0],
              [0.75,-0.2],
              [1.0,0.0]],-0.3, 0.6).save(n)

x = 0.28 # > 0.25
d = (1-x)/2.0
dx = (0.75*x*x+d*d)/(2*d)
y = Math.sqrt(x**2-dx**2)

Graphics.new("2014-CH-01-something.svg", 
             [[0.0,0.0],
              [x,0.0],
              [x+dx,y],
              [1-dx,-y],
              [1.0,0.0]],-0.25, 0.5).save(n)

Graphics.new("2014-CH-01-something-reverse.svg", 
             [[0.0,0.0],
              [dx,y],
              [1-x-dx,-y],
              [1-x,0.0],
              [1.0,0.0]],-0.4, 0.8).save(n)


Graphics.new("2014-CH-01-something-else.svg", 
             [[0.0,0.0],
              [0.3,0.0],
              [0.6,0.0],
              [0.8,Math.sqrt(0.3**2-0.2**2)],
              [1.0,0.0]],-0.25, 0.5).save(n)











