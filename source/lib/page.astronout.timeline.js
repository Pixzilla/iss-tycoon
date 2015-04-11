var _selectedCrewIndex = undefined;
var _pushPage = undefined;
var _nonVisualTable = undefined;
var _timelineManager = undefined; //XMLTimelineManager
var _pageDialog = undefined;
var _nxtUrl = undefined;
var _preUrl = undefined;
var _nowUrl = undefined;
var _group = undefined; // Used for LS subscription
var _activityTimeline = undefined;

var _pageArgs = 
{
    band: undefined,
    year: undefined,
    day: undefined,
    hour: undefined,
  date: undefined
};

var lsOptions = 
{
    domain: lsISSLiveOptions.domain,
    host: lsISSLiveOptions.host,
    port: lsISSLiveOptions.port,
  applicationName: lsISSLiveOptions.applicationName,
    enginePath: "../" + lsISSLiveOptions.enginePath,
    dataAdapter: lsISSLiveOptions.timelineDataAdapter,
  debugAlertsOnClientError: lsISSLiveOptions.debugAlertsOnClientError,
    tableID: "ISPAstroTimelineTbl"
};

var timelineOpts = 
{
    lineColor: '#3f607f',
    backgroundColor: '#2a4868',
    labelColor: '#222',
    cellWidth: 80,
    cellPadding: 2,
  onClick: onActivityClick,
  drawScroller:true,
  scrollerContainerId: 'timeline-scroller',
  pxScale: 300,
  onHorizontalScroll: undefined,
  view:'gantt', // gantt view for crew timeline
  timeScale: 1, // 1 hour for Gantt view and no list view
  listViewBinScale: undefined // unused for Gantt view and no list view
};



/**
 * Function used to initialize the contents of the astronaut timeline page.
 */
