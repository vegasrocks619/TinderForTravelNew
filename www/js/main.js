//var paneArray=["pane"]
var imageMap= {
					"adventure0": {latitude:9.32878, longitude:76.377716}, //wonderla
					"adventure1": {latitude:12.771837, longitude:77.484771}, //dirt mania adventure
					"adventure2": {latitude:12.77012, longitude: 77.56777}, //banerghatta national park
					"adventure3": {latitude:17.423947, longitude: 78.510353}, //skandagiri trek 
					"adventure4": {latitude:12.217127, longitude:75.608806}, //Tadiyandamol
					"food0": {latitude:12.908168, longitude:77.55936}, //park plaza
					"food1": {latitude:12.994604, longitude:77.625725}, //ITC gardenia
					"food2": {latitude:13.032298, longitude:77.580517}, //IBIS
					"food3": {latitude:13.228754, longitude:77.689801}, //Keys
					"food4": {latitude:12.988445, longitude:77.547861}, //AB's
					"history0": {latitude:28.705128, longitude:77.176914}, //lal bagh
					"history1": {latitude:12.975536, longitude:77.591}, //cubbon park
					"history2": {latitude:12.998678, longitude:77.592221}, //bangalore palace
					"history3": {latitude:12.967933, longitude: 77.593043}, //bangalore fort
					"history4": {latitude:13.248961, longitude:77.709795}, //devanhalli fort
					"history5": {latitude:43.8789 , longitude: 103.4598},
					"music0": {latitude:13.016229, longitude:77.565971}, // Chowdiah Memorial Hall
					"music1": {latitude:12.978239 , longitude:77.644388}, // Goethe-Institute Max Mueller Bhavan
					"music2": {latitude:12.971599, longitude:77.594563}, // WXYZ Bar - Aloft 
					"music3": {latitude:12.991428, longitude:77.596921}, //Alliance Francaise de Bangalore
					"music4": {latitude:12.971599, longitude:77.594563} //Ruh - The Soul of the Desert
		};
var categoryCountMap=localStorage.getItem("categoryCount") !== null?JSON.parse(localStorage.getItem("categoryCount")):{};
var likedIds=[];
var likedTitles=[];
var categoryIds=[];
var categoryTitles=[];
var imagesArr=[];
var sortedMapObject={};
var imagesArr = [{"id":"adventure0","category":"adventure","event":"","like":"0","title":"Wonderla"},
                 {"id":"food0","category":"food","event":"","like":"0","title":"Park Plaza"},
                 //{"id":"religion0","category":"religion","event":"","like":"0"},
                 {"id":"music0","category":"music","event":"","like":"0","title":"Chowdiah Memorial Hall"},
                 //{"id":"sports0","category":"sports","event":"","like":"0"},
                 {"id":"adventure1","category":"adventure","event":"","like":"0","title":"Dirt Mania Adventure"},
                 {"id":"food1","category":"food","event":"","like":"0","title":"ITC Gardenia"},
                 //{"id":"religion1","category":"religion","event":"","like":"0"},
                 {"id":"music1","category":"music","event":"","like":"0","title":"Goethe-Institute Max Mueller"},
                 //{"id":"sports1","category":"sports","event":"","like":"0"},
                 {"id":"adventure2","category":"adventure","event":"","like":"0","title":"Banerghatta National Park"},
                 {"id":"food2","category":"food","event":"","like":"0","title":"IBIS"},
                 //{"id":"religion2","category":"religion","event":"","like":"0"},
                 {"id":"music2","category":"music","event":"","like":"0","title":"WXYZ Bar - Aloft"},
                 //{"id":"sports2","category":"sports","event":"","like":"0"},
                 {"id":"adventure3","category":"adventure","event":"","like":"0","title":"Skandagiri Trek"},
                 {"id":"food3","category":"food","event":"","like":"0","title":"Keys"},
                 //{"id":"religion3","category":"religion","event":"","like":"0"},
                 {"id":"music3","category":"music","event":"","like":"0","title":"Alliance Francaise de Bangalore"},
                 //{"id":"sports3","category":"sports","event":"","like":"0"},
                 {"id":"adventure4","category":"adventure","event":"","like":"0","title":"Tadiyandamol"},
                 {"id":"food4","category":"food","event":"","like":"0","title":"AB's"},
                 //{"id":"religion4","category":"religion","event":"","like":"0"},
                 {"id":"music4","category":"music","event":"","like":"0","title":"Ruh - The Soul of the Desert"},
                 //{"id":"sports4","category":"sports","event":"","like":"0"}
                 ];
