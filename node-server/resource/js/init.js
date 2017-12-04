var dropCount = 0;
var sharedObjCount = 0;
var rightClickedItem = 0;

var detailsObj = -1;
var rightClickedElem;
var sharedState = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0};


function allowDrop(ev) {
  ev.preventDefault();
}
function drag(ev) {
  console.log(ev.target.innerHTML);
  ev.dataTransfer.setData('text/html', ev.target.innerHTML);
  //$('.ls-row>.col').addClass("z-depth-1");
}
function drop(ev) {

  //console.log('dropped');
  
  ev.preventDefault();
  var data = ev.dataTransfer.getData('text/html');
  //ev.target.appendChild(data);
  $(ev.target).append(data);
  
  $(ev.target).children(":first").addClass('dropped');
  var index = $(ev.target).children(":first").attr('index');//cursor: pointer;
  $(ev.target).children(":first").css('cursor','pointer');
  $(ev.target).children(":first").contextmenu(function(e) {
    rightClickedElem = this;
    rightClickedItem = $(this).attr('index');
    console.log($(this), e.pageX,e.pageY);
    $('#dropdown2').addClass('active');
    $('#dropdown2').css({
      'display': 'block',
      'top':e.pageY-10,
      'left':e.pageX-10
    });
    return false;
  });
  $(ev.target).children(":first").on('click', function() {
    showDetails(index);
  });

  /*if(++dropCount<=3) {
    $('#shown-item-list-row').append('<div class="col s4"><div class="row v-list-item">'+data+'</div></div>');
  }*/

  //$('.ls-row>.col').removeClass("z-depth-1");
  $('.ls-row>.col').removeClass("teal lighten-5 pulse");
  sharedObjCount++;
  sharedState[$(ev.target).attr('index')] = 1;
  postToServer($(data).attr('index'), $(ev.target).attr('index'));
}

function postToServer(pickIndex, dropIndex) {
  $.ajax({url: '/drag/?'+pickIndex+','+dropIndex, success: function(result){
    console.log("posted data", dropIndex);
  }});
}

$('document').ready( function () {
  
  $('.ls-row>.col').on('dragover',function() {
    $( this ).addClass("teal lighten-5 pulse");
    $('.ls-row>.col').addClass("z-depth-1");
  });
  $('.ls-row>.col').on('dragleave',function() {
    $( this ).removeClass("teal lighten-5 pulse");    
  });
  $('.list-item').on('dragend', function() {
    $('.ls-row>.col').removeClass("z-depth-1");
  });

  $('.list-item').contextmenu(function(e) {
    rightClickedElem = this;
    rightClickedItem = $(this).children(":first").attr('index');
    console.log($(this), e.pageX,e.pageY);
    $('#dropdown').addClass('active');
    $('#dropdown').css({
      'display': 'block',
      'top':e.pageY-10,
      'left':e.pageX-10
    });
    return false;
  });

  function closeMenu() {
    $('#dropdown').removeClass('active');
    $('#dropdown').css('display','none');
  };

  $('#dropdown').mouseleave(function() {
    closeMenu();
  });

  /**
   * menu items click
   * item1:delete item
   * item2:show in 3D
   * item3:add to shared screen
   */
  $('#menuitem1').click(function() {
    $(rightClickedElem).remove();
    closeMenu();
  });
  $('#menuitem2').click(function() {
    $.ajax({url: '/change3D?'+rightClickedItem, success: function(result){
      console.log("changed 3D to", rightClickedItem);
      }
    });
    closeMenu();
    Materialize.toast('Placed objet to hologram.', 1000, 'rounded');
  });
  $('#menuitem3').click(function() {
    var empty = -1;
    for (var key in sharedState) {
        if (sharedState.hasOwnProperty(key) && sharedState[key]==0) {
          empty = key;
          break;
        }
    }
    $.ajax({url: '/resource/html/item'+rightClickedItem+'.html', success: function(result){
      if(empty>=0) {
        $('#drop'+empty).append(result);
        sharedObjCount++;
        sharedState[empty] = 1;
        postToServer(rightClickedItem, empty);
      }
    }});
    closeMenu();
  });

  /**
   * shared screen right click menu
   */
  function closeMenu2() {
    $('#dropdown2').removeClass('active');
    $('#dropdown2').css('display','none');
  };

  $('#dropdown2').mouseleave(function() {
    closeMenu2();
  });

  $('#2menuitem1').click(function() {
    $(rightClickedElem).remove();
    closeMenu2();
  });
  $('#2menuitem2').click(function() {
    $('#local-list-container').append(rightClickedElem);
    //$(rightClickedElem).remove();
    closeMenu2();
  });

  /*$('#back').click(function(){
    console.log('clicked');
    $.ajax({url: '/resource/html/ls-grid.html', success: function(result){
      $('#large-screen').html(result);
    }});
  });*/
   $('#menuitem4').click(function() {
    closeMenu();

    var abc="/resource/html/item" + rightClickedItem+ "detailslocal.html";
    console.log(abc);
    window.location.pathname = abc;
   
  });

  setInterval(function() {
    //console.log(sharedState);
    $.ajax({url: '/refresh?'+sharedObjCount, success: function(result){      
      result.forEach(function(element) {
        console.log("appending item:", element.item , " :: to position:", element.pos);

        if(element.pos==-1) {
          if(detailsObj!=element.item) {
            console.log("putting shared object");
            $.ajax({url: '/resource/html/item'+element.item+'details.html', success: function(result){
              $('#large-screen').html(result);
            }});
            detailsObj=element.item;
          }
          sharedObjCount = 0;
        } else {
          console.log("putting element");
          if(detailsObj>=0) {
            detailsObj = -1;
            $.ajax({url: '/resource/html/ls-grid.html', success: function(result){
              $('#large-screen').html(result);
            }});
          }
          $.ajax({url: '/resource/html/item'+element.item+'.html', success: function(result){
            $('#drop'+element.pos).append(result);
            sharedObjCount++;
            sharedState[element.pos] = 1;
            
          }});
        }
        $.ajax({url: '/resource/html/item'+element.item+'.html', success: function(result){
          $('#drop'+element.pos).append(result);
          /*if(++dropCount<=3) {
            $('#shown-item-list-row').append('<div class="col s4"><div class="row v-list-item">'+result+'</div></div>');
          }*/
          sharedObjCount++;
        }});

      });
    }});
  }, 2000);
});