function initPage()
{     
  // Add timeline scroll hook
  timelineOpts.onHorizontalScroll = onHorizontalScroll;
  
  // show loading dialog
  _pageDialog = new PageDialog();
  _pageDialog.showLoading();
  
  // Initialize object to manage XMl from telemetry
  _timelineManager = new XMLTimelineManager();
  
  // Parse URL to determine loading behavior
  var args = getUrlVars();
  parseArgs(args);
  
  $('#navigate-previous-option').disableSelection();
    $('#navigate-now-option').disableSelection();
    $('#navigate-next-option').disableSelection();
  
  
  // Initialize push page
  _pushPage = null;
  _pushPage = new PushPage();
    _pushPage.context.setDebugAlertsOnClientError(lsOptions.debugAlertsOnClientError); // (false=production)
    _pushPage.context.setDomain(lsOptions.domain); // domain=web
    _pushPage.onEngineCreation = function(lsEngine)
    {
        lsEngine.connection.setAdapterName(lsOptions.dataAdapter);
        lsEngine.connection.setLSHost(lsOptions.host);
        lsEngine.connection.setLSPort(lsOptions.port); // production port=80
        lsEngine.changeStatus("STREAMING");
    };
    
    //_pushPage.onClientError = function(msg){ alert(msg); };
    //_pushPage.onClientAlert = function(code, msg){ alert(msg);   };
    _pushPage.bind(); 
    _pushPage.createEngine(lsOptions.applicationName, lsOptions.enginePath, "SHARE_SESSION");
    _pushPage.onEngineReady = function(lsEngine)
    {
        // Start table subscription once engine is ready
    _nonVisualTable = new NonVisualTable(_group, _group, "MERGE");
      _nonVisualTable.setSnapshotRequired(true);
      _nonVisualTable.onItemUpdate = onXMLUpdate;
      _pushPage.addTable(_nonVisualTable, lsOptions.tableID);
    };
    
    
    //--
  /*
    // initilize date selection menu
    var updateDateURL = function()
    {
      var y = parseInt($('#calendar-menu-dialog').find('.year').val());
      var m = parseInt($('#calendar-menu-dialog').find('.month').val())
      var d = parseInt($('#calendar-menu-dialog').find('.day').val())
      
      if(isNaN(d))
      { 
        $('#calendar-mnu-confirm').removeAttr('href');  
      }
      else
      {
        var date = new Date(y, m, d);
        var doy = date.getDOY();
        $('#calendar-mnu-confirm').attr('href', 'timelineAstronaut.html?day='+doy+'&year='+y);  
      }
    };
    */
    var resetDays = function()
    { 
      $('#calendar-menu-dialog').find('.day').html('');
      var y = parseInt($('#calendar-menu-dialog').find('.year').val());
      var m = parseInt($('#calendar-menu-dialog').find('.month').val());
      var days = 32 - new Date(y, m, 32).getDate();
      
      for(var i = 1; i <= days; i++)
      { 
        $('#calendar-menu-dialog').find('.day').append('<option value="'+i+'">'+i+'</option>');
      }
      updateDateURL();
    };
    
    $('#calendar-menu-dialog').find('.year').append('<option value="2011">2011</option>');
    $('#calendar-menu-dialog').find('.year').append('<option value="2012">2012</option>');
    $('#calendar-menu-dialog').find('.year').append('<option value="2013">2013</option>');
    $('#calendar-menu-dialog').find('.year').append('<option value="2014">2014</option>');
    $('#calendar-menu-dialog').find('.year').append('<option value="2015">2015</option>');
    $('#calendar-menu-dialog').find('.year').append('<option value="2016">2016</option>');
    $('#calendar-menu-dialog').find('.year').append('<option value="2017">2017</option>');
    $('#calendar-menu-dialog').find('.year').append('<option value="2018">2018</option>');
    $('#calendar-menu-dialog').find('.year').append('<option value="2019">2019</option>');
    $('#calendar-menu-dialog').find('.year').append('<option value="2020">2020</option>');
    $('#calendar-menu-dialog').find('.year').change(function(){ resetDays(); })
    
    $('#calendar-menu-dialog').find('.month').append('<option value="0">January</option>');
    $('#calendar-menu-dialog').find('.month').append('<option value="1">February</option>');
    $('#calendar-menu-dialog').find('.month').append('<option value="2">March</option>');
    $('#calendar-menu-dialog').find('.month').append('<option value="3">April</option>');
    $('#calendar-menu-dialog').find('.month').append('<option value="4">May</option>');
    $('#calendar-menu-dialog').find('.month').append('<option value="5">June</option>');
    $('#calendar-menu-dialog').find('.month').append('<option value="6">July</option>');
    $('#calendar-menu-dialog').find('.month').append('<option value="7">August</option>');
    $('#calendar-menu-dialog').find('.month').append('<option value="8">September</option>');
    $('#calendar-menu-dialog').find('.month').append('<option value="9">October</option>');
    $('#calendar-menu-dialog').find('.month').append('<option value="10">November</option>');
    $('#calendar-menu-dialog').find('.month').append('<option value="11">December</option>');
    $('#calendar-menu-dialog').find('.month').change(function(){ resetDays();})
    resetDays();
  $('#calendar-menu-dialog').find('.day').change(function()
  {
    updateDateURL();  
  })

    
    $('#calendar-mnu').click(function()
    {
      $("#calendar-menu-dialog").css('display', 'block');
    })
    
    $('#calendar-mnu-cancel').click(function()
    {
      $("#calendar-menu-dialog").css('display', 'none');
    });
    
    //--
    
      // Capture on help click events
    $('#timeline-help').click(function(){
      
      // fade in help layer
      $('#help-layer').stop(true, true).fadeIn();
    });
    
    $('#help-layer').click(function(){
      $('#help-layer').stop(true, true).fadeOut();
    });
    
  updateDateMenu();
};

/**  Update the date in the Calendar box to show the current day being viewed, the date in the URL
*/
function updateDateMenu()
{
  var dt = new Date();

  if(_pageArgs.day != undefined)
  { 
    //day is a number
    if (!isNaN(parseInt(_pageArgs.day))) 
    {
      dt.setFullYear(_pageArgs.year);
      dt.setDOY(_pageArgs.day, _pageArgs.year);
    }
    else if (_pageArgs.day.equals('Yesterday')) 
    {
      dt = dt.addDays(-1);
    }
    else if (_pageArgs.day.equals('Tomorrow')) 
    {
      dt = dt.addDays(+1);
    } 
  }
  /*
  console.log('DATE: ' + _pageArgs.date);
  console.log('\t Day: ' + _pageArgs.day);
  console.log('\t Year: ' + _pageArgs.year);  
  console.log('\t dt: ' + dt);
  console.log('\t m: ' + dt.getMonth() + ' d: ' + dt.getDate() + ' y: ' + dt.getFullYear());
  */
  $('#calendar-menu-dialog').find('.year').val(dt.getFullYear());
    $('#calendar-menu-dialog').find('.month').val(dt.getMonth());
    $('#calendar-menu-dialog').find('.day').val(dt.getDate());

  updateDateURL();
};

