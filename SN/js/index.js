;(function () {
  var ul = document.querySelector(".banner_ul");
  var lis = ul.children;
  var ol = document.querySelector(".sn_banner ol");
  var ols = ol.children;
  var width = lis[0].offsetWidth;
  // console.log(width);
  var index = 1;
  var timer = setInterval(function () {
    index++;
    addTransition();
    addTransform(-width * index);
    // console.log(index);
  }, 1000);
//添加过渡结束结束的事件
  ul.addEventListener("transitionend", function () {
    if (index >= lis.length - 1) {
      index = 1;
      moveTransition();
      addTransform(-width * index);
    }
    if (index <= 0) {
      index = lis.length - 2;
      moveTransition();
      addTransform(-width * index);
    }
    //小圆点
    for (var i = 0; i < ols.length; i++) {
      ols[i].classList.remove("circle");
    }
    // console.log(ols);
    ols[index - 1].classList.add("circle");
  })
  //添加滑动事件
  var statrX = 0;
  var startTime = 0;
  ul.addEventListener("touchstart", function (e) {
    clearInterval(timer);
    statrX = e.changedTouches[0].clientX;
    startTime = new Date();
  });
  ul.addEventListener("touchmove", function (e) {
    var distance = e.changedTouches[0].clientX - statrX;
    moveTransition();
    addTransform(-index * width + distance);
  });
  ul.addEventListener("touchend", function (e) {
    var distance = e.changedTouches[0].clientX - statrX;
    var endTime = new Date() - startTime
    if (Math.abs(distance) > width / 3 ||endTime < 300 && Math.abs(distance) > 30) {
      if (distance > 0) {
        index--;
        addTransition();
        addTransform(-width * index);
      }
      if (distance < 0) {
        index++;
        addTransition();
        addTransform(-width * index);
      }
      timer = setInterval(function () {
        index++;
        addTransition();
        addTransform(-width * index);
        // console.log(index);
      }, 1000)
    }
  });
  window.addEventListener("resize", function () {
    width = lis[0].offsetWidth;
    clearInterval(timer);
    moveTransition();
    addTransform(-index * width);
    timer = setInterval(function () {
      index++;
      addTransition();
      addTransform(-width * index);
      // console.log(index);
    }, 1000)
  })
  function addTransition() {
    ul.style.transition = "all .5s";
  }
  
  function moveTransition() {
    ul.style.transition = "none";
  }
  
  function addTransform(value) {
    ul.style.transform = "translateX(" + value + "px)";
  }
})();
