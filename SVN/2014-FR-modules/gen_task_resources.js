function getTaskResources(callback)
{
   json['task'] = new Array();
   json['solution'] = new Array();
   json['grader'] = new Array();
   json['task_modules'] = new Array();
   json['solution_modules'] = new Array();
   json['grader_modules'] = new Array();
   json['title'] = $('title').text();
   
   // Resources
   var curDest = 'task';
   var curType = 'javascript';
   $('script, style, link').each(function(index, element) {
      if (!$(this).hasClass('remove')) {
         if ($(this).hasClass('solution') && $(this).hasClass('module')) {
            curDest = 'solution_modules';
         }
         else if ($(this).hasClass('solution')) {
            curDest = 'solution';
         }
         else if ($(this).hasClass('grader') && $(this).hasClass('module')) {
            curDest = 'grader_modules';
         }
         else if ($(this).hasClass('grader')) {
            curDest = 'grader';
         }
         else if ($(this).hasClass('module')) {
            curDest = 'task_modules';
         }
         else {
            curDest = 'task';
         }
         
         if ($(this).is('script')) {
            curType = 'javascript';
         }
         else if ($(this).is('style') || $(this).is('link')) {
            curType = 'css';
         }
         
         if ($(this).attr('src')) {
            json[curDest].push({ type: curType, url: $(this).attr('src'), id: $(this).attr('id') });
         }
         else if ($(this).attr('href')) {
            json[curDest].push({ type: curType, url: $(this).attr('href'), id: $(this).attr('id') });
         }
         else {
            json[curDest].push({ type: curType, content: $(this).html() });
         }
      }
   });
   
   // Contents
   json['task'].push({ type: 'html', content: $('#task').html() });
   json['solution'].push({ type: 'html', content: $('#task-solution').html() });
   
   // Images
   var images = new Array();
   var image = '';
   $('#task img').each(function(index, element) {
      var src = $(this).attr('src');
      if (src != undefined) {
         image = src.toString();
         if (images.indexOf(image) === -1) {
            json['task'].push({ type: 'image', url: image });
            images.push(image);
         }
      }
   });
   fillImages($('#task').html(), images, json['task']);
   $('script').each(function(index, element) {
      if ($(this).hasClass('remove') || $(this).attr('src') || $(this).attr('href')) {
         return;
      }
      fillImages($(this).html(), images, json['task']);
   });
   $('#task-solution img').each(function(index, element) {
      image = $(this).attr('src').toString();
      if (images.indexOf(image) === -1) {
         json['solution'].push({ type: 'image', url: image });
         images.push(image);
      }
   });
   fillImages($('#task-solution').html(), images, json['task']);
   
   if (typeof callback != 'undefined') {
      callback(json);
   }
   else {
      return json;
   }
}

function fillImages(text, images, json) {
   var extensions = ["png", "jpg", "gif"];
   for (var iExt = 0; iExt < extensions.length; iExt++) {
      var ext = extensions[iExt];
      var regexp = new RegExp("[\'\"]([^\"\']*." + ext + ")[\'\"]", "g");
      while (true) {
         var match = regexp.exec(text);
         if (match == null) {
            break;
         }
         var image = match[1];
         if (image.length <= ext.length + 1) {
            continue;
         }
         if ($.inArray(image, images) === -1) {
            json.push({ type: 'image', url: image });
            images.push(image);
         }
      }
   }
}

function generateTask(callback) {
    if (typeof PmInterface == 'undefined' || typeof callback == 'undefined') {
        console.log('No postmessage');
    }
    else {
        var curHref = window.location.pathname;
        var cleanHref = curHref.substr(0, curHref.length - 1);
        var currentQuestionKey = cleanHref.substr(cleanHref.lastIndexOf('/') + 1);
        
        var tasks = [];
        var bebras = getTaskResources();
        tasks.push({
           'bebras': bebras,
           'url': currentQuestionKey.substr(0, 4)+'/'+currentQuestionKey+'/'
        });
        
        // Compilation
        tasks = JSON.stringify(tasks);
        $.post('../../../generateContest.php', { contestID: currentQuestionKey, contestFolder: currentQuestionKey, 'tasks': tasks }, function(data) {
            callback(window.location.origin+'/contestInterface/contests/'+currentQuestionKey+'/index.php');
        });
    }
}