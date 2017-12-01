<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ui1.aspx.cs" Inherits="ColloborativeLearning.ui1" %>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0"/>
  <title>Collaborative Learning</title>
  <!-- CSS  -->
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <link href="css/materialize.css" type="text/css" rel="stylesheet" media="screen,projection"/>
  <link href="css/style.css" type="text/css" rel="stylesheet" media="screen,projection"/>
  <script src="https://d3js.org/d3.v4.js"></script>
  <link rel="stylesheet" href="/css/d3-context-menu.css" />
  <script src="/js/d3-context-menu.js"></script>
  <script src="three.min.js"></script>
  <script src="OrbitControl.js"></script>
  

  <link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.6.0/pure-min.css">
</head>
<body>
<nav class="teal lighten-2" id="nav">
    <div class="container"><a id="logo-container" href="#" class="brand-logo">GROUP<i class="material-icons large right" style="font-size: 1.6em; margin-left:0">looks_6</i></a>
      <ul class="right hide-on-med-and-down">
        <li><a href="#"><i class="material-icons large" style="font-size: 3em; margin-left:0">power_settings_new</i></a></li>
      </ul>
    </div>
  </nav>

    <%--<div class="pure-menu pure-menu-horizontal" style="background-color:black;" id="nav">
        <a href="#" class="pure-menu-heading pure-menu-link">CS-424</a>
        <ul class="pure-menu-list">
            <li class="pure-menu-item"></li>
            <li class="pure-menu-item"><a href="Default1.html" class="pure-menu-link">Home</a></li>
            <li class="pure-menu-item"><a href="HTML/RadialTree.html" class="pure-menu-link">Compare Wait Times</a></li>
            <li class="pure-menu-item"><a href="About.html" class="pure-menu-link">About</a></li>
            <li class="pure-menu-item"><a href="Contact.html" class="pure-menu-link">Contact Us</a></li>
        </ul>
    </div>--%>

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
      var menu = [
          {
              title: 'Remove From Shared Screen',
              action: function (elm, d, i) {
                  console.log('Item #1 clicked!');
                  console.log('The data for this circle is: ' + d);
                  console.log('element is' + elm.id);
                  hello();
              }
          },
          {
              title: 'Add To Shared Screen',
              action: function (elm, d, i) {
                  console.log('You have clicked the second item!');
                  console.log('The data for this circle is: ' + d);
                  console.log('element is' + elm.id);
                
              }
          }
      ]

      var data = [1, 2, 3];


  var numSharedScreen=0;
  var numLocalScreen=3;
  var objectsLocalScreen=['object1','object4' ];
  var objectsSharedScreen = ['object2', 'object3'];
  
  

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
  var object1SArea;
  var object2SArea;
  var object3SArea;
  var object4SArea;

  var data = ["Option 1", "Option 2", "Option 3"];

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
  <script src="split.js"></script>
  <script>
      $(document).ready(function () {

          drawObjects(objectsLocalScreen, 'local');
          drawObjects(objectsSharedScreen, 'shared');

            var hdnField = document.getElementById("<%= hdn.ClientID %>");
            console.log(hdnField);
            hdnField.value = JSON.stringify(objectsSharedScreen);

            init();
            animate();
      })


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
                          drawObject1SArea(i + 1);
                      }
                      else if (list[i] == 'object2') {
                          drawObject2Shared(i + 1);
                          drawObject2SArea(i + 1);
                      }
                      else if (list[i] == 'object3') {
                          drawObject3Shared(i + 1);
                          drawObject3SArea(i + 1);
                      }
                      else if (list[i] == 'object4') {
                          drawObject4Shared(i + 1);
                          drawObject4SArea(i + 1);
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
              .attr('fill', 'black')
              .on('contextmenu', d3.contextMenu(menu))
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
          function drawObject1SArea(i) {
              object1Area = d3.select('#svg1').append('rect').attr('id', 'object1SArea')
               .attr('class', 'objects')
              .attr('x', function () {
                  return getXOfSharedArea(i);
              })
              .attr('y', function () {
                  //return 2 * ((2 / 100) * divHeight);
                  return (2 / 100) * divHeight + divHeight * (68 / 100) + (2 / 100) * divHeight + (2 / 100) * divHeight;
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
              .on('click', function ()
              {
                  d3.append('#svg1').append('foreignObject').attr('')
              }
              )
              .call(d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended));
          }
          function drawObject2Shared(i) {
              object2Shared = d3.select('#svg1').append('rect').attr('id', 'object2Shared')
              .attr('class', 'objects')
              .attr('x', function () {
                  return (2 / 100) * divWidth + divWidth * (20 / 100) + (2 / 100) * divWidth;
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
          function drawObject2SArea(i) {
              object2SArea = d3.select('#svg1').append('rect').attr('id', 'object2SArea')
              .attr('class', 'objects')
              .attr('x', function () {
                  return getXOfSharedArea(i);
              })
              .attr('y', function () {
                  //return 3*((2/100)*divHeight) + (16/100)*divHeight ;
                  return (2 / 100) * divHeight + divHeight * (68 / 100) + (2 / 100) * divHeight + (2 / 100) * divHeight;
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
          function drawObject3SArea(i) {
              object3SArea = d3.select('#svg1').append('rect').attr('id', 'object3SArea')
             .attr('class', 'objects')
             .attr('x', function () {
                 return getXOfSharedArea(i);
             })
             .attr('y', function () {
                 //return 4 * ((2 / 100) * divHeight) + 2 * ((16 / 100) * divHeight);
                 return (2 / 100) * divHeight + divHeight * (68 / 100) + (2 / 100) * divHeight + (2 / 100) * divHeight;
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
          function drawObject4(i)
          {
              object4 = d3.select('#svg1').append('foreignObject').attr('id', 'object4')
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
           }).call(d3.drag()
                   .on("start", dragstarted)
                   .on("drag", dragged)
                   .on("end", dragended));

           object4.append("xhtml:div").attr('id', 'div1')
           .attr('width', function () {
                  return divWidth * (16 / 100);
           })
           .attr('height', function () {
               return divHeight * (8 / 100);
           })


          }
          /*function drawObject4(i)
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
          function drawObject4Shared(i) {

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
             .on("contextmenu", function(event){})
             .call(d3.drag()
                   .on("start", dragstarted)
                   .on("drag", dragged)
                   .on("end", dragended))


          }
          function drawObject4SArea(i) {

              object4SArea = d3.select('#svg1').append('rect').attr('id', 'object4SArea')
             .attr('class', 'objects')
             .attr('x', function () {
                 return getXOfSharedArea(i);
             })
             .attr('y', function () {
                 //return 4 * ((2 / 100) * divHeight) + 2 * ((16 / 100) * divHeight);
                 return (2 / 100) * divHeight + divHeight * (68 / 100) + (2 / 100) * divHeight + (2 / 100) * divHeight;
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

          }*/

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
          function getXOfSharedArea(i)
          {
              if (i == 1) {
                  return 3 * ((2 / 100) * divWidth) + (divWidth * (20 / 100)) ;
              }
              else if (i == 2) {
                  return  4 * ((2 / 100) * divWidth) + (divWidth * (20 / 100)) + divWidth * (15 / 100) ;
              }
              else if (i == 3) {
                  return  5 * ((2 / 100) * divWidth) + divWidth * (20 / 100) + 2 * (divWidth * (15 / 100)) ;
              }
              else if (1 == 4) {
                  return  6 * ((2 / 100) * divWidth) + (divWidth * (20 / 100)) + 3 * (divWidth * (15 / 100)) ;
              }
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

          var counter;
          function dragstarted(d) {
              d3.select(this).raise().classed("active", true);

              var x = d3.event.x;
              var y = d3.event.y;
              draggedOn = '';

              draggedFrom = draggedFromOrOnArea(x, y);
              console.log('draggedFrom is :' + draggedFrom);
              counter = 0;

          }

          function dragged(d) {
              counter++;
              if (counter > 5) {
                  d3.select(this).attr("x",  d3.event.x).attr("y", d3.event.y);
              }
          }

          function dragended(d) {
              counter = 0;
              d3.select(this).classed("active", false);
              var x=d3.event.x;
              var y=d3.event.y;
              draggedOn = draggedFromOrOnArea(x, y);
              console.log('draggedOn is :' + draggedOn );

              if (draggedOn == '')
              { 
                  console.log('draggedOn is :' + draggedOn );
              }
              if(draggedOn=='sharedScreen' || draggedOn== 'sharedArea')
              {
                  console.log('inside Shared Screen');
                  var obj = d3.select(this).attr('id');
                  var res = obj.substring(0, 7);
                  if(!objectsSharedScreen.includes(res))
                  {
                      objectsSharedScreen.push(res);
                  }

                  var clickButton = document.getElementById("<%= btn.ClientID %>");
                  console.log(clickButton);
                  clickButton.click();
              }
              /*else if(draggedOn=='sharedArea')
              {
          
              }*/
              if(draggedOn=='localArea')
              {
                  console.log('draggedOn is :' + draggedOn);
                  var obj = d3.select(this).attr('id');
                  var res = obj.substring(0, 7);

                  if (!objectsLocalScreen.includes(res)) {
                      objectsLocalScreen.push(res);
                  }

              }

              console.log('objects local Screen ' + objectsLocalScreen);
              console.log('objects Shared Screen ' + objectsSharedScreen);
              d3.select(this).remove();
              for (var i = 0; i < objectsSharedScreen.length; i++) {
                  var id = '#' + objectsSharedScreen[i] + 'Shared';
                  var id1 = '#' + objectsSharedScreen[i] + 'SArea';
                  d3.select(id).remove();
                  d3.select(id1).remove();
              }
              for (var i = 0; i < objectsLocalScreen.length; i++) {
                  var id = '#' + objectsLocalScreen[i]
                  d3.select(id).remove();
              }
              drawObjects(objectsSharedScreen, 'shared');
              drawObjects(objectsLocalScreen, 'local');
	

          }

          /*d3.selectAll('.objects').each(function(d,i) 
          { 
              d3.select(this);
              console.log('i is:' + i);
          });*/


</script>

<form runat="server">
<asp:Button ID="btn" runat="server" text='hidden button'   onClick="toServer"  />
<input id="hdn" type="hidden" runat="server" />  
</form>
<canvas id="canvas1"></canvas>
</body>
</html>
