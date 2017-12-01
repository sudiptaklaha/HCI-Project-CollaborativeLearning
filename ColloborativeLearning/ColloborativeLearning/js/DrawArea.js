
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

d3.select('#svg1').append('rect').attr('id', 'sharedArea')
.attr('x', function () {
    return (2 / 100) * divWidth + divWidth * (20 / 100) + (2 / 100) * divWidth;
})
.attr('y', function () {
    return (2 / 100) * divHeight + divHeight * (68 / 100) + (2 / 100) * divHeight;
})
.attr('width', function () {
    return divWidth * (74 / 100);
    //return '25%';
})
.attr('height', function () {
    return divHeight * (26 / 100);
})
.attr('class', 'rectStyle');
