var width = window.innerWidth;
    var height = window.innerHeight;

    var svg = d3.select("body").select("svg").append("svg").attr('id', 'svgele')
    .attr("height", height)
    .attr("width", width)
    .append('g')
    //.attr('transform', 'translate(' + width + ',' + height + ')');


    var palmCursor=svg.append('circle')
    .attr('id', "palmCursor")
    .attr('cx', 10)
    .attr('cy', 10)
    .attr('r', 20)
    .attr('fill', 'black');

    var indexCursor = svg.append('circle')
    .attr('id', "indexCursor")
    .attr('cx', 100)
    .attr('cy', 100)
    .attr('r', 10)  
    .attr('fill', 'red');

    function concatData(id, data) {
        return id + ": " + data + "";  
    }
    var text = "";

    svg.append("text")
    .attr('id', "text1")
    .attr('x',110)
    .attr('y', 800)
    //.attr('fill','red')
    .attr('text-anchor', 'left')
    .text('');

    svg.append("text")
    .attr('id', "text2")
    .attr('x', 110)
    .attr('y', 830)
    .attr('text-anchor', 'left')
    .text('');

    var element = svg.append('rect')
    .attr('id', "rectObject")
    .attr('x', 300)
    .attr('y', 300)
    .attr("width", 100)
    .attr("height", 100)
    .attr('fill', 'blue');

    var nameMap = ["thumb", "index", "middle", "ring", "pinky"];
    
    var rightHand;
    var availableHand;
    var isMovingEnabled = 0;
    var indexPosition;
    var normalizedIndexPosition;
    var elementToMove;
    var fistStrength;

    var options = { enableGestures: true };


    var controller = Leap.loop(options, function (frame) {
        
        var interactionBox = frame.interactionBox;
        //console.log('Interaction Box is:' + interactionBox);
        //var normalizedPosition = interactionBox.normalizePoint(pointable.tipPosition, true);

        //text = concatData('frame_id', frame.id);
        //text += concatData('numHands', frame.hands.length);
        //text += concatData('num fingers', frame.fingers.length);
        //text += '<br/>';
        //.attr('fill', 'red')
        d3.select('#text1')
        .text(concatData('Frame Id:', frame.id));

        d3.select("#text2")
        .text(concatData('Number of Hands', frame.hands.length));

        for (var i = 0, len = frame.hands.length; i < len; i++) {
            rightHand = frame.hands[i].type;
            availableHand = frame.hands[i];
            if (rightHand == 'right') {
                //var screenPosition = frame.hands[i].screenPosition(frame.hands[i].palmPosition);
                var palmPosition = frame.hands[i].palmPosition;
                var normalizedPosition = interactionBox.normalizePoint(palmPosition, true);
                //console.log('Screen Position is:' + normalizedPosition);
                palmCursor.attr('cx', width*normalizedPosition[0])
                palmCursor.attr('cy', height * (1 - normalizedPosition[1]));

                frame.hands[i].fingers.forEach(function (finger) {
                    var fingerName = nameMap[finger.type];
                    if(fingerName=='index')
                    {
                        
                        indexPosition = finger.pipPosition;
                        normalizedIndexPosition = interactionBox.normalizePoint(indexPosition, true);

                        indexCursor.
                        attr('cx', width * normalizedIndexPosition[0])
                        .attr('cy', height * (1 - normalizedIndexPosition[1]));
                        
                        if(isMovingEnabled == 1)
                        {
                            
                            var id = elementToMove.id;
                            id = '#' + id;
                            console.log('id is: ' + id);
                            d3.select(id).attr('x', width * normalizedIndexPosition[0])
                            .attr('y', height * (1 - normalizedIndexPosition[1]));
                        }
                        
                    }
                });
                checkFist(frame.hands[i]);              
            }
        }
        if (frame.valid && frame.gestures.length > 0) {
            frame.gestures.forEach(function (gesture) {
                switch (gesture.type) {
                    case "circle":
                        console.log("Circle Gesture");
                        break;
                    case "keyTap":
                        // console.log("Key Tap Gesture");
                        // console.log('is Moving Enabled' + isMovingEnabled);
                        // if (isMovingEnabled==0)
                        // {

                        //     elementToMove = document.elementFromPoint(width * normalizedIndexPosition[0], height * (1 - normalizedIndexPosition[1]));
                        //     isMovingEnabled = 1;
                        // }
                        // else if (isMovingEnabled==1)
                        // {
                        //     isMovingEnabled = 0;
                        // }
                        // console.log('Is Moving Enabled' + isMovingEnabled);
                        break;
                    case "screenTap":
                        console.log("Screen Tap Gesture");
                        break;
                    case "swipe":
                        console.log(gesture.id);

                        //Classify swipe as either horizontal or vertical
                        var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
                        //Classify as right-left or up-down
                        if(isHorizontal){
                            if(gesture.direction[0] > 0){
                                swipeDirection = "right";
                                console.log("Swipe right");
                            } else {
                                swipeDirection = "left";
                                console.log("Swipe left");
                            }
                        } else { //vertical
                            if(gesture.direction[1] > 0){
                                swipeDirection = "up";
                                console.log("Swipe up");
                            } else {
                                swipeDirection = "down";
                                console.log("Swipe down");
                            }                  
                        }

                        //Use for detecting fist pose
                        fistStrength = availableHand.GrabStrength;

                        //threejs_index.js
                        rotate(swipeDirection) //gesture.speed);

                        //d3.select("#text3")
                        //.text(concatData('Swipe speed', gesture.speed));
                        break;
                }
            });
        }
        
    });

    function checkFist(hand){
       var sum = 0;
       for(var i=0;i<hand.fingers.length;i++){
          var finger = hand.fingers[i];
          var meta = finger.bones[0].direction();
          var proxi = finger.bones[1].direction();
          var inter = finger.bones[2].direction();
          var dMetaProxi = Leap.vec3.dot(meta,proxi);
          var dProxiInter = Leap.vec3.dot(proxi,inter);
          sum += dMetaProxi;
          sum += dProxiInter
       }
       sum = sum/10;

       if(sum<=0.5 && getExtendedFingers(hand)==0){
           console.log("stop");
           rotate("stop");
       }else{
           return false;
       }
    }
    function getExtendedFingers(hand){
       var f = 0;
       for(var i=0;i<hand.fingers.length;i++){
          if(hand.fingers[i].extended){
             f++;
          }
       }
       return f;
    }