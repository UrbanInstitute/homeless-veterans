
var slide = 0;
var numSlides;
var initialload = true;


var chapterBreaks = [2,14,23,44];


$( document ).ready(function() {

    $("div.slide").each(function(i){
      $(this).attr("id", "slide_" + i);
      numSlides = i;
  })
    $("div.slide").each(function(index){
    })

    if (QueryString.slide){
      gotoslide(QueryString.slide);
      initialload=false;
  }else{
      gotoslide(0);
  }
});

function gotoslide(index){ //goes to the slide with number specified in index

    // custom click tracking
    $(this)
    .custom_analytics('track',{
        category: "Vets slide",
        action: "progress",
        label: "slide goto",
        value: index,
        timing: true,
        interaction: true
    });


	if (index == 0){
		$(".next-back").addClass("btn-hidden");
		if (initialload){
			initialload = false;
			return;
		}
	}
	else{
		$(".next-back").removeClass("btn-hidden");
	}

    var currentSlide = parseInt($( "div.slide.active" ).attr('id').split("_")[1]);

    if (currentSlide == index){return;}

    $( "div.slide.active" ).addClass("transition");

    //when leaving a slide, turn off iframe
    $( "div.slide.active.transition" ).find("iframe").each(function(){
        $(this).attr("data-src",$(this).attr("src"));
        $(this).attr("src",'');
    });


    $('#slide_'+index).addClass("active");
    $( "div.slide.active.transition" ).removeClass("active");
    $( "div.slide.transition" ).removeClass("transition");

    if (index == numSlides){
      $("#next-btn").addClass("btn-hidden");
    }else{
      $("#next-btn").removeClass("btn-hidden");
    }

    //turn on all iframes on the slide
    var thisFrameSrc = $('#slide_'+index).find("iframe").attr("data-src");

    if (thisFrameSrc){
        $('#slide_'+index).find("iframe").each(function(){
            $(this).attr("src",$(this).attr("data-src"));
        });
    }

        // update URL
        var newURL = updateURLParameter(window.location.href, 'slide', index);
        newURL = updateURLParameter(newURL, 'slide', index);


    if (isIE () && isIE () < 10) {
     // is IE version less than 10
    } else {
     // is IE 10 and later or not IE
     var stateObj = { foo: "Veterans" };
        history.pushState(stateObj, "Homeless on the Home Front", newURL);

    }


    //chapter navigation
    if (index == 0){ //home
        $(".chapter0").addClass("chapter-active");
        if ($( ".chapter1" ).hasClass( "chapter-active" )){$(".chapter2").removeClass("chapter-active");}
        if ($( ".chapter2" ).hasClass( "chapter-active" )){$(".chapter2").removeClass("chapter-active");}
        if ($( ".chapter3" ).hasClass( "chapter-active" )){$(".chapter3").removeClass("chapter-active");}
        if ($( ".chapter4" ).hasClass( "chapter-active" )){$(".chapter4").removeClass("chapter-active");}
    }
    else if ((index >= chapterBreaks[0]) && (index < chapterBreaks[1])){ //chapter 1
        $(".chapter1").addClass("chapter-active");
        if ($( ".chapter0" ).hasClass( "chapter-active" )){$(".chapter0").removeClass("chapter-active");}
        if ($( ".chapter2" ).hasClass( "chapter-active" )){$(".chapter2").removeClass("chapter-active");}
        if ($( ".chapter3" ).hasClass( "chapter-active" )){$(".chapter3").removeClass("chapter-active");}
        if ($( ".chapter4" ).hasClass( "chapter-active" )){$(".chapter4").removeClass("chapter-active");}
    }
    else if ((index >= chapterBreaks[1]) && (index < chapterBreaks[2])){ //chapter 2
        $(".chapter2").addClass("chapter-active");
        if ($( ".chapter0" ).hasClass( "chapter-active" )){$(".chapter0").removeClass("chapter-active");}
        if ($( ".chapter1" ).hasClass( "chapter-active" )){$(".chapter1").removeClass("chapter-active");}
        if ($( ".chapter3" ).hasClass( "chapter-active" )){$(".chapter3").removeClass("chapter-active");}
        if ($( ".chapter4" ).hasClass( "chapter-active" )){$(".chapter4").removeClass("chapter-active");}
    }
    else if ((index >= chapterBreaks[2]) && (index < chapterBreaks[3])){ //chapter 3
        $(".chapter3").addClass("chapter-active");
        if ($( ".chapter0" ).hasClass( "chapter-active" )){$(".chapter0").removeClass("chapter-active");}
        if ($( ".chapter1" ).hasClass( "chapter-active" )){$(".chapter1").removeClass("chapter-active");}
        if ($( ".chapter2" ).hasClass( "chapter-active" )){$(".chapter2").removeClass("chapter-active");}
        if ($( ".chapter4" ).hasClass( "chapter-active" )){$(".chapter4").removeClass("chapter-active");}
    }
    else if (index >= chapterBreaks[3]){ //chapter 4
        $(".chapter4").addClass("chapter-active");
        if ($( ".chapter0" ).hasClass( "chapter-active" )){$(".chapter0").removeClass("chapter-active");}
        if ($( ".chapter1" ).hasClass( "chapter-active" )){$(".chapter1").removeClass("chapter-active");}
        if ($( ".chapter3" ).hasClass( "chapter-active" )){$(".chapter3").removeClass("chapter-active");}
        if ($( ".chapter2" ).hasClass( "chapter-active" )){$(".chapter2").removeClass("chapter-active");}
    }
}


