var dropCount = 0;
var sharedObjCount = 0;
var rightClickedItem = 0;

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
  if(++dropCount<=3) {
    $('#shown-item-list-row').append('<div class="col s4"><div class="row v-list-item">'+data+'</div></div>');
  }
  //$('.ls-row>.col').removeClass("z-depth-1");
  $('.ls-row>.col').removeClass("teal lighten-5 pulse");
  sharedObjCount++;
  postToServer(data, ev);
}

function postToServer(data, ev) {
  var pickIndex = $(data).attr('index');
  var dropIndex = $(ev.target).attr('index');

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
  $('#menuitem2').click(function() {
    $.ajax({url: '/change3D?'+rightClickedItem, success: function(result){
      console.log("changed 3D to", rightClickedItem);
      }
    });
    closeMenu();
  });

  setInterval(function() {
    $.ajax({url: '/refresh?'+sharedObjCount, success: function(result){      
      result.forEach(function(element) {
        console.log("appending item:", element.item , " :: to position:", element.pos);
        $.ajax({url: '/resource/html/item'+element.item+'.html', success: function(result){
          $('#drop'+element.pos).append(result);
          /*if(++dropCount<=3) {
            $('#shown-item-list-row').append('<div class="col s4"><div class="row v-list-item">'+result+'</div></div>');
          }*/
          sharedObjCount++;
        }});
      });
    }});
  }, 1000);
});