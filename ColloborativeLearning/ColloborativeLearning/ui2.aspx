<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ui1.aspx.cs" Inherits="ColloborativeLearning.ui1" %>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0"/>
  <title>Collaborative Learning</title>
  <!-- CSS  -->
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link href="css/materialize.css" type="text/css" rel="stylesheet" media="screen,projection"/>
  <link href="css/style.css" type="text/css" rel="stylesheet" media="screen,projection"/>
  <script src="https://d3js.org/d3.v4.js"></script>
  <link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.6.0/pure-min.css">
</head>
<body>
<%--	<nav class="teal lighten-2" id="nav">
    <div class="container"><a id="logo-container" href="#" class="brand-logo">GROUP<i class="material-icons large right" style="font-size: 1.6em; margin-left:0">looks_6</i></a>
      <ul class="right hide-on-med-and-down">
        <li><a href="#"><i class="material-icons large" style="font-size: 3em; margin-left:0">power_settings_new</i></a></li>
      </ul>
    </div>
  </nav>--%>

    <div class="pure-menu pure-menu-horizontal" style="background-color:black;" id="nav">
        <a href="#" class="pure-menu-heading pure-menu-link">CS-424</a>
        <ul class="pure-menu-list">
            <li class="pure-menu-item"></li>
            <li class="pure-menu-item"><a href="Default1.html" class="pure-menu-link">Home</a></li>
            <li class="pure-menu-item"><a href="HTML/RadialTree.html" class="pure-menu-link">Compare Wait Times</a></li>
            <li class="pure-menu-item"><a href="About.html" class="pure-menu-link">About</a></li>
            <li class="pure-menu-item"><a href="Contact.html" class="pure-menu-link">Contact Us</a></li>
        </ul>
    </div>

  <div id="container" >
  <svg style="width:100%;height:100%;" id="svg1"></svg>
  </div>
 
  <style>
  .rectStyle
  {
  	opacity:0.2;
  	fill:'grey';
  }
  </style>

  <script>

  var numSharedScreen=0;
  var numLocalScreen=3;
  var objectsLocalScreen=['object1','object2','object3'];
  var objectsSharedScreen=[];
  var draggedOn='';
  var draggedFrom = '';
  var object1;
  var object2;
  var object3;
  var object4;
  var object1Shared;
  var object2Shared;
  var object3Shared;
  var object4Shared;

  var margin={"left":2, "right":2, "top":2, "bottom":2};
    var width = window.innerWidth;
    var height = window.innerHeight;

  var element = document.getElementById('nav');
  var positionInfo = element.getBoundingClientRect();
  var navHeight = positionInfo.height;
  var navWidth = positionInfo.width;

  console.log(navWidth);
  console.log(navHeight);

  var divHeight= height-navHeight-10;
  var divWidth=width- 10;
  console.log(divHeight);
  console.log(divWidth);

  d3.select("#container")
  .style('width', divWidth + 'px')
  .style('height',divHeight +'px')

  d3.select('#svg1').append('rect').attr('id','localArea')
  .attr('x', function()
  {
  	return (2/100)*divWidth;
  })
  .attr('y', function()
  {
  	return (2/100)*divHeight;
  })
  .attr('width', function()
  {
  	return divWidth*(20/100);
  	//return '25%';
  })
  .attr('height', function(){
  	return divHeight*(96/100);
  })
  .attr('class', 'rectStyle')

  d3.select('#svg1').append('rect').attr('id','sharedScreen')
  .attr('x', function()
  {
  	return (2/100)*divWidth + divWidth*(20/100) + (2/100)*divWidth;
  })
  .attr('y', function()
  {
  	return (2/100)*divHeight;
  })
  .attr('width', function()
  {
  	return divWidth*(74/100);
  	//return '25%';
  })
  .attr('height', function(){
  	return divHeight*(68/100);
  })
  .attr('class', 'rectStyle')

    d3.select('#svg1').append('rect').attr('id','sharedArea')
  .attr('x', function()
  {
  	return (2/100)*divWidth + divWidth*(20/100) + (2/100)*divWidth;
  })
  .attr('y', function()
  {
  	return (2/100)*divHeight + divHeight*(68/100) + (2/100)*divHeight;
  })
  .attr('width', function()
  {
  	return divWidth*(74/100);
  	//return '25%';
  })
  .attr('height', function(){
  	return divHeight*(26/100);
  })
  .attr('class', 'rectStyle')
  </script>

  <script>
      drawObjects(objectsLocalScreen,'local');
      function drawObjects(list, screen) {
          if (screen == 'local') {
              for (var i = 0; i < list.length; i++) {
                  if (list[i] == 'object1') {
                      drawObject1(i + 1);
                  }
                  else if (list[i] == 'object2') {
                      drawObject2(i + 1);
                  }
                  else if (list[i] == 'object3') {
                      drawObject3(i + 1);
                  }
                  else if (list[i] == 'object4') {
                      drawObject4(i + 1);
                  }
              }
          }
          else if(screen == 'shared')
          {
              for (var i = 0; i < list.length; i++) {
                  if (list[i] == 'object1') {
                      drawObject1Shared(i + 1);
                  }
                  else if (list[i] == 'object2') {
                      drawObject2Shared(i + 1);
                  }
                  else if (list[i] == 'object3') {
                      drawObject3Shared(i + 1);
                  }
                  else if (list[i] == 'object4') {
                      drawObject4Shared(i + 1);
                  }
              }
          }
        }
    
      function drawObject1(i) {
          object1 = d3.select('#svg1').append('rect').attr('id', 'object1')
           .attr('class', 'objects')
          .attr('x', function () {
              return 2 * ((2 / 100) * divWidth);
          })
          .attr('y', function () {
              //return 2 * ((2 / 100) * divHeight);
              return getyPositionLocalScreen(i);
          })
          .attr('width', function () {
              return divWidth * (16 / 100);
              //return '25%';
          })
          .attr('height', function () {
              return divHeight * (8 / 100);
          })
          .attr('fill','black')
          .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));
      }
      function drawObject1Shared(i) {
          object1Shared = d3.select('#svg1').append('rect').attr('id', 'object1Shared')
           .attr('class', 'objects')
          .attr('x', function () {
              return (2 / 100) * divWidth + divWidth * (20 / 100) + (2 / 100) * divWidth;
          })
          .attr('y', function () {
              //return 2 * ((2 / 100) * divHeight);
              return getyPositionSharedScreen(i);
          })
          .attr('width', function () {
              return divWidth * (16 / 100);
              //return '25%';
          })
          .attr('height', function () {
              return divHeight * (8 / 100);
          })
          .attr('fill', 'black')
          .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));
      }
