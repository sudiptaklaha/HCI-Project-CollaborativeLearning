var dropCount = 0;
function allowDrop(ev) {
  ev.preventDefault();
}
function drag(ev) {
  console.log(ev.target.innerHTML);
  ev.dataTransfer.setData('text/html', ev.target.innerHTML);
  //$('.ls-row>.col').addClass("z-depth-1");
}
function drop(ev) {
  
  ev.preventDefault();
  var data = ev.dataTransfer.getData('text/html');
  //ev.target.appendChild(data);
  $(ev.target).append(data);
  if(++dropCount<=3) {
    $('#shown-item-list-row').append('<div class="col s4"><div class="row v-list-item">'+data+'</div></div>');
  }
  //$('.ls-row>.col').removeClass("z-depth-1");
  $('.ls-row>.col').removeClass("teal lighten-5 pulse");
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
});