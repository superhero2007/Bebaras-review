// TODO : do not use jquery
var platform = {
   taskHtml: "",
   solutionHtml: "",
   taskMode: "task",
   checkAnswerInteral: null,
   savedAnswer: "",
   hasAnswerChanged: true,
   load: function() {
      this.checkAnswerInterval = setInterval(this.checkAnswerChanged, 1000);
      this.taskHtml = $("#task").html();
      if (json.status == "evaluation") {
         var title = json.id.split('/');
         title = title[title.length - 2];
         var header = "<h2>" + title + "</h2>";
         var getDifficulty = function(level) {
            if ((json.difficulty == undefined) || (json.difficulty[level] == undefined)) {
               return "---"
            }
            return json.difficulty[level];
         }
         var getChecked = function(type) {
            if ((json.categories == undefined) || (json.categories[type] == undefined) || (!json.categories[type])) {
               return "";
            }
            return "checked";
         }
         var getLicense = function(license) {
            var text = license + " (unknown)";
            if (license == "CC BY-SA 3.0") {
               text = "Copyright 2014 Bebras - International Contest on Informatics and Computer Fluency.<br/>" +
                  "This work is licensed under <a href='http://creativecommons.org/licenses/by-sa/3.0/'>Creative Commons Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0)</a>.";
            }
            return text;
         }
         header += "<table style='width:100%' class='borders' cellspacing='0'>" +
         "<tr>" +
         "<td>0 " + getDifficulty(0) + "</td>" +
         "<td>I " + getDifficulty(1) + "</td>" +
         "<td>II " + getDifficulty(2) + "</td>" +
         "<td>III " + getDifficulty(3) + "</td>" +
         "<td>IV " + getDifficulty(4) + "</td>" +
         "</tr>" +
         "</table>";

         header += "<table style='width:100%;' class='borders' cellspacing='0'>" +
            "<tr>" +
               "<td><input type='checkbox' " + getChecked("ALG") + ">ALG</td>" +
               "<td><input type='checkbox'" + getChecked("INF") + ">INF</td>" +
               "<td><input type='checkbox' " + getChecked("STRUC") + ">STRUC</td>" +
               "<td><input type='checkbox' " + getChecked("PUZ") + ">PUZ</td>" +
               "<td><input type='checkbox' " + getChecked("SOC") + ">SOC</td>" +
               "<td><input type='checkbox' " + getChecked("USE") + ">USE</td>" +
            "</tr>" +
            "</table>";

         header += "<p><b>Answer type:</b> " + json.answerType + "</p>";
         header += "<p><b>Authors:</b> " + json.authors + "</p>";
         header += "<p><b>License :</b> " + getLicense(json.license) + "</p>";
         header += "<hr/>";
         this.taskHtml = header + this.taskHtml;
      }
      if (task.displayMessage == undefined) {
         this.taskHtml += "<center><span id='platform_validate'></span><span id='platform_cancel'></span><span id='platform_saved'></span><span id='platform_changed'></span><span id='platform_deleted'></span></center>";
         $("#task").html(this.taskHtml);
      }
      this.solutionHtml = $("#task-solution").html();
      $("#task-solution").hide().html();
      if (json.status == "evaluation") {
         this.showSolution(true);
      } else {
         task.load(0, 'task');
      }
      platform.checkAnswerChanged(true);
   },
   checkAnswerChanged: function(forceDisplay) {
      var newAnswer = task.getAnswer();
      if (newAnswer != platform.savedAnswer) {
         if (platform.hasAnswerChanged && !forceDisplay) {
            return;
         }
         platform.hasAnswerChanged = true;
         suffix = "changed";
      } else {
         if (!platform.hasAnswerChanged && !forceDisplay) {
            return;
         }
         platform.hasAnswerChanged = false;
         suffix = "unchanged";
      }
      if (platform.savedAnswer != "") {
         prefix = "saved";
      } else {
         prefix = "unsaved";
      }
      platform.displayMessages(prefix + "_" + suffix);
   },

   retreiveAnswer: function() {
      task.reloadAnswer(platform.savedAnswer);
      platform.checkAnswerChanged(true);
   },

   displayMessages: function(taskMode) {
      var messages = {
         saved: "",
         cancel: "",
         validate: ""
      }
      switch (taskMode) {
         case "unsaved_unchanged":
         case "unsaved_changed":
            messages["validate"] = "<input type='button' value='Save your answer' onclick='platform.validate(\"done\")'></input>";
            break;
         case "saved_unchanged":
            messages["saved"] = "Your answer was saved. You can <a href='#' onclick='platform.validate(\"cancel\");return false'>cancel it</a> and restart." +
               "<br/><input type='button' value='See your score and the solution' onclick='platform.showSolution();return false;'></input>";
            break;
         case "saved_changed":
            messages["saved"] = "<b style='color:red'>Warning: this answer is different from the one that is saved</b>, you may <a href='#' onclick='platform.retreiveAnswer();return false'>reload the saved answer</a>.";
            messages["validate"] = "<input type='button' value='Save this new answer' onclick='platform.validate(\"done\")'></input><br/>";
            break;
      }
      for(var type in messages) {
         if (task.displayMessage != undefined) {
            task.displayMessage(type, messages[type], true);
         } else {
            $("#platform_" + type).html(messages[type]);
         }
      }
   },
   validate: function(validationMode) {
      if (this.taskMode == "#task-solution") {
         alert("You may not change your answer once the solution has been displayed.");
         return;
      }
      if (validationMode == "cancel") {
         platform.savedAnswer = "";
         task.reloadAnswer("");
      } else {
         this.savedAnswer = task.getAnswer();
      }
      platform.checkAnswerChanged(true);
   },
   updateHeight: function(mode) {
   },
   
   showSolution: function(hideScore) {
      if (task.unload != undefined) {
         task.unload();
      }
      $("#task").html(this.taskHtml);
      $("#task-solution").html(this.solutionHtml);
      $("#task-solution").show();
      this.taskMode = "solution";
      task.load(0, "solution");
      task.reloadAnswer(this.savedAnswer);

      if (!hideScore) {
         this.previewGrade(this.savedAnswer);
      }
   },

   previewGrade: function(answer) {
      var json = getTaskResources();
      var minScore = -3;
      var maxScore = 6;
      var score;
      if (json.acceptedAnswers && json.acceptedAnswers[0]) {
         if ($.inArray("" + answer, json.acceptedAnswers) > -1) {
            score = maxScore;
         }
         else {
            score = minScore;
         }
      }
      else {
         score = grader.gradeTask(0, answer, minScore, maxScore);
      }
      if ($("#previewScorePopup").length == 0) {
         $("<div id='previewScorePopup'><div style=\"background-color:#111;opacity: 0.65;filter:alpha(opacity=65);position:absolute;z-index:10;top:0px;left:0px;width:100%;height:2000px\"></div>" +
            "<div style='position:fixed;top:100px;left:100px;width:400px;height:200px;background-color:#E0E0FF;color:black;border: solid black 3px;text-align:center;z-index:1000'>" +
            "<div style='padding:50px'><span id='previewScoreMessage'></span><br/><br/><input type='button' onclick='$(\"#previewScorePopup\").remove()' value='OK' /></div></div></div>").insertBefore("#task-solution");
      }
      $("#previewScorePopup.show()");
      $("#previewScoreMessage").html("<b>Your score : " + score + "/" + maxScore + "</b><br/>You can now read the solution at the bottom of the page.");

   }
}

function checkIframe(ifr) {
    var key = ( +new Date ) + "" + Math.random();

    try {
        var global = ifr.contentWindow;
        return true;
        global[key] = "asd";
        return global[key] === "asd";
    }
    catch( e ) {
        return false;
    }
}

$(document).ready(function() {
   if (typeof platform['load'] == 'function' && (!checkIframe(parent) || ((typeof parent.generating == 'undefined') || !parent.generating))) {
    platform.load();
   }
});
