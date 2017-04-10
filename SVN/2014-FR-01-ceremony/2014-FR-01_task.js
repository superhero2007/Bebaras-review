function getTask() {
   var paper = null;
   var dragAndDrop = null;
   var mode = "";
   var texts = [
      "Fireworks", // 0
      "Announce prize winner", // 1
      "Thank everyone", // 2
      "Long speech", // 3
      "Drum rolls", // 4
      "Minute of silence", // 5
      "Sing a song", // 6
      "10 minutes break", // 7
      "Play the clairon", // 8
      "Dance performance" // 9
   ];

   var edges = [
      [6, 7],
      [6, 4],
      [7, 5],
      [5, 3],
      [4, 9],
      [3, 9],
      [3, 1],
      [3, 0],
      [0, 2],
      [1, 2],
      [9, 8],
      [8, 0]
   ];

   var w = 220, h = 30;

   function getObject(id) {
      var r = paper.rect(-w/2,-h/2,w,h, h/5).attr('fill','#E0E0F8');
      var t = paper.text(0,0,texts[id]).attr({'font-size' : 15, 'font-weight' : 'bold'});
      $(t.node).css({
         "-webkit-touch-callout": "none",
         "-webkit-user-select": "none",
         "-khtml-user-select": "none",
         "-moz-user-select": "none",
         "-ms-user-select": "none",
         "user-select": "none",
         "cursor" : "default"
      });
      return [r, t];
   }

   return {
      load: function(random_seed, mode) {
         mode = mode;
         var paperWidth = w + 20, paperHeight = h * 10 + 20;
         paper = Raphael(document.getElementById('anim'),paperWidth, paperHeight);
         // TODO: à quoi servent ces deux lignes ?
         paper.rect(0,0,paperWidth, paperHeight);
         paper.rect(0,0,paperWidth, paperHeight);
      
         dragAndDrop = DragAndDropSystem({
            paper : paper,
            actionIfDropped : function(srcCont, srcPos, dstCont, dstPos, type) {
               $("#error").html("");
               $("#success").html("");
               if (dstCont == null)
                  return false;
               return true;
            }
         });
      
         dragAndDrop.addContainer({
            ident : 'seq',
            cx : paperWidth/2, cy : paperHeight/2,
            widthPlace : w, heightPlace : h, 
            nbPlaces : texts.length,
            direction : 'vertical',
            dropMode : 'insertBefore',
            placeBackgroundArray : []
         });
      
         for(var i = 0; i < texts.length; i++) {
            dragAndDrop.insertObject('seq',i, {ident : i, elements : getObject(i)});
         }
      },
      unload: function() {
         return true;
      },
      getAnswer: function() {
         return JSON.stringify(dragAndDrop.getObjects('seq'));
      },
      reloadAnswer: function(strAnswer) {
         var answer = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
         if (strAnswer != "") {
            answer = $.parseJSON(strAnswer);
         }
         for (var i = 0; i < texts.length; i++) {
            dragAndDrop.removeObject('seq', i);
         }
         for (var i = 0; i < texts.length; i++) {
            dragAndDrop.insertObject('seq',i, {ident : answer[i], elements : getObject(answer[i])});
         }
      },
      checkAnswer: function(strAnswer) {
         if (strAnswer == "") {
            return false;
         }
         var answer = $.parseJSON(strAnswer);
         var ranks = {};
         for (var iAnswer = 0; iAnswer < answer.length; iAnswer++) {
            ranks[answer[iAnswer]] = iAnswer;
         }
         for (var iEdge = 0; iEdge < edges.length; iEdge++) {
            var edge = edges[iEdge];
            if (ranks[edge[0]] > ranks[edge[1]]) {
               $("#error").html("Invalid order");
               return false;
            }
         }
         $("#success").html("Congratulations, you found a valid order!");
         platform.validate("done");
         return true;
      }
   }
};

var task = getTask();

var grader = {
   gradeTask: function(randomSeed, strAnswer, minScore, maxScore) {
      if (task.checkAnswer(strAnswer)) {
         return maxScore;
      } else {
         return minScore;
      }
   }
}