var currentImage= imagesArr.length-1;
					
function initialiseApp(){

            	$("#map-canvas").hide();
				$("#likesPage").hide();
				$("#description-page").hide();
				
				loadInitialImages();
				var loadedImageId=$("#events_list li").last().attr("id");
				$("#back-cover").css("background","url('../www/images/main/"+loadedImageId.substring(0,loadedImageId.length-1)+"/"+loadedImageId.substring(loadedImageId.length,loadedImageId.length-1)+".jpg')  no-repeat 0px 0px");
				$("#back-cover").css("background-size","cover");
				$("#back-cover").css("filter","blur(5px)");
				$("#back-cover").css("-webkit-filter","blur(5px)");
				
				
				
				$("#sliderContainer").vTiwari({
				// dislike callback
				onDislike: function (item) {
					// Perform some logic
					categoryCount(item.attr("id"),false);
				if(currentImage!=0){
						var loadedImageId=imagesArr[--currentImage].id;
						$("#back-cover").css("background","url('../www/images/main/"+loadedImageId.substring(0,loadedImageId.length-1)+"/"+loadedImageId.substring(loadedImageId.length,loadedImageId.length-1)+".jpg')  no-repeat 0px 0px");
									$("#back-cover").css("background-size","cover");
				}
				   if(item.hasClass("lastItem")){
						putInDatabase(categoryCountMap);
						pageNavigation();
				   }
				},
				// like callback
				onLike: function (item) {
					// Perform some logic
					likedIds.push(item.attr("id"));	
					likedTitles.push($("#"+item.attr("id")+" font").html());	
				categoryCount(item.attr("id"),true);
				if(currentImage!=0){
						var loadedImageId=imagesArr[--currentImage].id;
						$("#back-cover").css("background","url('../www/images/main/"+loadedImageId.substring(0,loadedImageId.length-1)+"/"+loadedImageId.substring(loadedImageId.length,loadedImageId.length-1)+".jpg')  no-repeat 0px 0px");
									$("#back-cover").css("background-size","cover");
				}
				
					/*
					for(var i=imagesArr.length-1,j=i-1;i>=0 && j>=0;i--,j--){
						if(imagesArr[i].id==item.attr("id")){
							imagesArr[i].like="1";
							var category =  item.attr("id").substring(0,item.attr("id").length-1);
							if(imagesArr[j].category!=category){
								orderArray(j,imagesArr,category);
							}
						}
					}*/		
					if(item.hasClass("lastItem")){
						putInDatabase(categoryCountMap);
						pageNavigation();
					}		
				},
				animationRevertSpeed: 200,
				animationSpeed: 400,
				threshold: 1,
				likeSelector: '.like',
				dislikeSelector: '.dislike'
			});
	
}



/**
 * Set button action to trigger vTiwari like & dislike.
 */
$('.actions .like, .actions .dislike').click(function(e){
	e.preventDefault();
	$("#sliderContainer").vTiwari($(this).attr('class'));
});


