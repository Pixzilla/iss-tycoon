/**
 * Class used to process and manage timeline XML data.
 */
function XMLTimelineManager()
{
    /**
     *
     */
    var _crew = [];
    
    /**
     * Array used to store information on sunlight day passes
     */
    var _dayNightPass = [];
    
    /**
     *
     */
    var _SBandRadio = [];
    
    /**
     *
     */
    var _KuBandRadio = [];
  
  /**
   * list node/module bands to look for when parsing XML data.
   */
  var _ScienceBandDefinitions = [];
  _ScienceBandDefinitions[0] = "NASA LAB/NODE";
  _ScienceBandDefinitions[1] = "NASA JEM";
  _ScienceBandDefinitions[2] = "JEM";
  _ScienceBandDefinitions[3] = "COL";
  _ScienceBandDefinitions[4] = "UNTENDED P/L";
  _ScienceBandDefinitions[5] = "NASA EXT";
  _ScienceBandDefinitions[6] = "NASA COL";
  
  
  /** 
   * node/module
   * list of science band information obtained from XML data.
   * Each item in the list is an object that follows the following format:
   * 
   * obj =  {
   *  name: (string) 
   *  activities: (array)
   * }
   * 
   */
  var _ScienceBands =[];
  
  
  /**
   * empty list for found categories to fill
   */
    var _CategoryDefinitions =[];
    /*
    _CategoryDefinitions[0] = "Communications";
  _CategoryDefinitions[1] = "Life Support Systems";
  _CategoryDefinitions[2] = "Positioning Systems";
  _CategoryDefinitions[3] = "Structures and Mechanisms";
  _CategoryDefinitions[4] = "Procedures and Training";//removed '&'
  _CategoryDefinitions[5] = "Spacewalk (EVA)";//
  _CategoryDefinitions[6] = "Experiments";
  _CategoryDefinitions[7] = "Robotics";
  _CategoryDefinitions[8] = "Medical Activities";//
  _CategoryDefinitions[9] = "Transfer Activities";//
  _CategoryDefinitions[10] = "Visiting Vehicle Activities";//
  _CategoryDefinitions[11] = "Routine Activities";
    */
    
    var _CategoryBands =[];
    
    
    // sort activities by date
    var date_sort_asc = function(act1, act2)
    {
        // This is a comparison function that will result in dates 
        // being sorted in ASCENDING order. 
        if (act1.start > act2.start) return 1;
        if (act1.start < act2.start) return -1;
        return 0;
    };
  
    /**
     * Function used to extract crew information from a given xml document.
     * @param {Object} xml
     */
    var parseCrew = function(xml)
    {
        
    
    _crew.length = 0;
        var x = $(xml).find('CrewMember');
        // Get all astronauts and their information
        $(xml).find('CrewMember').each(function(index)
        {
            // member template
            var linkToPhoto = $(this).find('LinkToPhoto').text();
            linkToPhoto = linkToPhoto.replace('\n', '');
            linkToPhoto = linkToPhoto.trim();
            
            var linkToBiography = $(this).find('LinkToBiography').text();
            linkToBiography = linkToBiography.replace('\n', '');
            linkToBiography = linkToBiography.trim();
            
            // Translated position
            var translatedPos = $(this).find('TranslatedPosition');
            if (translatedPos.length) 
            {
                translatedPos = $(translatedPos).text();
            }
            else 
            {
                translatedPos = 'ISS Astronaut';
            }
            
            // Agency
            var agency = $(this).find('AgencyShort');
            agency = agency.length > 0 ? $(agency).text() : undefined;
            
            // Social sites
            var socialSites = [];
            $(this).find('SocialSites').find('Site').each(function(index)
            {
                var name = $(this).find('SiteName');
                name = name.length > 0 ? $(name).text() : undefined;
                var url = $(this).find('Link');
                url = url.length > 0 ? $(url).text() : undefined;
                
                var link = 
                {
                    name: name,
                    link: url
                };
                
                socialSites.push(link);
            });
            
            var member = 
            {
                index: index,
        firstName: $(this).find('FirstName').text(),
                lastName: $(this).find('LastName').text(),
                shortBio: $(this).find('ShortBio').text(),
                linkToBiography: linkToBiography,
                linkToPhoto: linkToPhoto,
                translatedPosition: translatedPos,
                position: $(this).find('Position').text(),
                agency: agency,
                socialSites: socialSites,
                activities: []
            };
            
            // Get all activities associated with the crew member
            $(xml).find("Assignment:contains('" + member.position + "')").each(function(index)
            {
                var parent = $(this).closest('Event');
                member.activities.push(getActivity(parent));
            });
            
      
      member.activities.sort(date_sort_asc);
      
      // Update index
      for(var i = 0; i < member.activities.length; i++)
      { 
        member.activities[i].index = i; 
      }
      
            _crew.push(member);
        });

        var stop;
    };
    
  
  
  /**
   * Function used to extract day and night data from an 
   * xml document.
   * @param {Object} xml
   */
    var parseDayNigthPass = function(xml)
    {
        try 
        {
            // clear day nigth data array
      _dayNightPass.length = 0;
            var condition = undefined;
            
            // find day night condition on the xml
            $(xml).find('Condition').each(function(index)
            {
                if ($(this).attr('name') == "Sun Light") 
                {
                    condition = this;
                }
            });
      
            // If the sun ligth condition is found, process day night times
            if (condition != undefined) 
            {
        
        var dayList = new Array();
        // Extract all day passes found on the xml
        $(condition).find('DAYNIGHTPass').each(function(index)
                {
          // Find start and end elements
          var start = $(this).find('Start');
                    var End = $(this).find('End');
                    
          // Get string values
                    var strStart = $(start).find('dateTime').text();
                    var strEnd = $(End).find('dateTime').text();
                    
          // parse string
                    strStart = strStart.replace("T", " ");
                    strEnd = strEnd.replace("T", " ");
                    strStart = strStart.replace(/-/g, "/");
                    strEnd = strEnd.replace(/-/g, "/");
                    
                    // Convert string to date time object
                    var pass = 
                    {
                        index: index,
            start: new Date(strStart),
                        end: new Date(strEnd),
            type: 'day'
                    };
                    
                    dayList.push(pass);
                });
        
                // Sort all day passes found and evaluate for night passes
                dayList.sort(date_sort_asc);
        var lastDayPass = undefined;
                var index = 0;
                for (var i = 0; i < dayList.length; i++) 
                {
                    var currPass = dayList[i];
          
          // If the end of the last day pass does not match the start 
          // of the current day pass, there is a gap in time that 
          // should be treated as night pass 
          if(lastDayPass != undefined && lastDayPass.end != currPass.start)
          { 
                        var pass = 
                        {
                            index: index,
                            start: lastDayPass.end,
                            end: currPass.start,
                            type: 'night'
                        };
            _dayNightPass.push(pass);
            index++;
          }
          currPass.index = index;
          _dayNightPass.push(currPass);
          index++;
          lastDayPass = currPass;
                }
            }
            
            var stop;
        } 
        catch (e) 
        {
            alert(e);
        }
    };
    
    
    /**
     * Function used to extract S-band radio information from an XML.
     * This information is used to represent AOS/LOS data.
     * @param {Object} xml
     */
    var parseSBandRadio = function(xml)
    {
        // clear list
        _SBandRadio.length = 0;
        
        // find all SBDCommPass elements
        $(xml).find('SBDCommPass').each(function()
        {
            // Initialize data object
            var data = 
            {
                type: 'S-Band Radio',
                start: undefined,
                end: undefined
            };
            
            // Get start time 
            var start = $(this).find('Start').find('dateTime');
            if (start.length > 0) 
            {
                start = getDateFromTimeString($(start).text());
            }
            
            // Get end time
            var end = $(this).find('End').find('dateTime');
            if (end.length > 0) 
            {
                end = getDateFromTimeString($(end).text());
            }
            
            // update date
            data.start = start;
            data.end = end;
            
            // add to list
            _SBandRadio.push(data);
        });
        
        
        // Sort if list contains items
        if (_SBandRadio.length > 0) 
        {
            // sort by date
            _SBandRadio.sort(function(a, b)
            {
                // This is a comparison function that will result in dates 
                // being sorted in ASCENDING order. 
                if (a.start > b.start) return 1;
                if (a.start < b.start) return -1;
                return 0;
            });
        }
    };
  

  //check the read in data name with the category name displayed
  function compairCategoryName(xmlname, definitionName)
  {
    //exact match
    if(xmlname == definitionName)
    {
      return true;
    }
    /*
    var defnameSplit = definitionName.split(" ");
    
    var foundwords = 0;
    var ignoredWords = 0;
    var totalWords = defnameSplit.length;
    for(i = 0; i < defnameSplit.length; i++)
    {
    //console.log("looking for " + defnameSplit[i].toLowerCase() + " in " + xmlname);
      if( xmlname.indexOf(defnameSplit[i]) > 0)
      {
      //console.log("found " + defnameSplit[i].toLowerCase());
        //found word in string
        foundwords++;
      }
      else if(defnameSplit[i].toLowerCase() == "activities")
      {
      console.log("\tshould ignore " + defnameSplit[i].toLowerCase());
        ignoredWords++;
        totalWords -= 1;
      }
    }
    
    if(totalWords <= foundwords)
      return true;
    
    return false;
    */
  };
  
  //check if the string is already in the array
  function checkCategoryDefinitions( categoryName)
  {
    for( var i = 0; i < _CategoryDefinitions.length; i++)
    {
      if(_CategoryDefinitions[i] === categoryName)
      {
        return true;
      }
    }
    return false;
  }
  

  /** Category, parseScienceCategoryBands
   * Function used to parse and extract science band data from an XML.
   */
  function parseScienceBandsCategory(xml)
  {

    // clear category list
    _CategoryBands.length = 0;
    var pages = 0;
    //create a definition list from the available data
    _CategoryDefinitions.length = 0;
    $(xml).find('Category').each(function(index)
    {
      var foundCategoryName = $(this).text();
      
      //list is empty
      if(_CategoryDefinitions.length < 1)
      {
        _CategoryDefinitions.push(foundCategoryName);
      }
      
      //check existing list before adding
      if(!checkCategoryDefinitions(foundCategoryName))
      {
        _CategoryDefinitions.push(foundCategoryName);
      }
    });
    
    for (var i = 0; i < _CategoryDefinitions.length; i++) 
        {
            var categoryName = _CategoryDefinitions[i];
      var activities = [];
            
            // Search for all Assignment elements that contain this category
            $(xml).find('Category').each(function(index)
      {
        // Make sure that the name is an exact match and not part 
        // of the string value of the element found
        
        //if(categoryName == $(this).text()) //enable for exact match
        //if($(this).text().indexOf(categoryName) > 0) //match if the xml string contains the definition string
        if(compairCategoryName($(this).text(), categoryName))
        {
          //console.log('found: ' + categoryName);
                    var parent = $(this).closest('Event');
          activities.push(getActivity(parent));
        }
      });
      
      // if this band contains activities, add it to the band list
      if(activities.length > 0)
      { 
                // Sort and update the index of each activity
                activities.sort(date_sort_asc);
                
                // Update index
                for (var j = 0; j < activities.length; j++) { activities[j].index = j; }
        
        band = 
        {
          name: categoryName,
          activities: activities,
          translatedName: undefined,
          imageLink: undefined,
          link: undefined
        };
        
        // Find additional meta data from <TimelineBandData> element
        var tmlBandData = $(xml).find('TimelineBandData');
        if(tmlBandData.length > 0)
        { 
          //var bndData = $(tmlBandData).find("OriginalName:contains('" + categoryName + "')";
          var bndData = $(tmlBandData).find('OriginalName').filter(function(){
            return $(this).text() == categoryName;
          });
          
          if(bndData.length > 0)
          { 
            // try to get extended data if found on xml
            var parentBand = $(bndData).closest('Band');
            if(parentBand.length > 0)
            { 
              var getText = function(name)
              { 
                var result = $(parentBand).find(name);
                return parentBand.length > 0 ? $(result).text() : undefined;
              }
              band.translatedName =  getText('TranslatedName');
              band.imageLink =  getText('ImageLink'); 
              band.link = getText('Link');
            }
          }
        }
        _CategoryBands.push(band);
        
        //Insert a band that will act as a navigation button for each page of categories
        // add every 7 items and at the very end
        var addedNodeName = "Additional Categories";
        if((_CategoryBands.length) % 7 == pages || _CategoryDefinitions.length + pages == _CategoryBands.length)
        {
          if(_CategoryDefinitions.length + pages == _CategoryBands.length)
          {
            addedNodeName = "Page 1";
          }
          pages++;
          //console.log(_CategoryBands[_CategoryBands.length-1].name);
          var band = 
          {
            name: addedNodeName,
            activities: undefined,
            translatedName: undefined,
            imageLink: undefined,
            link: undefined
          };
          _CategoryBands.push(band);
        }
        
      }//end activity check and add

        }//_CategoryDefinitionsend of loop
  };


  /**
   * Function used to parse and extract science band data from an XML.
   */
  function parseScienceBandsModule(xml)
  {
        // Clear module list
    _ScienceBands.length = 0;
    
    for (var i = 0; i < _ScienceBandDefinitions.length; i++) 
        {
            var bandName = _ScienceBandDefinitions[i];
      var activities = [];
            
            // Search for all Assignment elements that contain this science band
            $(xml).find("Assignment:contains('" + bandName + "')").each(function(index)
      {
        // Make sure that the name is an exact match and not part 
        // of the string value of the element found
        if(bandName == $(this).text())
        { 
                    var parent = $(this).closest('Event');
          activities.push(getActivity(parent));
        }
      });
      
      // if this band contains activities, add it to the band list
      if(activities.length > 0)
      { 
                // Sort and update the index of each activity
                activities.sort(date_sort_asc);
                
                // Update index
                for (var j = 0; j < activities.length; j++) { activities[j].index = j; }
        
        band = 
        {
          name: bandName,
          activities: activities,
          translatedName: undefined,
          imageLink: undefined,
          link: undefined
        };
        
        // Find additional meta data from <TimelineBandData> element
        var tmlBandData = $(xml).find('TimelineBandData');
        if(tmlBandData.length > 0)
        { 
          //var bndData = $(tmlBandData).find("OriginalName:contains('" + bandName + "')";
          var bndData = $(tmlBandData).find('OriginalName').filter(function(){
            return $(this).text() == bandName;
          });
          
          if(bndData.length > 0)
          { 
            // try to get extended data if found on xml
            var parentBand = $(bndData).closest('Band');
            if(parentBand.length > 0)
            { 
              var getText = function(name)
              { 
                var result = $(parentBand).find(name);
                return parentBand.length > 0 ? $(result).text() : undefined;
              }
              band.translatedName =  getText('TranslatedName');
              band.imageLink =  getText('ImageLink'); 
              band.link = getText('Link');
            }
          }
        }
        
        _ScienceBands.push(band);
      }
      
      

        }
  };
  
  /**
   * An object representing an activity found on a given XML node.
   * @param {Object} xml
   */
    function getActivity(xmlNode)
    {
        var getText = function(childName)
        {
            child = $(xmlNode).find(childName);
            return child.length == 1 ? $(child).text() : undefined;
            ;
        };
        
        var name = getText('TranslatedName');
        var startTime = getText('StartTime');
        var endTime = getText('EndTime');
        var color = '#' + getText('HexColorCode');
        var category = getText('Category');
        var description = getText('TranslatedOpsNote');
        
        name = name.trim(); // Trim the name of the activity
        name = name.replace(/(\r\n|[\r\n])/g, ""); // replace carriage returns
        name = name.replace(/\s{2,}/g, ' '); // replace double spaces
        
    // Extract links
        var links = [];
        var originalData = $(xmlNode).find('OriginalData');
        if (originalData.length == 1) 
        {
            $(originalData).find('Link').each(function(index)
      {
        //<Link type="Video" name="Name4" usage="0">http://www.nasa.gov/multimedia/videogallery/index.html?media_id=97769842</Link>
        var type = $(this).attr('type');
        var lName = $(this).attr('name');
        var url = $(this).text();
        var link = 
        {
          type: type,
          name: lName,
          url: url
        };  
        
        links.push(link);
      });
        }
    
        var activity = 
        {
            index: undefined,
            label: name,
            start: new Date(startTime),
            end: new Date(endTime),
            color: color,
            category: category,
            description: description,
      links: links
        };
        
    return activity;
    };
  
    /**
     * Function takes a string like 2011-08-09T23:41:03 and
     * parses it into a date object
     * @param {Object} str
     */
    var getDateFromTimeString = function(str)
    {
        try 
        {
            if (str != undefined) 
            {
                // Separate the date from the time
                var arr = str.split("T");
                var strDate = arr[0];
                var strTime = arr[1];
                strDate = strDate.replace(/-/g, "/");
                var date = new Date(strDate + " " + strTime);
                return date;
            }
        } 
        catch (e) 
        {
        }
        return undefined;
    };
    

    
    /**
     * Function processes the given xml into crew data, day night and
     * aos los data.
     * @param {Object} xml
     */
    this.parseXML = function(xml)
    {
      /* Use the XML obtained for June 17/18/19 for a data source instead of incoming data, 168, 169, 170 */
      /*
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET","../xml/2013_168.xml",false);
    xmlhttp.send();
    xml = xmlhttp.responseXML;
      */
    /* End of Use the XML obtained for June 17/18/19 for a data source instead of incoming data, 168, 169, 170 */
        try 
        {
          //determine if science timeline.  Only science data, do not parse day night or sband radio
      if($('#science-sidemnu').length)
      {
        //only run if science timeline
        parseScienceBandsModule(xml);
        parseScienceBandsCategory(xml);
      }
      else
      {
        //only run if crew timeline
        parseCrew(xml);
        parseDayNigthPass(xml);
        parseSBandRadio(xml);
      }            
        } 
        catch (err) 
        {
            alert('XML parsing error: ' + err);
        }
    };
    
    /**
     * Function used to search for the index of a crew member that
     * matches the given condition
     *
     * @param {Object} comparer
     */
    var getIndexOfCrew = function(condition)
    {
        for (var i = 0; i < _crew.length; i++) 
        {
            try 
            {
                if (condition(_crew[i])) 
                {
                    return i;
                }
            } 
            catch (err) 
            {
            }
        }
        return -1;
    };
    
    /**
     * Returns the index of the first crew member found that
     * matches the given condition.
     * @param {Object} condition
     */
    this.searchCrew = function(condition)
    {
        return getIndexOfCrew(condition);
    };
    
    /**
     * Returns the crew member associated with the given index
     * @param {Object} index
     */
    this.getMember = function(index)
    {
        // Check out of bounds index 
        if (index > _crew.length || index < 0) 
        {
            return null;
        }
        
        return _crew[index];
    };
  
  /**
   * Returns an array composed of all the members of the crew.
   */
  this.getCrew = function()
  { 
    return _crew;
  };
  
  /**
   * Function searches the activities of a crew member for an activity 
   * that matches the given condition
   * @param {Object} condition
   */
  this.searchActivities = function(index, condition)
  { 
    var member = this.getMember(index);
    if(member == null){ return null;  }
    
    for(var i = 0; i < member.activities.length; i++)
    { 
      var activity = member.activities[i];
            try 
            {
              if(condition(activity))
        {
          return activity;
        }
            } 
            catch (err) {}
    }
    
    return null;
  };
  
  /**
   * Function used to search day night pass data.
   * @param {Object} condition
   */
  this.searchDayNightPass = function(condition)
  {
    // Return if condition is undefined
    if(condition == null 
    || condition == undefined 
    || _dayNightPass.length == 0){  return null; }
    
    for(var i = 0;i < _dayNightPass.length; i++)
    { 
      var pass = _dayNightPass[i];
            try 
            {
                if(condition(pass))
        {
          return pass; 
        }
            } 
            catch (err) { }
    }
    
    return null;
  };

  /**
   * 
   */
  this.getDayNightPass = function(index)
  {
    // Check if index is out of bounds 
    if(index < 0 || _dayNightPass.length == 0 || index > _dayNightPass.length )
    {
       return null;
    }
    return _dayNightPass[index];
  }; 
  
  /**
   * 
   */
  this.getDayNightPassList = function()
  {
    return _dayNightPass;
  };
  
  /**
   * 
   */
  this.getSBandRadioList = function()
  { 
    return _SBandRadio;
  };
  
  /**
   * Returns an array composed of objects representing the science band 
   * data found on the parsed XML.
   * 
   */
  this.getScienceBandList = function()
  { 
    return _ScienceBands;
  };
  
  /**
   * Returns an array composed of objects representing the science category 
   * data found on the parsed XML.
   * 
   */
  this.getCategoryList = function()
  { 
    return _CategoryBands;
  };
  
  /**
   * Return band located at the given index
   * @param {Object} index
   */
  this.getScienceBand = function(index)
  { 
    // Check for out of bounds index
    if(index < 0 || index > _ScienceBands.length){  return null; }
    return _ScienceBands[index];
  };
  
  /**
   * Return category located at the given index
   * @param {Object} index
   */
  this.getCategory = function(index)
  { 
    // Check for out of bounds index
    if(index < 0 || index > _CategoryBands.length){  return null; }
    return _CategoryBands[index];
  };
};
