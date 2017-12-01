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
    else if (screen == 'shared') {
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
function drawObject2(i) {
    object2 = d3.select('#svg1').append('rect').attr('id', 'object2')
    .attr('class', 'objects')
    .attr('x', function () {
        return 2 * ((2 / 100) * divWidth);
    })
    .attr('y', function () {
        //return 3*((2/100)*divHeight) + (16/100)*divHeight ;
        return getyPositionLocalScreen(i);
    })
    .attr('width', function () {
        return divWidth * (16 / 100);
        //return '25%';
    })
    .attr('height', function () {
        return divHeight * (8 / 100);
    })
    .attr('fill', 'orange')
    .on('click', function () {
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

/*function drawObject4(i) {

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

}*/
function drawObject4(i) {
    /*object4 = d3.select('#svg1').append('foreignObject').attr('id', 'object4')
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
    })*/

    object4 = d3.select('#svg1').append("svg:image").attr('id', 'object4')
                .attr('class', 'objects')
                .attr("xlink:href", "https://lorempixel.com/900/900/")
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
       return divHeight * (16 / 100);
   })
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
   .on("contextmenu", function (event) { })
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

}