/**
 * Function used to parse URL arguments
 * @param {Object} args
 */
function parseArgs(args)
{ 
  // extend page arguments
  _pageArgs = $.extend(_pageArgs, args);
  
  // Get current date
  var now = new Date();
  
    _preUrl = 'timelineAstronaut.html?';
    _nowUrl = 'timelineAstronaut.html?day=Today';
    _nxtUrl = 'timelineAstronaut.html?';
  
  // Set default values if necessary
    if(args.crew == undefined || isNaN(args.crew)){ args.crew = '0';}
  if(args.year == undefined || isNaN(args.year)){ args.year = now.getFullYear().toString();}
    
    //replace all the 'args. with '_pageArgs.' only in the following "if" and "else" statements
    // if you want to have previous and next buttons to go to the previous and next relative day
    if (_pageArgs.day == undefined || _pageArgs.day.equals('Today')) 
    {
        // If the day is undefined, then used default 
        // today, yesterday and tomorrow
        _preUrl += 'day=Yesterday';
        _nxtUrl += 'day=Tomorrow';
    _group = ['Today'];
    }
    else 
    {
        if (!isNaN(parseInt(_pageArgs.day))) 
        {
            now = new Date();
            //use the year when taking account of 'previous' and 'next', otherwise you will go to the current year 
            // which would be incorrect if the user had selected a year that was not the current.  
            //ex: day 281 year 2012 -> click next(281+1) -> loads timeline data for day 282 year 2013, NOT 2012 
      now.setFullYear(_pageArgs.year);
            now.setDOY(_pageArgs.day,_pageArgs.year);
            _group = [_pageArgs.year + '_' + _pageArgs.day];
        }
        else if (_pageArgs.day.equals('Yesterday')) 
        {
            now = now.addDays(-1);
      _group = ['Yesterday'];
        }
        else if (_pageArgs.day.equals('Tomorrow')) 
        {
            now = now.addDays(+1);
      _group = ['Tomorrow'];
        }
    
    var pre = now.addDays(-1);
      var nxt = now.addDays(+1);
      _preUrl += 'day=' + pre.getDOY().toString() + '&year=' + pre.getFullYear().toString();
      _nxtUrl += 'day=' + nxt.getDOY().toString() + '&year=' + nxt.getFullYear().toString();
    }
     
  if(_pageArgs.hour != undefined)
  { 
    _preUrl += '&hour=' + _pageArgs.hour;
      _nowUrl +='&hour=' + _pageArgs.hour;
      _nxtUrl +='&hour=' + _pageArgs.hour;
  } 
   
  // Initialize links for the navigation controls, The crew argument will 
  // be added to this links once the user selects a crew member
  $('#navigate-previous-option').attr('href', _preUrl);
    $('#navigate-now-option').attr('href', _nowUrl);
    $('#navigate-next-option').attr('href', _nxtUrl);
  
    _selectedCrewIndex = parseInt(args.crew);
  
  
  // Process a date that can be used to describe the current 
  // page timeline selection
    var date = new Date();
    date = date.toGMT();
    
    if (_pageArgs.day != undefined && _pageArgs.day.equals("Yesterday")) 
    {
        date = date.addDays(-1);
    }
    else if (_pageArgs.day != undefined && _pageArgs.day.equals("Tomorrow")) 
    {
        date = date.addDays(1);
    }
    else if (_pageArgs.year != undefined && _pageArgs.day != undefined) 
    {
        var year = parseInt(_pageArgs.year);
        var day = parseInt(_pageArgs.day);
        
        if (isNaN(year) == false && isNaN(day) == false) 
        {
            date.setDOY(year, day);
        }
    }
    
    // Set hour if defined
    if (_pageArgs.hour != undefined) 
    {
        var hour = parseInt(_pageArgs.hour);
        if (isNaN(hour) == false) 
        {
            date.setHours(hour);
            date.setMinutes(0);
        }
    }
  
  _pageArgs.date = date;
};

/**
 * 
 * @param {Object} selection
 */
function onTimelineDateChange(selection)
{
  //Load xml telemetry for the given date symbol
    loadTelemetryXML(selection, function()
    {
        // Reselect the node that belongs to the 
        // last selected astronaut
        if (selectedAstronaut != undefined) 
        {
            //Get the index of the selected astronaut
            var position = selectedAstronaut.position;
            var crewIndex = timelineManager.findMember(function(member)
            {
                return member.position == position;
            });
            
            // If found
            if (crewIndex != -1) 
            {
                onAstronautSelection(crewIndex);
            }
        }
    });
};

