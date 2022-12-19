$(document).ready(function () {
  $(".hamburger").click(function () {
    $(this).toggleClass("is-active");
  });

  $(".threeLine").click(function () {
    if ($(".threeLine").hasClass("active")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  $(".owl-carousel").owlCarousel({
    items: 1,
    loop: true,
    nav: true,
    autoWidth: true,
    autoplay: true,
    autoPlaySpeed: 500,
    autoplayTimeOut: 500,
    dots: false,
    navText: [
      "<div class='nav-btn prev-slide'><</div>",
      "<div class='nav-btn next-slide'><</div>",
    ],
  });

  $(".owl-carousel").on("changed.owl.carousel", function (event) {
    let item = event.item.index - 2;
    $("h3 , button").removeClass("animated fadeInUp");
    $(".owl-item")
      .not(".cloned")
      .eq(item)
      .find("h3 , button")
      .addClass("animated fadeInUp");
  });

  $(".request").click(function () {
    let checkInDate = new Date($("#checkInDate").val()).getTime();
    let checkOutDate = new Date($("#checkOutDate").val()).getTime();
    if (checkInDate && checkOutDate) {
      $.ajax({
        url: "./assets/json/date.json",
        type: "GET",
        success: (result) => {
          result.map((date) => {
            let fromTimeStam = new Date(date.from).getTime();
            let toTimeStam = new Date(date.to).getTime();
            if (checkInDate >= fromTimeStam && checkOutDate <= toTimeStam) {
              // console.log(date.room);
              $("#myModal").css("display", "block");
              $("#tbody").append(`<tr>
                              <td>${date.from}</td>
                              <td>${date.to}</td>
                              <td>${date.room}</td>
                              <td>${date.bed}</td>
                            </tr>`);
              $("#tbody tr:last").css({ backgroundColor: "#6fb586" });
            } else {
              $("#tbody").append(`<tr>
                  <td>${date.from}</td>
                  <td>${date.to}</td>
                  <td>${date.room}</td>
                  <td>${date.bed}</td>
                </tr>`);
            }
          });
        },
      });
    }
  });

  $(".cancel").click(function () {
    $("#myModal").fadeOut();
    $("#tbody").empty();
  });

  $(".navUl li").mouseenter(function () {
    $(">ul.subMenu:not(:animated)", this).slideDown(500);
  });
  $("ul.subMenu").mouseleave(function () {
    $(this).slideUp(500);
  });


  let currentIndex = 0,
    navItems = $(".CarouselNav li");

  function setSlide(index) {
    navItems.removeClass("selectedCarouselNav");
    navItems.eq(index).addClass("selectedCarouselNav");
    $(".myTestSlides").css("display", "none");
    $(".myTestSlides").eq(index).css("display", "flex");
  }

  $(".CarouselNav li").click(function () {
    let index = $(".CarouselNav li").index($(this));
    currentIndex = index;
    setSlide(currentIndex);
  });
  function slide() {
    if (currentIndex < navItems.length - 1) {
      currentIndex++;
      setSlide(currentIndex);
    } else {
      currentIndex = 0;
      setSlide(currentIndex);
    }
  }

  setInterval(slide, 5000);
});

$(window).scroll(function () {
  if ($(window).scrollTop() > 100) {
    $("#backToTop").addClass("show");
  } else {
    $("#backToTop").removeClass("show");
  }
});

$("#backToTop").on("click", function (e) {
  e.preventDefault();
  $("html, body").animate({ scrollTop: 0 }, "100");
});


function openMenu() {
  $(".threeLine").addClass("active");
  $(".drawerMenu").animate(
    {
      width: "20vw",
      height: "100vh",
    },
    "slow"
  );

  $(".threeLine").animate(
    {
      marginRight: "10vw",
    },
    "slow"
  );

  $(".logo").css({
    display: "none",
  });
  $(".extra").text("menu");
}
function closeMenu() {
  $(".threeLine").removeClass("active");
  $(".drawerMenu").animate(
    {
      width: "0",
      height: "100vh",
    },
    100
  );
  $(".logo").css({
    display: "flex",
  });
  $(".threeLine").animate(
    {
      marginRight: "0vw",
    },
    "slow"
  );
  $(".extra").text("Extra");
}

//second Carousel ---------------------------------------------------
let slideIndex = 0;
showSlides();
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("slides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace("active", "");
  }
  slides[slideIndex - 1].style.display = "flex";
  dots[slideIndex - 1].className += " active";
}
window.onload = function () {
  setInterval(function () {
    showSlides();
  }, 5000);
};