/*(function(){
	$("#map-canvas").hide();
	$("#likesPage").hide();
	$("#description-page").hide();
	
	loadInitialImages();
	var loadedImageId=$("#events_list li").last().attr("id");
			$("#back-cover").css("background","url('../www/images/main/"+loadedImageId.substring(0,loadedImageId.length-1)+"/"+loadedImageId.substring(loadedImageId.length,loadedImageId.length-1)+".jpg')  no-repeat 0px 0px");
			$("#back-cover").css("background-size","cover");
			  $("#back-cover").css("filter","blur(5px)");
			  $("#back-cover").css("-webkit-filter","blur(5px)");
})();
*/
function shuffleArray(img,index,categ,prev){
	for(var i=index+1;i<img.length;i++){
		if(img[i].category==categ){
			var imgTemp=img[prev];
			img[prev]=img[i];
			img[i]=imgTemp;
			if($(img[prev].id).hasClass("lastItem")){
				$(img[prev].id).removeClass("lastItem");
				updateLastItem();
			}
			break;
		}
	}
}

function updateLastItem(){
	$("#events_list :first-child").addClass("lastItem");
	
}

function putInDatabase(map){
	window.localStorage.setItem("categoryCount",JSON.stringify(map));
}



function categoryCount(categoryId,like){
	var category= categoryId.substring(0,categoryId.length-1);
	if(like){
		if(typeof (categoryCountMap[category])!=="undefined"){
			categoryCountMap[category]+=1;
		}else{
			categoryCountMap[category]=1;
		}
		
	}else{
		if(typeof (categoryCountMap[category])!=="undefined"){
			categoryCountMap[category]-=1;
		}else{
			categoryCountMap[category]=-1;
		}
	}
}

function orderArray(index,arr,category)
{
	for(var x=index;x>=0;x--)
	{
		if(imagesArr[x].category==category){
			var prev = imagesArr[x];
			imagesArr[x]=imagesArr[index];
			imagesArr[index]=prev;
			if($("#"+imagesArr[index].id).hasClass("lastItem")){
				$("#"+imagesArr[index].id).removeClass("lastItem");	
				updateLastItem();
			}
				imagesArr.splice(index+1,1);
				loadInitialImages();
			break;
		}
	}

}




function pageNavigation(){
	$("#page1").hide();
	$(".wrap").hide();
	$(".actions").hide();
	//onSuccess(); //loads the map
	//$("#map-canvas").show();
	updateLikedItems();
	$("#likesPage").show();
}

function reStructureImagesArr(imagesArr,categoryCountMap){
	sortedMap= sortCategoryCountMap(categoryCountMap);
	for(var i=0;i<sortedMap.length;i++){
		sortedMapObject[sortedMap[i][0]]=sortedMap[i][1];
	}
	imagesArr.sort(compare);
}

function compare(a,b) {
  if (sortedMapObject[a.category] < sortedMapObject[b.category])
    return -1;
  if (sortedMapObject[a.category] > sortedMapObject[b.category])
    return 1;
  return 0;
}


function sortCategoryCountMap(map){
	var sortable = [];
	for (var category in map)
		  sortable.push([category, map[category]])
	sortable.sort(function(a, b) {return a[1] - b[1]})
	return sortable;
}


