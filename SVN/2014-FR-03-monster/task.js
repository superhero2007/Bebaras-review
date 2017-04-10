function getTask() {
   var mode = "";
   var nbColumns = 17;
   var nbLines = 17;
   var cellSize = 25;
   var margin = 10;
   var hasWall = [];
   var ghostMin = 0;
   var ghostMax = 126;
   var nbSteps = 0;
   var minNbSteps = 10000;
   var cells;

   var setClick = function(rect, iLig, iCol) {
      rect.node.onclick = function() {
         var rank = cellRank(iLig, iCol);
         if ((rank >= 0) && (!hasWall[rank])) {
            nbSteps++;
            hasWall[rank] = true;
            if ((rank >= ghostMin) && (rank <= ghostMax)) {
               if ((rank - ghostMin) > (ghostMax - rank)) {
                  ghostMax = rank - 1;
               } else {
                  ghostMin = rank + 1;
               }
            }
         }
         updateColors()
         if (ghostMin >= ghostMax) {
            var plural = "";
            if (nbSteps > 1) {
               plural = "s";
            }
            minNbSteps = Math.min(minNbSteps, nbSteps);
            var msg = "Your best result so far is " + minNbSteps + " blocks.<br>";
            if (nbSteps > 6) {
               msg += "You can do even better.";
            } else {
               msg += "Congratulations, this is the best solution!";
            }
            $("#best").html(msg);
            $("#success").html("You have captured the monster with " + nbSteps + " block" + plural);
         }
      }
   }

   var updateColors = function() {
      var plural = "";
      if (nbSteps > 1) {
         plural = "s";
      }
      $("#status").html(nbSteps + " block" + plural + " used");
      for(var iLig = 0; iLig < nbLines; iLig++) {
         for(var iCol = 0; iCol < nbColumns; iCol++) {
            var rank = cellRank(iLig, iCol);
            var fill = 'gray';
            if (hasWall[rank]) {
               fill = 'red';
            } else if (rank >= 0) {
               if ((rank >= ghostMin) && (rank <= ghostMax)) {
                  fill = 'yellow';
               } else {
                  fill = 'white';
               }
            }
            cells[iLig][iCol].attr({fill: fill});
         }
      }
   }

   var cellRank = function(iLig, iCol) {
      if ((iLig == 0) || (iLig == nbLines - 1) || (iCol == 0) || (iCol == nbColumns - 1)) {
         return -1;
      }
      var ligDiv4 = Math.floor(iLig / 4);
      if ((iLig % 4 == 0) && (iCol == 1)) {
         return ligDiv4 * 32 - 1;
      }
      if ((iLig % 4 == 2) && (iCol == nbColumns - 2)) {
         return 16 + ligDiv4 * 32 - 1;
      }
      if (iLig % 4 == 1) {
         return ligDiv4 * 32 + (iCol - 1);
      }
      if (iLig % 4 == 3) {
         return ligDiv4 * 32 + 16 + (nbColumns - iCol - 2);
      }
      return -1;
   }

  return {
      load: function(random_seed, mode) {
         var that = this;

         this.mode = mode;
         paper = Raphael(document.getElementById('anim'),nbColumns * cellSize + 2 * margin, nbLines * cellSize + 2 * margin);

         var setRectGrille = paper.set();
         cells = [];
         for(var iLig = 0; iLig < nbLines; iLig++) {
            cells[iLig] = [];
            for(var iCol = 0; iCol < nbColumns; iCol++) {
               var rect = paper.rect(margin + iCol * cellSize, margin + iLig * cellSize, cellSize, cellSize);
               cells[iLig].push(rect);
               var fill = 'yellow';
               if (cellRank(iLig, iCol) == -1) {
                  fill = 'gray';
               }
               rect.attr({'stroke': 'black', 'fill': fill});
               setClick(rect, iLig, iCol);
               setRectGrille.push(rect);
            }
         }
         updateColors();
      },
      unload: function() {
      },
      getAnswer: function() {
      },
      reloadAnswer: function() {
      },
      restart: function() {
         hasWall = [];
         ghostMin = 0;
         ghostMax = 126;
         nbSteps = 0;
         updateColors();
         $("#success").html("");
      }
  }
}

var task = getTask();
