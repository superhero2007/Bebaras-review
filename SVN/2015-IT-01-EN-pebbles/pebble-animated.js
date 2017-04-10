const NBOXES=8;

function coordx(box,nth) {
  return (nth%4 +1)*16+box*74;
}

function coordy(box,nth) {
  return 88 - Math.floor(nth/4)*16;
}


function Board(n, init) {
  this.buckets = new Array(n);
  this.is_blocked = function (){
    for(var i = 1; i < this.buckets.length; i++) {
      if (this.buckets[i] == i)
       return false;	    
   }
   return true;
 };

 this.sum = function (){
  var s = 0;
  for(var i = 1; i < this.buckets.length; i++) {
    s += this.buckets[i];
  }
  return s;
};

this.empty = function (j){
  console.assert(j > 0 && j < this.buckets.length, j + " is not valid");
  if (this.buckets[j] == j) {
    this.buckets[j] = 0;
    for(var k = j - 1; k >= 0; k--) {
     this.buckets[k] += 1;
   }
   return true;
 }
 return false;
};

this.is_victory = function (){
  for(var i = 1; i < this.buckets.length; i++) {
    if (this.buckets[i] != 0)
     return false;	    
 }
 return true;
};

this.is_solvable = function() {
  var copy = this.buckets.slice(0);
  while (!this.is_blocked()) {
    for(var i = 1; i < this.buckets.length; i++) {
     if (this.empty(i)) {
       break;
     }
   }
 }
 var r = this.is_victory();
 delete this.buckets;
 this.buckets = copy;
 return r;
};

    // initialization
    if (init === undefined) {
      do {
      this.buckets[0] = 0; // out of board
      for(var i = 1; i < this.buckets.length; i++) {
       this.buckets[i] = Math.floor(Math.random() * (i + 1));
     }

    } while (this.sum() < NBOXES // too easy !
      || this.is_blocked()
	     // change this if you want unsolvable puzzles!
	     || !this.is_solvable());  
  } else {
    console.assert(init.length == n && init[0] == 0, "Invalid initialization!");  
    this.buckets = init;
  }
  return this;  
}

function pebble() {

  var b = new Board(NBOXES);
  var boxes = new Array(b.buckets.length);
  
  var paper = Raphael("canvas", 640, 800);
  const WUNIT = Math.ceil(((paper.width / b.buckets.length) - 5) / 19);
  console.assert(WUNIT > 0, "canvas too small");
  const NROWS = Math.ceil(b.sum() / 4);
  const HMAX =  17*6;//NROWS * (5 * WUNIT + 1);
  console.assert(HMAX <= paper.height, "canvas too small");
  const WBOX = 4 * 4 * WUNIT + 5;

  function act_on(x) {
    return function() {
      if (b.buckets[x] == x) {
       update_visibility(x);
     } else {
       alert("This box cannot be emptied!");
     }
 
   };
 }

 function update_visibility(x) {
   for(var i = 0; i<x ; i++) {
     var first_free = b.buckets[i];
     var t = boxes[x].pop();
     if (i==0)
      t.animate({"fill":"blue","cx":coordx(i,b.buckets[i]), "cy":coordy(i,b.buckets[i])},500+x*200,">",
        function() {if (b.is_victory()) {
     var t = paper.text(0,0,"Victory!");
        t.animate({"x":250,"y":180,"font-size":65,"stroke-width":2,"fill":"yellow","stroke":"red"},1000,"easyin");
        } else {
       if (b.is_blocked()) {
        var t = paper.text(0,0,"You lose!");
        t.animate({"x":250,"y":180,"font-size":65,"stroke-width":2,"fill":"yellow","stroke":"red"},1000,"easyin");
       }
     }});
     else
      t.animate({"cx":coordx(i,b.buckets[i]), "cy":coordy(i,b.buckets[i])},400+x*200,">");
     b.buckets[i]+=1;
     boxes[i].push(t);
     b.buckets[x]-=1;
   }

 }

 for(var i = 0; i < b.buckets.length; i++) {
    var start = WUNIT + i * (1 + WUNIT + WBOX);
    var bpath = Raphael.format("M{0},{1}v{2}h{3}v{4}", 
     start, 0,
     HMAX, WBOX+WUNIT, -HMAX);
    var path = paper.path(bpath).attr("stroke-width", WUNIT);
    boxes[i] = paper.set();
    boxes[i].push(path);
    var n = paper.text((boxes[i].getBBox().x + boxes[i].getBBox().x2) / 2,
      boxes[i].getBBox().y2 + 3 * WUNIT, i);
    if (i == 0) n.hide();
    else {
      n.attr({"font-size":"18"}).click(act_on(i));}
    
    for(var j = 0; j < b.buckets[i]; j++) {
      var c = j % 4;
      var r = Math.floor(j / 4);
      var circle = paper.circle(coordx(i,j),
        coordy(i,j), 2 * WUNIT);
      if (i == 0) {
       circle.attr("fill", "blue");
     } else {
       circle.attr("fill", "red");
     }
     circle.attr("stroke", "white");

     boxes[i].push(circle);
    }
  }

/* // brute force search for solvable puzzles...  
    var a,b,c,d,e,f,g;
    var count = 0;

    for(a = 0; a < 8; a++) {
      for(b = 0; b < 7; b++) {
	for(c = 0; c < 6; c++) {
	  for(d = 0; d < 5; d++) {
	    for(e = 0; e < 4; e++) {
	      for(f = 0; f < 3; f++) {
		for(g = 0; g < 2; g++) {
		    var p = new Board(8, [0, g, f, e, d, c, b, a]);
		    if (p.is_solvable()) {
		      count += 1;
		      console.log("" + count + " " + p.buckets + " (" + p.sum() + ") "); 
		    }
		}
	      }
	    }
	  }
	}
      }
    }
    */
}