function drawObject2(i)
{
  object2=d3.select('#svg1').append('rect').attr('id','object2')
  .attr('class','objects')
  .attr('x', function()
  {
      return 2*((2/100)*divWidth); 
  })
  .attr('y', function()
  {
      //return 3*((2/100)*divHeight) + (16/100)*divHeight ;
      return getyPositionLocalScreen(i);
  })
  .attr('width', function()
  {
      return divWidth*(16/100);
      //return '25%';
  })
  .attr('height', function(){
      return divHeight*(8/100);
  })
  .attr('fill', 'orange')
  .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));
}
function drawObject2Shared(i) {
    object2Shared = d3.select('#svg1').append('rect').attr('id', 'object2Shared')
    .attr('class', 'objects')
    .attr('x', function () {
        (2 / 100) * divWidth + divWidth * (20 / 100) + (2 / 100) * divWidth;
    })
    .attr('y', function () {
        //return 3*((2/100)*divHeight) + (16/100)*divHeight ;
        return getyPositionSharedScreen(i);
    })
    .attr('width', function () {
        return divWidth * (16 / 100);
        //return '25%';
    })
    .attr('height', function () {
        return divHeight * (8 / 100);
    })
    .attr('fill', 'orange')
    .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));
}

function drawObject3(i) {
          object3 = d3.select('#svg1').append('rect').attr('id', 'object3')
         .attr('class', 'objects')
         .attr('x', function () {
             return 2 * ((2 / 100) * divWidth);
         })
         .attr('y', function () {
             //return 4 * ((2 / 100) * divHeight) + 2 * ((16 / 100) * divHeight);
             return getyPositionLocalScreen(i);
         })
         .attr('width', function () {
             return divWidth * (16 / 100);
         })
         .attr('height', function () {
             return divHeight * (8 / 100);
         })
         .attr('fill', 'blue')
         .call(d3.drag()
               .on("start", dragstarted)
               .on("drag", dragged)
               .on("end", dragended));
}
function drawObject3Shared(i) {
    object3Shared = d3.select('#svg1').append('rect').attr('id', 'object3Shared')
   .attr('class', 'objects')
   .attr('x', function () {
       return (2 / 100) * divWidth + divWidth * (20 / 100) + (2 / 100) * divWidth;
   })
   .attr('y', function () {
       //return 4 * ((2 / 100) * divHeight) + 2 * ((16 / 100) * divHeight);
       return getyPositionSharedScreen(i);
   })
   .attr('width', function () {
       return divWidth * (16 / 100);
   })
   .attr('height', function () {
       return divHeight * (8 / 100);
   })
   .attr('fill', 'blue')
   .call(d3.drag()
         .on("start", dragstarted)
         .on("drag", dragged)
         .on("end", dragended));
}
function drawObject4()
{

    object4 = d3.select('#svg1').append('rect').attr('id', 'object4')
   .attr('class', 'objects')
   .attr('x', function () {
       return 2 * ((2 / 100) * divWidth);
   })
   .attr('y', function () {
       //return 4 * ((2 / 100) * divHeight) + 2 * ((16 / 100) * divHeight);
       return getyPositionLocalScreen(i);
   })
   .attr('width', function () {
       return divWidth * (16 / 100);
   })
   .attr('height', function () {
       return divHeight * (8 / 100);
   })
   .attr('fill', 'red')
   .call(d3.drag()
         .on("start", dragstarted)
         .on("drag", dragged)
         .on("end", dragended));

}
function drawObject4Shared() {

    object4Shared = d3.select('#svg1').append('rect').attr('id', 'object4Shared')
   .attr('class', 'objects')
   .attr('x', function () {
       return (2 / 100) * divWidth + divWidth * (20 / 100) + (2 / 100) * divWidth;
   })
   .attr('y', function () {
       //return 4 * ((2 / 100) * divHeight) + 2 * ((16 / 100) * divHeight);
       return getyPositionSharedScreen(i);
   })
   .attr('width', function () {
       return divWidth * (16 / 100);
   })
   .attr('height', function () {
       return divHeight * (8 / 100);
   })
   .attr('fill', 'red')
   .call(d3.drag()
         .on("start", dragstarted)
         .on("drag", dragged)
         .on("end", dragended));

}

