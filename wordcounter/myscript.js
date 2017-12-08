var storydiv = "st_inside";
var storyclass = "z-list mystories";

var favediv = "fs_inside";
var faveclass = "z-list favstories";


function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function wordcount(idname, classname){
  var wordcount = 0;
    var div = document.getElementById(idname);
    if(div){
      var wordcount = 0;
      var stories = div.getElementsByClassName(classname);

      for (i = 0; i < stories.length; i++) { 
          var str = stories[i].getAttribute("data-wordcount");
          wordcount += Number(str);
      }
    }
    return wordcount;
}

function roundtext(x, truncatemillions) {
    if (truncatemillions == undefined || (truncatemillions != "true" && truncatemillions != "false")) {
      truncatemillions = "true";
    }
    var str;
    if(x>=1000000 && truncatemillions == "true"){ 
      var millions = Math.floor(x/1000000);
      var afterdecimal = Math.floor((x-(millions*1000000))/100000) //get rid of millions amount and use same process
      str = millions + "." + afterdecimal + "mil" 
    }
    else if(x>=1000){ str = Math.floor(x/1000) + "k"}
    else{str = "<1k"}
  return str;
}


chrome.storage.sync.get(['truncate'], function(items) {
  var truncatemillions = items["truncate"]; //unnecessary if storywordcount and favewordcount are both zero, but that's rare and not worth sacrificing simplicity for
  console.log("Got settings with truncate: " + truncatemillions);
  var storywordcount = wordcount(storydiv, storyclass);
  var favewordcount = wordcount(favediv, faveclass);

  //add to page
  var td = document.getElementsByTagName('td')[4]; //There's no class or id attached, so I just found it by trial and error.
  var addbefore = td.childNodes[2];

  //for (i = 0; i < td.childNodes.length; i++) { 
  //      console.log(td.childNodes[i]);
  //  }

  if(storywordcount>0){
    var storyspan = document.createElement('span');
    storyspan.setAttribute("title", numberWithCommas(storywordcount)+"");
    storyspan.innerHTML = ", Words Written: " + roundtext(storywordcount, truncatemillions) + "";
    td.insertBefore(storyspan, addbefore);
  }
  if(favewordcount>0){
    var favespan = document.createElement('span');
    favespan.setAttribute("title", numberWithCommas(favewordcount)+"");
    favespan.innerHTML = ", Words Favorited: " + roundtext(favewordcount, truncatemillions) + ""; 
    td.insertBefore(favespan, addbefore);
  }
});