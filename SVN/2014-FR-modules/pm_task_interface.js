/**
 * Enable / Disable messages debug
 */
var taskDebug = true;

var sPlatform = null;
var sToken = null;

/**
 * A message can be send or retrieved
 * 
 * @param {string} request
 * @param {string} content
 * @param {string} iframe source id
 * @param {string} message identifier
 * @returns {Message}
 */
var Message = function(request, content, sSourceId, messageId)
{
   this.request = request;
   this.content = content;
   this.source = sSourceId;
   this.messageId = messageId;
};

var submissionsAvailable = false;

/**
 * Postmessage interface for items
 */
var PmInterface = {
   /**
    * Request to response map
    * @type object
    */
   responseFromRequest: {
      getHeight: 'getHeightCallback',
      getViews: 'getViewsCallback',
      getAnswer: 'getAnswerCallback',
      getAnswerHtml: 'getAnswerHtmlCallback',
      reloadAnswer: 'reloadAnswerCallback',
      getHintHtml: 'getHintHtmlCallback',
      load: 'loadCallback',
      getTaskResources: 'getTaskResourcesCallback',
      generateTask: 'generateTaskCallback'
   },
   
   specialRequests: {
      getTaskResources: '',
      generateTask: '',
      gradeTask: ''
   },
   
   mustWaitFor: {
      getAnswer: 'submissionsAvailable',
      getAnswerHtml: 'submissionsAvailable'
   },
   
   parent_url: null,
   sSourceId: null,
   sTypeId: null,
   
   init: function(parent_url, sSourceId) {
      PmInterface.parent_url = parent_url;
      PmInterface.sSourceId = sSourceId;
      
      $.receiveMessage(PmInterface.messageCallback, PmInterface.allowSourceOrigin);
   },
   
   /**
   * New message !
   * 
   * @param {type} e
   */
   messageCallback: function(e) {
      var message = PmInterface.getMessage(e.data);
      if (taskDebug && message.request !== 'getHeight') {
         console.log('Task '+PmInterface.sSourceId+' Got: ');
         console.log(message);
      }
      
      if (typeof window['task'][message.request] === 'function' || message.request in PmInterface.specialRequests) {
         /**
          * If the current request required waiting
          */
         if (message.request in PmInterface.mustWaitFor && !window[PmInterface.mustWaitFor[message.request]]) {
            setTimeout(function() {
               PmInterface.messageCallback(e);
            }, 250);
            
            return;
         }
         else {
            if (typeof message.content === 'string') {
               if (message.content != '' && message.content != 'null') {
                  message.content = [message.content];
               }
               else {
                  // No parameter
                  message.content = [];
               }
            }
            
            if (message.request === 'gradeTask') {
               window['gradeTask'].apply(this, message.content);
            }
            else {
               // When a callback is used
               if (PmInterface.responseFromRequest[message.request] == message.request+'Callback') {
                  message.content.push(function() {
                     // Convert arguments to an array (arguments is not an array)
                     var parameters = [];
                     for(var i = 0; i < arguments.length; i++) {
                        parameters.push(arguments[i]);
                     }
                     
                     PmInterface.respond(message, parameters);
                  });
                  
                  if (typeof window['task'][message.request] === 'function') {
                     window['task'][message.request].apply(this, message.content);
                  }
                  else {
                     window[message.request].apply(this, message.content);
                  }
               }
               else {
                  var answer = null;
                  if (typeof window['task'][message.request] === 'function') {
                     answer = window['task'][message.request].apply(this, message.content);
                  }
                  else {
                     answer = window[message.request].apply(this, message.content);
                  }
                  PmInterface.respond(message, answer);
               }
            }
         }
      }
      else {
         console.log('Warning : Task '+PmInterface.sSourceId+' got undefined '+message.request);
      }
   },
   
   /**
    * Respond to the message
    * 
    * @param {Message} message
    * @param {string} answer
    */
   respond: function(message, answer) {
      if (message.request in PmInterface.responseFromRequest) {
         var msg = new Message(PmInterface.responseFromRequest[message.request], answer, PmInterface.sSourceId, message.messageId);
         $.postMessage(msg, PmInterface.parent_url, parent);

         if (taskDebug && msg.request !== 'getHeightCallback') {
            console.log('Task '+PmInterface.sSourceId+' Send: ');
            console.log(msg);
         }
      }
   },
  
   /**
    * Check if we allow the origin's message
    * 
    * @param {type} origin
    * @returns {Boolean}
    */
   allowSourceOrigin: function(origin) {
      return true;
   },
  
   /**
    * Retrieve a Message object from a $.receiveMessage call
    * 
    * @param {string} serializedString
    * @returns {Message}
    */
   getMessage: function(serializedString) {
      var obj = $.deparam(serializedString);
      var message = null;

      if (obj.request) {
         message = new Message(obj.request, obj.content, obj.source, obj.messageId);
      }

      return message;
   }
};