$("#next-btn").click(function(){
goNext();
});

$("#back-btn").click(function(){
goBack();
});

$(document).keydown(function(e) {
    switch(e.which) {
        case 37: goBack();// left
        break;

        case 38: goBack();// up
        break;

        case 39: goNext();// right
        break;

        case 40: goNext();// down
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});

$(".slide").on("swipeleft",function(){
  goNext();
});

$(".slide").on("swiperight",function(){
  goBack();
});



function goNext(){
    //get current slide ID
    var currentID = parseInt($( "div.slide.active" ).attr('id').split("_")[1]);
    //go to slide with current ++

    if (currentID < numSlides){
        gotoslide(currentID+1); 
    }
};

function goBack(){
        //get current slide ID
    var currentID = parseInt($( "div.slide.active" ).attr('id').split("_")[1]);
    //go to slide with current --
        if (currentID > 0){
            gotoslide(currentID-1);
        }
}


$(".about").click(function(){
	$("div.about-slide").addClass("about-active");
});



$("#return-feature").click(function(){
	$("div.about-slide").removeClass("about-active");
});


$("#start").click(function (){
	gotoslide(1);
});

$(".chapter0").click(function (){
    gotoslide(0);
});
$(".chapter1").click(function (){
    gotoslide(chapterBreaks[0]);
});
$(".chapter2").click(function (){
    gotoslide(chapterBreaks[1]);
});
$(".chapter3").click(function (){
    gotoslide(chapterBreaks[2]);
});
$(".chapter4").click(function (){
    gotoslide(chapterBreaks[3]);
});

$("#top-nav-title").click(function(){
    gotoslide(0);
})

var QueryString = function () {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
  	var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
        	query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
    	var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
    	query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
    	query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
} 
return query_string;
}();


function updateURLParameter(url, param, paramVal)
{
    var TheAnchor = null;
    var newAdditionalURL = "";
    var tempArray = url.split("?");
    var baseURL = tempArray[0];
    var additionalURL = tempArray[1];
    var temp = "";

    if (additionalURL) 
    {
        var tmpAnchor = additionalURL.split("#");
        var TheParams = tmpAnchor[0];
        TheAnchor = tmpAnchor[1];
        if(TheAnchor)
            additionalURL = TheParams;

        tempArray = additionalURL.split("&");

        for (i=0; i<tempArray.length; i++)
        {
            if(tempArray[i].split('=')[0] != param)
            {
                newAdditionalURL += temp + tempArray[i];
                temp = "&";
            }
        }        
    }
    else
    {
        var tmpAnchor = baseURL.split("#");
        var TheParams = tmpAnchor[0];
        TheAnchor  = tmpAnchor[1];

        if(TheParams)
            baseURL = TheParams;
    }

    if(TheAnchor)
        paramVal += "#" + TheAnchor;

    var rows_txt = temp + "" + param + "=" + paramVal;
    return baseURL + "?" + newAdditionalURL + rows_txt;
}

function isIE () {
  var myNav = navigator.userAgent.toLowerCase();
  return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}
