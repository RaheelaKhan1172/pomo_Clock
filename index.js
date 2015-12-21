var timer = {
  breakTime:5,
  sessTime:1,
  seconds:10,
  minutes:0,
  hours:0,  
  count:1,
  isBreak:false,
  isSess:true
}


timer.sessPlus = function() {
 //increments time and updates view
  timer.sessTime++;
  timer.seconds = 59;
  $(".sessNum").text(timer.sessTime);
  if (timer.isSess) {
   $("#display").text(timer.sessTime);
  }
}

timer.sessMinus = function() {
  //takes care of decrementing time and updating view
  timer.sessTime <= 0 ? timer.sessTime : timer.sessTime--;
  timer.seconds = 59;
  $(".sessNum").text(timer.sessTime);

  if (timer.isSess) {
    $("#display").text(timer.sessTime);
  }
}

timer.breakPlus = function() {
  //increments break time
  timer.breakTime++;
  timer.seconds = 59;
  $(".breakNum").text(timer.breakTime);
  if (timer.isBreak) {
   $("#display").text(timer.breakTime);
  }
}

timer.breakMinus = function() {
  timer.breakTime <=0 ? timer.breakTime : timer.breakTime--;
  timer.seconds = 59;
  $(".breakNum").text(timer.breakTime);
  if (timer.isBreak) {
    $("#display").text(timer.breakTime);
  }
}
timer.handleSessPlus = function() {
  if (timer.count % 2 !== 0 ) {
    timer.sessPlus();
  }
}
timer.handleSessMinus = function() {
  if (timer.count % 2 !== 0) {
    timer.sessMinus();
  }
}

timer.handleBreakMinus = function() {
  if (timer.count % 2 !== 0) {
    timer.breakMinus();
  }
}
timer.handleBreakPlus = function() {
  if (timer.count % 2 !==0) {
    timer.breakPlus();
  }
}
// will occur on click
timer.fixSessTime = function() {
  timer.hours = Math.floor(timer.sessTime/3600) % 24;
  timer.minutes = timer.sessTime > 60? (timer.sessTime/60)%60 : timer.sessTime;
  timer.minutes = timer.minutes - 1; 
  timer.displayTime(timer.hours,timer.minutes,timer.seconds)
  timer.decTime(timer.hours,timer.minutes,timer.seconds);
}

timer.fixBreakTime = function() {
  hours = Math.floor(timer.breakTime/3600) & 24;
  timer.minutes = timer.breakTime > 60 ? (timer.breakTime/60)%60 : timer.breakTime;
  
  timer.displayTime(timer.hours,timer.minutes,timer.seconds);
  timer.decTime(timer.hours,timer.minutes,timer.seconds);
}

timer.decTime = function(h,m,seconds) {
  timer.intControl = setInterval(function(h,m,seconds) {
    if (timer.seconds !== 0) {
    timer.seconds--;
    timer.displayTime(timer.hours,timer.minutes,timer.seconds);
    } else if(timer.seconds === 0 && timer.minutes === 0) {
        timer.reset();
    }  else if (timer.seconds === 0) {
      timer.minutes = timer.minutes-1;
      timer.seconds = 59;
      timer.displayTime(timer.hours,timer.minutes,timer.seconds);
   }
   },1000);
}
  
timer.displayTime = function(hours,minutes,seconds) {
   var display = "";
   if (hours <= 0) {
    if (timer.minutes < 10) {
      display = timer.seconds < 10? "0"+timer.minutes+":"+"0"+timer.seconds : "0"+timer.minutes+":"+timer.seconds;
    } else {
      display = timer.seconds < 10 ? timer.minutes +":"+ "0" + timer.seconds : timer.minutes + ":" + timer.seconds;
    } 
   } else {
    if (hours < 10 && timer.minutes < 10) {
      display = "0"+hours+":"+"0"+timer.minutes+":"+timer.seconds;
    } else if( hours < 10 || timer.minutes < 10) {
      display = "0"+hours+":"+timer.minutes+":"+timer.seconds || hours+":"+"0"+timer.minutes+":"+timer.seconds;
    } else {
      display = hours+":"+timer.minutes+":"+timer.seconds;
    }
  }
  $("#display").text(display);
}
timer.handleClock = function() {
  timer.count++;
  console.log(timer.count);
  if (timer.isSess) {
    console.log(timer.count,timer.minutes,timer.seconds);
    if (timer.count % 2 === 0) {
    console.log(timer.count,timer.minutes,timer.seconds);
    timer.fixSessTime();
    } else {
    clearInterval(timer.intControl);
    }
  } 
   if (timer.isBreak) {
     if (timer.count % 2 === 0) {
    timer.fixBreakTime();
     } else {
    clearInterval(timer.intControl);
  }
  }
}

timer.reset = function() {
  clearInterval(timer.intControl);
  var sound = $('.sound');
  sound[0].play();
  timer.count = 1;
  timer.isSess = (timer.isSess === true) ? false : true;
  timer.isBreak = (timer.isBreak === true) ? false: true;
  if (timer.isBreak) {
    $(".circle").addClass("circle-break");
  }
  setTimeout(function() {
    sound[0].pause();
    timer.handleClock();
  },3000);
 

}
$(document).ready(function() {
  $(".breakNum").text(timer.breakTime);
  $(".sessNum").text(timer.sessTime);
  $("#display").text(timer.sessTime);
  $("#sessPlus").click(timer.handleSessPlus);
  $("#sessMinus").click(timer.handleSessMinus);
  $("#breakPlus").click(timer.handleBreakPlus);
  $("#breakMinus").click(timer.handleBreakMinus);
  $("#display").click(timer.handleClock);
});