/**
 * Platform interface as if it is direclty available
 */
var platformNEW = {
   validate: function(mode) {
      var msg = new Message('validate', [mode, task.getAnswer()], PmInterface.sSourceId);
      $.postMessage(msg, PmInterface.parent_url, parent);
   },
   
   updateHeight: function() {
      var msg = new Message('heightEvent', parseInt($('html').height()), PmInterface.sSourceId);
      $.postMessage(msg, PmInterface.parent_url, parent);
   },
   
   askHint: function(platformToken) {
      var msg = new Message('askHint', platformToken, PmInterface.sSourceId);
      $.postMessage(msg, PmInterface.parent_url, parent);
   },
   
   /**
    * Platform API showView
    * 
    * @param {Array|string} views
    */
   showView: function(views) {
      var msg = new Message('showView', views, PmInterface.sSourceId);
      $.postMessage(msg, PmInterface.parent_url, parent);
   },
   
   /**
    * Platform API openUrl
    * 
    * @param {string} url
    */
   openUrl: function(url) {
      var msg = new Message('openUrl', url, PmInterface.sSourceId);
      $.postMessage(msg, PmInterface.parent_url, parent);
   }
};

$(window).load(function() {
   // Get the parent page URL as it was passed in, for browsers that don't support window.postMessage
   var parent_url = decodeURIComponent(document.location.hash.replace(/^#/, ''));
   var sSourceId = getURLParameter('sSourceId');
   sPlatform = getURLParameter('sPlatform');
   sToken = getURLParameter('sToken');
   
   if (sSourceId && parent_url) {
      PmInterface.init(parent_url, sSourceId);
   }
});

/**
 * Called after submission
 * 
 * @param {boolean} isSuccessed
 * @param {string} platformToken
 */
function notifyTaskSubmissionStatus(isSuccessed, platformToken)
{
   var notifyGradeMessage = null;
   
   if (isSuccessed) {
      // Correction link if any
      $('.evaluation-correction a').click(function() {
         loadView('correction');
         
         var notifyViewMessage = new Message('showView', 'correction', PmInterface.sSourceId);
         $.postMessage(notifyViewMessage, PmInterface.parent_url, parent);
      });
      
      platform.validate('stay', 1, platformToken);
   }
   else {
      platform.validate('stay', 0, platformToken);
   }
}

/**
 * Get the current task URL with the current token
 * 
 * @returns {string}
 */
function getUrlWithToken()
{
   var url = document.URL;
   
   return url.replace(/(sToken=)[^\&]+/, '$1' + encodeURIComponent(sToken));
}

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}

// deparam.min.js (https://github.com/chrissrogers/jquery-deparam)
(function(h){h.deparam=function(i,j){var d={},k={"true":!0,"false":!1,"null":null};h.each(i.replace(/\+/g," ").split("&"),function(i,l){var m;var a=l.split("="),c=decodeURIComponent(a[0]),g=d,f=0,b=c.split("]["),e=b.length-1;/\[/.test(b[0])&&/\]$/.test(b[e])?(b[e]=b[e].replace(/\]$/,""),b=b.shift().split("[").concat(b),e=b.length-1):e=0;if(2===a.length)if(a=decodeURIComponent(a[1]),j&&(a=a&&!isNaN(a)?+a:"undefined"===a?void 0:void 0!==k[a]?k[a]:a),e)for(;f<=e;f++)c=""===b[f]?g.length:b[f],m=g[c]=
f<e?g[c]||(b[f+1]&&isNaN(b[f+1])?{}:[]):a,g=m;else h.isArray(d[c])?d[c].push(a):d[c]=void 0!==d[c]?[d[c],a]:a;else c&&(d[c]=j?void 0:"")});return d}})(jQuery);