/**
 * 
 * @param {Object} symbol
 */
function loadTelemetryXML(symbol)
{
  loadTelemetryXML(symbol, undefined);
};

function loadTelemetryXML(symbol, callback)
{ 
    var group = [symbol];
    var nonVisualTable = new NonVisualTable(group, group, "MERGE");
    nonVisualTable.setSnapshotRequired(true);
  nonVisualTable.onItemUpdate = 
  function(itemPos, updateInfo, itemName)
  {
    onXMLUpdate(itemPos, updateInfo, itemName);
    if(callback != undefined)
    { 
      callback();
    }
  };
   
    timelinePushPage.addTable(nonVisualTable, lsOptions.tableID);
}

/**
 * 
 * @param {Object} itemPos
 * @param {Object} updateInfo
 * @param {Object} itemName
 */
function onXMLUpdate(itemPos, updateInfo, itemName)
{
  
    if (updateInfo !== null) 
    {
        if (updateInfo.isValueChanged(1)) 
        {
            var value = updateInfo.getNewValue(1);
            
            if (value != null) 
            {
                try 
                {
                    var xmlDoc = $.parseXML(value);
                    _timelineManager.parseXML(xmlDoc);
                    var crew = _timelineManager.getCrew();
                    updateCrewList(crew);
                    
                    
          // Delay display of content for 2 seconds to allow the 
          // browser to render its content
                    setTimeout(function()
                    {
                        _pageDialog.close(function()
                        {
                            // After animation is complete, fade in contents
                            $('#timeline-panel').fadeIn();
                            $('#timeline-crew-list').fadeIn();
                            $('#timeline-navigation').fadeIn();
                            $('#activity-info-section').fadeIn();
              $('#disclaimer').fadeIn();
              
                            if (_selectedCrewIndex != undefined) 
                            {
                                onAstronautSelection(_selectedCrewIndex);
                                /*if (_activityTimeline != undefined) 
                                {
                                    var date = new Date();
                                    _activityTimeline.selectByDate(date.toGMT(), true);
                                }*/
                            }
                        });
            
                    }, 3000);
                    
                } 
                catch (err) 
                {
                   _pageDialog.showAlert('An error occurred while processing timeline data.');
                }
            }
      else
      { 
        _pageDialog.showAlert('No content available at this time.');
      }
            
        }
    
    // Remove table after data has been received
    // timelinePushPage.removeTable(lsOptions.tableID);
    }
}



// Loads a timeline object from a file path using ajax
function loadXML(path)
{
    $.ajax(
    {
        type: "GET",
        url: path,
        dataType: "text",
        error: function(jqXHR, textStatus, errorThrown)
        {
            alert('failed to load ' + path);
        },
        success: function(xml)
        {
            try 
            {
                var xmlDoc = $.parseXML( xml );
        _timelineManager.parseXML(xmlDoc);
                var crew = _timelineManager.getCrew();
        updateCrewList(crew);
            } 
            catch (err) 
            {
                alert(err);
            }
        }
    });
    
};// end of function


function updateCrewList(data)
{ 
  // Update the crew list element
  crewList =  $('#timeline-crew-list');
  $(crewList).empty();
  $(crewList).disableSelection();

  var block = $('<div id="timeline-astronaut-block">Space Station Crew<div>');
  $(crewList).append(block);
  
  $(data).each(function(index)
  {
    var member = this;    
        var html = '<div class="timeline-astronaut-node"><img class="timeline-astronaut-img"/><div>';
    
    var node = $(html);
    $(crewList).append(node);
    $(node).addClass('idle-astronaut-node');
    $(node).css({ opacity: 0.50 });
    
    var imgLink = this.linkToPhoto; 
    if (this.linkToPhoto.length == 0) 
    {
      imgLink = 'images/timeline-astronaut-placeholder.png';
    }
    
    $(node).find('.timeline-astronaut-img').attr('src', imgLink);
    $(node).find('.timeline-astronaut-img').css({ opacity: 0.50 });
    
    $(node).click(function()
    { 
      onAstronautSelection(index); 
    });
    
  });
}

/**
 * 
 * @param {Object} index
 */