function getyPositionLocalScreen(i)
{
    if(i==1)
    {
        return 2 * ((2 / 100) * divHeight);
    }
    else if(i==2)
    {
        return 3 * ((2 / 100) * divHeight) + (16 / 100) * divHeight;
    }
    else if(i==3)
    {
        return 4 * ((2 / 100) * divHeight) + 2 * ((16 / 100) * divHeight);
    }
    else if(1==4)
    {
        return 5 * ((2 / 100) * divHeight) + 3 * ((16 / 100) * divHeight);
    }

}

function getyPositionSharedScreen(i) {
    if (i == 1) {
        return 2 * ((2 / 100) * divHeight);
    }
    else if (i == 2) {
        return 3 * ((2 / 100) * divHeight) + (16 / 100) * divHeight;
    }
    else if (i == 3) {
        return 4 * ((2 / 100) * divHeight) + 2 * ((16 / 100) * divHeight);
    }
    else if (1 == 4) {
        return 5 * ((2 / 100) * divHeight) + 3 * ((16 / 100) * divHeight);
    }

}
  
  function dragstarted(d) {
  d3.select(this).raise().classed("active", true);
  
  var x=d3.event.x;
  var y=d3.event.y;
  draggedOn='';

  draggedFrom=draggedFromOrOnArea(x,y);
  console.log('draggedFrom is :' + draggedFrom );

  }

function draggedFromOrOnArea(x,y)
{
	if (
	   	x >= (2/100)*divWidth + divWidth*(20/100) + (2/100)*divWidth
		&& 
		x<= (2/100)*divWidth + divWidth*(20/100) + (2/100)*divWidth + divWidth*(74/100) 
		&& 
		y>= (2/100)*divHeight 
		&& 
		y<= (2/100)*divHeight + (68/100)*divHeight
	  )	
	  {
		return 'sharedScreen';
	  }

	  else if (
	   	x >= (2/100)*divWidth + divWidth*(20/100) + (2/100)*divWidth
		&& 
		x<= (2/100)*divWidth + divWidth*(20/100) + (2/100)*divWidth + divWidth*(74/100) 
		&& 
		y>= (2/100)*divHeight + divHeight*(68/100) + (2/100)*divHeight 
		&& 
		y<= (2/100)*divHeight + divHeight*(68/100) + (2/100)*divHeight + divHeight*(26/100)
	  )	
	  {
		return 'sharedArea';
	  }

	  else if (
	   	x >= (2/100)*divWidth 
		&& 
		x<= (2/100)*divWidth + divWidth*(20/100)  
		&& 
		y>= (2/100)*divHeight
		&& 
		y<= (2/100)*divHeight + divHeight*(96/100) 	  
	  )	
	  {
		return 'localArea';
	  }
	  else
	  {
	  	return '';
	  }

}

function dragged(d) {
  	d3.select(this).attr("x",  d3.event.x).attr("y", d3.event.y);
}

function dragended(d) {
  	
  	d3.select(this).classed("active", false);

  	var x=d3.event.x;
	var y=d3.event.y;
	draggedOn=draggedFromOrOnArea(x,y);
	console.log('draggedOn is :' + draggedOn );
	if(draggedOn=='')
	{ 
		console.log('draggedOn is :' + draggedOn );
	}
	if(draggedOn=='sharedScreen')
	{
	    var obj = d3.select(this).attr('id');
	    if(!objectsSharedScreen.includes(obj))
	    {
	        for (var i = 0; i < objectsSharedScreen.length;i++)
	        {
	            var id ='#'+ objectsSharedScreen[i]
	            d3.select(id).remove();
	        }
	        objectsSharedScreen.push(obj);
	    }
	    drawObjects(objectsSharedScreen,'shared');

	}
	else if(draggedOn=='sharedArea')
	{

	}
	else if(draggedOn='localArea')
	{

	}

}

/*d3.selectAll('.objects').each(function(d,i) 
{ 
	d3.select(this);
	console.log('i is:' + i);
});*/


</script>
 </body>
 </html>
