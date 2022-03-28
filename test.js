// let $inner = document.querySelector(".inner"),
//   $spin = document.querySelector("#spin"),
//   $reset = document.querySelector("#reset"),
//   $data = document.querySelector(".data"),
//   $mask = document.querySelector(".mask"),
//   maskDefault = "Place Your Bets",
//   timer = 9000;

// var red = [32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3];

// $reset.style.visibility = "hidden";

// $mask.textContent = "Place Your Bets";

// $spin.addEventListener("click", function () {
//   // get a random number between 0 and 36 and apply it to the nth-child selector
//   var randomNumber = Math.floor(Math.random() * 36),
//     color = null;
//   $inner
//     .setAttribute("data-spinto", randomNumber)
//     .querySelector("li:nth-child(" + randomNumber + ") input")
//     .prop("checked", "checked");
//   // prevent repeated clicks on the spin button by hiding it
//   document.querySelector(this).hide();
//   // disable the reset button until the ball has stopped spinning
//   $reset.classList.add("disabled").prop("disabled", "disabled").show();

//   document.querySelector(".placeholder").remove();

//   setTimeout(function () {
//     $mask.textContent = "No More Bets";
//   }, timer / 2);

//   setTimeout(function () {
//     $mask.textContent = "Place Your Bets";
//   }, timer + 500);

//   // remove the disabled attribute when the ball has stopped
//   setTimeout(function () {
//     $reset.removeClass("disabled").prop("disabled", "");

//     if ($.inArray(randomNumber, red) !== -1) {
//       color = "red";
//     } else {
//       color = "black";
//     }
//     if (randomNumber == 0) {
//       color = "green";
//     }

//     document.querySelector(".result-number").text(randomNumber);
//     document.querySelector(".result-color").text(color);
//     document
//       .querySelector(".result")
//       .css({ "background-color": "" + color + "" });
//     $data.classList.add("reveal");
//     $inner.classList.add("rest");

//     let $thisResult =
//       '<li class="previous-result color-' +
//       color +
//       '"><span class="previous-number">' +
//       randomNumber +
//       '</span><span class="previous-color">' +
//       color +
//       "</span></li>";

//     document.querySelector(".previous-list").prepend($thisResult);
//   }, timer);
// });

// $reset.addEventListener("click", function () {
//   // remove the spinto data attr so the ball 'resets'
//   $inner.attr("data-spinto", "").removeClass("rest");
//   document.querySelector(this).hide();
//   $spin.show();
//   $data.removeClass("reveal");
// });

// // so you can swipe it too
// var myElement = document.getElementById("plate");
// var mc = new Hammer(myElement);
// mc.addEventListener("swipe", function (ev) {
//   if (!$reset.classList.contains("disabled")) {
//     if ($spin.is(":visible")) {
//       $spin.click();
//     } else {
//       $reset.click();
//     }
//   }
// });

var $inner = document.querySelector(".inner"),
  $spin = document.querySelector("#spin"),
  $reset = document.querySelector("#reset"),
  $data = document.querySelector(".data"),
  $mask = document.querySelector(".mask"),
  maskDefault = "Place Your Bets",
  timer = 9000;
var red = [32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3];
$reset.originalDisplay = getComputedStyle($reset).display;
$reset.style.display = "none";
$mask.textContent = maskDefault;
$spin.addEventListener("click", function () {
  // get a random number between 0 and 36 and apply it to the nth-child selector
  var randomNumber = Math.floor(Math.random() * 36),
    color = null;

  $inner.dataset.spinto = randomNumber;
  $inner
    .querySelectorAll("li:nth-child(" + randomNumber + ") input")
    .forEach((child) => child.setAttribute("checked", "checked"));

  // prevent repeated clicks on the spin button by hiding it
  $spin.originalDisplay = getComputedStyle($spin).display;
  $spin.style.display = "none";
  // disable the reset button until the ball has stopped spinning
  $reset.classList.add("disabled");
  $reset.setAttribute("disabled", "disabled");
  $reset.style.display = $reset.originalDisplay;

  document.querySelector(".placeholder").remove();

  setTimeout(function () {
    $mask.textContent = "No More Bets";
  }, timer / 2);

  setTimeout(function () {
    $mask.textContent = maskDefault;
  }, timer + 500);

  // remove the disabled attribute when the ball has stopped
  setTimeout(function () {
    $reset.classList.remove("disabled");
    $reset.setAttribute("disabled", "");

    if (red.includes(randomNumber)) {
      color = "red";
    } else {
      color = "black";
    }
    if (randomNumber == 0) {
      color = "green";
    }

    document.querySelector(".result-number").textContent = randomNumber;
    document.querySelector(".result-color").textContent = color;
    document.querySelector(".result").style.backgroundColor = color;

    $data.classList.add("reveal");
    $inner.classList.add("rest");

    let $thisResult = new DOMParser().parseFromString(
      '<li class="previous-result color-' +
        color +
        '"><span class="previous-number">' +
        randomNumber +
        '</span><span class="previous-color">' +
        color +
        "</span></li>",
      "text/html"
    ).body.childNodes[0];

    document.querySelector(".previous-list").prepend($thisResult);
  }, timer);
});

$reset.addEventListener("click", function () {
  // remove the spinto data attr so the ball 'resets'
  $inner.dataset.spinto = "";
  $inner.classList.remove("rest");

  $reset.style.display = "none";
  $spin.style.display = $spin.originalDisplay;
  $data.classList.remove("reveal");
});
// so you can swipe it too
var myElement = document.getElementById("plate");
var mc = new Hammer(myElement);
mc.on("swipe", function (ev) {
  if (!$reset.classList.contains("disabled")) {
    if ($spin.offsetWidth > 0 || $spin.offsetHeight > 0) {
      $spin.click();
    } else {
      $reset.click();
    }
  }
});