function onAstronautSelection(index)
{
  // Find the HTML element and the crew member data associated 
  // with the given index
  var element = undefined;
  var member = _timelineManager.getMember(index);
  if( element == undefined)
  { 
        $('.timeline-astronaut-node').each(function(mIndex)
        {
            if (index == mIndex) { element = this; }
        });
  }
  
  // Display the full name of the selected astronaut
  var fullName = member.firstName + " " + member.lastName;
  $('#timeline-profile-name').text(fullName);
  
  // Get astronaut portrait, if is not available, use place holder
  $('#profile-photo').removeAttr('href'); // reset link
  $('#profile-photo').removeAttr('title'); // reset link
  var imgPhotoSrc =  member.linkToPhoto;;
  if(imgPhotoSrc == undefined || imgPhotoSrc.length == 0)
  { 
    imgPhotoSrc = 'images/timeline-astronaut-placeholder.png';  
  }
    imgPhotoSrc = 'url(' + imgPhotoSrc + ')';
  $('#profile-photo').css('background-image', imgPhotoSrc);
  
  // Add link to profile photo if member has a link to biography
  $('#profile-photo').unbind('click');
  if(member.linkToBiography != undefined && member.linkToBiography.length > 0)
  { 
    //$('#profile-photo').attr('href', member.linkToBiography);
    $('#profile-photo').click(function()
    {
       // Show astronaut biography
            $('#astronaut-profile div').text(member.shortBio);
            $('#activity-details').css('display', 'none');
            $('#astronaut-profile').css('display', 'none');
            $('#astronaut-profile').fadeIn(500);
    });
  }
  
  $('#profile-photo').attr('title', fullName);
  
  // Fade any nodes that are selected
  $('.selected-astronaut-node').each(function(index)
  {
    $(this).removeClass('selected-astronaut-node');
    $(this).addClass('idle-astronaut-node');
    $(this).css({ opacity: 0.50});
    $(this).find('img').css({ opacity: 0.50 });
  });
  
  // Update the look of the astronaut list 
  $(element).addClass('selected-astronaut-node');
  $(element).removeClass('idle-astronaut-node');
  $(element).css({ opacity: 1 });
  $(element).find('img').css({ opacity: 1 });
  
  // Update position label
  $('#timeline-profile-position').html('<p>'+member.translatedPosition+'</p>');
  
  // Update Agency logo
  $('#timeline-profile-agency').empty();
  $("#timeline-profile-agency").removeClass();
  if(member.agency != undefined)
  { 
    if(member.agency == "RSA")
    { 
      $('#timeline-profile-agency').addClass('agency-logo-rsa');
    }
    if(member.agency == "NASA")
    { 
      $('#timeline-profile-agency').addClass('agency-logo-nasa');
    }
    if(member.agency == "JAXA")
    { 
      $('#timeline-profile-agency').addClass('agency-logo-jaxa');
    }
    if(member.agency == "ESA" || member.agency == "EESA")
    { 
      $('#timeline-profile-agency').addClass('agency-logo-eesa');
    }
    if(member.agency == "CSA" || member.agency == "ASC" || member.agency.indexOf("CSA") >= 0 || member.agency.indexOf("ASC") >= 0)
    { 
      $('#timeline-profile-agency').addClass('agency-logo-csa');
    }
  }
  
  
  
  // Remove and disable social links
  $('.social-link').attr('src', '');
  $('.social-link').removeClass('selected');
  $('.social-link').addClass('disabled');
  $('.social-link').removeAttr('href');
    
  // Update social links
    $('#timeline-profile-sociallinks').empty();
    if (member.socialSites != undefined) 
    {
        $(member.socialSites).each(function(index)
        {
            if (this.name != undefined && this.link != undefined) 
            {
        // Get the icon style for the given link
        var icon = undefined;
        var name = this.name.toLowerCase();
        if(name == "twitter")
        {
          $('#twitter-link').attr('href', this.link);
          $('#twitter-link').removeClass('disabled');
          $('#twitter-link').addClass('selected');
        }
        else if(name == 'facebook')
        { 
          $('#facebook-link').attr('href', this.link);
          $('#facebook-link').removeClass('disabled');
          $('#facebook-link').addClass('selected');
        }
            }
        });
    }
  
  // Update biography link
  //$('#bio-link').unbind('click');
  $('#bio-link').removeAttr('href');
  if (member.shortBio != undefined && member.shortBio.length > 0) 
    {
       $('#bio-link').attr('href', member.linkToBiography);
     $('#bio-link').attr('target', '_blank');
     $('#bio-link').addClass('selected');
     /*
      $('#bio-link').click(function(e)
        {
            // Show astronaut biography
            $('#astronaut-profile div').text(member.shortBio);
            $('#activity-details').css('display', 'none');
            $('#astronaut-profile').css('display', 'none');
            $('#astronaut-profile').fadeIn(500);
        });
    $('#bio-link').attr('href', this.link);
        $('#bio-link').removeClass('disabled');
        $('#bio-link').addClass('selected');
    */
    }
  
  var guideDate = undefined;
    
    if (_activityTimeline != undefined) 
    {
        // get middle guide time
    guideDate = _activityTimeline.getMiddleGuideDate();
    
    _activityTimeline.unbind();
        _activityTimeline = null;
    }
    
  _activityTimeline = new ActivityTimeline('timeline-panel', 
                      timelineOpts, 
                      member.activities, 
                      _timelineManager.getDayNightPassList() , 
                      _timelineManager.getSBandRadioList());

  // If a guide date is not defined, use the arguments that where capture
  // when the page was loaded to determine what time to scroll to.
  if(guideDate == undefined)
  { 
    guideDate = _pageArgs.date;
  }
  
  // scroll to the last views time on the timeline
  _activityTimeline.scrollToDate(guideDate);
    
    if (!_activityTimeline.selectByDate(guideDate)) 
    {
        // nothing was selected, show bio
        $('#astronaut-profile div').text(member.shortBio);
        $('#activity-details').css('display', 'none');
        $('#astronaut-profile').css('display', 'none');
        $('#astronaut-profile').fadeIn(500);
    }                   
                                            
    parseArgs({ band: index });                     
                      
                    
    /*                  
  // update navigation urls
  var crewArg = '&crew=' + index;
    $('#navigate-previous-option').attr('href', _preUrl + crewArg);
    $('#navigate-now-option').attr('href', _nowUrl + crewArg);
    $('#navigate-next-option').attr('href', _nxtUrl + crewArg);                 
  */
  _selectedCrewIndex = index;
};