function loadInitialImages(){
    if(localStorage.getItem("categoryCount") !== null){
        reStructureImagesArr(imagesArr,JSON.parse(localStorage.getItem("categoryCount")));
    }
    
    /*if(imagesArr.length===0){
     imagesArr = [{"id":"adventure0","category":"adventure","event":"","like":"0"},
     {"id":"food0","category":"food","event":"","like":"0"},
     //{"id":"religion0","category":"religion","event":"","like":"0"},
     {"id":"music0","category":"music","event":"","like":"0"},
     //{"id":"sports0","category":"sports","event":"","like":"0"},
     {"id":"adventure1","category":"adventure","event":"","like":"0"},
     {"id":"food1","category":"food","event":"","like":"0"},
     //{"id":"religion1","category":"religion","event":"","like":"0"},
     {"id":"music1","category":"music","event":"","like":"0"},
     //{"id":"sports1","category":"sports","event":"","like":"0"},
     {"id":"adventure2","category":"adventure","event":"","like":"0"},
     {"id":"food2","category":"food","event":"","like":"0"},
     //{"id":"religion2","category":"religion","event":"","like":"0"},
     {"id":"music2","category":"music","event":"","like":"0"},
     //{"id":"sports2","category":"sports","event":"","like":"0"},
     {"id":"adventure3","category":"adventure","event":"","like":"0"},
     {"id":"food3","category":"food","event":"","like":"0"},
     //{"id":"religion3","category":"religion","event":"","like":"0"},
     {"id":"music3","category":"music","event":"","like":"0"},
     //{"id":"sports3","category":"sports","event":"","like":"0"},
     {"id":"adventure4","category":"adventure","event":"","like":"0"},
     {"id":"food4","category":"food","event":"","like":"0"},
     //{"id":"religion4","category":"religion","event":"","like":"0"},
     {"id":"music4","category":"music","event":"","like":"0"},
     //{"id":"sports4","category":"sports","event":"","like":"0"}
     ];
     }
     else{
     $("ul li").remove();
     }*/
    var imagePath = "../www/images/main";
    for(var i=0;i<imagesArr.length;i++){
        var panelClass="pane"+(i+1);
        var image = imagesArr[i];
        var imageId =  image.id.replace ( /[^\d]/g, '' );
        var img = parseInt(imageId);
        var imageSrc = imagePath+"/"+image.category+"/"+img+".jpg";
        var  li = document.createElement('li');
        var imageDiv= document.createElement('div');
        var titleDiv = document.createElement('div');
        var titleFont = document.createElement('font');
		
        $("<font style='font-size:1em; color:#fff; font-weight:500; margin-bottom:0.5em; font-family: 'Raleway', sans-serif; padding: 4px 13px 7px; word-wrap: break-word;'>"+imagesArr[i].title+"</font>").appendTo(titleDiv);
        $(titleDiv).css("background-color","rgba(0,0,0,0.8)");
		$(titleDiv).css("width","100%");
		$(titleDiv).css("padding","1em");
		$(titleDiv).css("position","absolute");
		$(titleDiv).css("bottom","0");
		$(titleDiv).children().css("color","white");
        $(li).attr("id",image.id);
        $(imageDiv).css("background","url(\'"+imageSrc+"\') no-repeat scroll center center");
        $(imageDiv).addClass("img");
        $(imageDiv).css("background-size", "cover");
        $(imageDiv).append(titleDiv);
        var likeDiv= document.createElement('div');
        $(likeDiv).addClass("like");
        var dislikeDiv= document.createElement('div');
        $(dislikeDiv).addClass("dislike");
        li.appendChild(imageDiv);
        li.appendChild(likeDiv);
        $(li).addClass(panelClass);
        li.appendChild(dislikeDiv);
        var ul = document.getElementById("events_list");
        var divCont = document.getElementById("sliderContainer");
        var wrap = document.getElementById("mainBody");
        ul.appendChild(li);
        divCont.appendChild(ul);
        wrap.appendChild(divCont);
        
        if(i===0){
            $(li).addClass("lastItem");
        }
    }
    
}



function updateLikedItems(){
	var music=0,history=0,adventure=0,sports=0,food=0,religion=0;
	for(var i=0;i<likedIds.length;i++){
		var category=likedIds[i].substring(0, likedIds[i].length-1);
		switch(category){
			case "music": music++; break;
			case "history": history++; break;
			case "adventure": adventure++; break;
			case "sports": sports++; break;
			case "food": food++; break;
			case "religion": religion++; break;
		}
	}
	
	$("li[data-item='music'] .numLikes").html(music);
		$("li[data-item='history'] .numLikes").html(history);
			$("li[data-item='adventure'] .numLikes").html(adventure);
				$("li[data-item='sports'] .numLikes").html(sports);
					$("li[data-item='food'] .numLikes").html(food);
						$("li[data-item='religion'] .numLikes").html(religion);
}

function openMap(category){
	
	for(var i=0;i<likedIds.length;i++){
		if(likedIds[i].substring(0, likedIds[i].length-1) === category){
			categoryIds.push(likedIds[i]);
			categoryTitles.push(likedTitles[i]);
			onSuccess(); //loads the map
			$("#map-canvas").show();
			$("#likesPage").hide();
		}
	}
}