function onActivityClick(data) // activity click callback
{ 
  var startTime = data.start.toDateString() + " " + data.start.toLocaleTimeString();
    var endTime = data.end.toDateString() + " " + data.end.toLocaleTimeString();
  
  $('#activity-info-name').text(data.label);
  $('#activity-info-starttime').text(startTime);
  $('#activity-info-endtime').text(endTime);
  $('#activity-info-experiment').text(data.category);
  $('#activity-info-description').text(data.description);
  $('#activity-info-color').css('background-color', data.color);
  
  // Add links 
  if(data.links != undefined && data.links.length > 0)
  { 
        var list = $('<ul></ul>');
    $('#activity-info-description').prepend(list);
    $('#activity-info-description').prepend('<h4 style="margin-top:-1px;">Links:</h4>');
        $(data.links).each(function(index)
        {
            var listItem = $('<li></li>');
      $(listItem).attr("style","margin-left:-15px; margin-top:-10px;");
      var link = $('<a class="activity-link"></a>');
            $(list).append(listItem);
      $(listItem).append(link);
            $(link).text('[' + this.type + '] ' + this.name);
            $(link).attr('href', this.url);
            $(link).attr('target', '_blank');
        });
  }
  
   // Hide astronaut bio and show activity details
    $('#astronaut-profile').css('display', 'none');
    $('#activity-details').css('display', 'none');
  $('#activity-details').fadeIn(500);
  
  
  
};


/**
 * Callback function that is called when the user scrolls 
 * the timeline horizontally
 */
function onHorizontalScroll()
{ 
  // Get the time indicated by the timeline's middle guide
  var date =  _activityTimeline.getMiddleGuideDate();
  if(date != undefined)
  { 
    // Extract the hour
    var hour = date.getHours();
    
    // Include the hour in navigation links to scroll the timeline 
    // to a similar time when the links is used
    parseArgs({hour: hour});
  }
};


// initilize date selection menu
var updateDateURL = function()
{
  var y = parseInt($('#calendar-menu-dialog').find('.year').val());
  var m = parseInt($('#calendar-menu-dialog').find('.month').val())
  var d = parseInt($('#calendar-menu-dialog').find('.day').val())

  if(isNaN(d))
  {
    $('#calendar-mnu-confirm').removeAttr('href');
  }
  else
  {
    var date = new Date(y, m, d);
    var doy = date.getDOY();
    $('#calendar-mnu-confirm').attr('href', 'timelineAstronaut.html?day=' + doy + '&year=' + y);
  }
};

