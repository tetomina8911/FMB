//index.js
$(document).ready(function () {
  // GNB 스크롤위치 조절
  const gnbScroll = $("#gnb ul li.current").offset().left;
  $("#gnb ul").scrollLeft(gnbScroll);

  //
  $(".common-main-search .tab a").click(function () {
    $(".common-main-search .tab a").removeClass("current");
    $(this).addClass("current");
  });

  //Swiper
  const swiper = new Swiper(".FamilyStie-Swiper", {
    slidesPerView: 6,
    // Navigation arrows
    navigation: {
      nextEl: ".FamilyStie-button-next",
      prevEl: ".FamilyStie-button-prev",
    },
    breakpoints: {
      // when window width is >= 480px
      280: {
        slidesPerView: 2,
      },
      // when window width is >= 360px
      360: {
        slidesPerView: 3,
      },
      // when window width is >= 640px
      720: {
        slidesPerView: 4,
      },
    },
  });

  //leyrPopup - Open
  $(".btn_trendNews").click(function () {
    $("#layerPop-container .trendNews-wrapper").stop().fadeIn();
    $("#layerPop-bg").stop().fadeIn();
    $("html, body").addClass("hidden");
  });
  //leyrPopup - Close
  $("#btn-layerPop-close").click(function () {
    $("#layerPop-container .layerPop-wrapper").stop().fadeOut("fast");
    $("#layerPop-bg").stop().fadeOut("fast");
    $("html, body").removeClass("hidden");
  });
  //leyrPopup - Close
  $("#layerPop-bg").click(function () {
    $("#layerPop-container .layerPop-wrapper").stop().fadeOut("fast");
    $("#layerPop-bg").stop().fadeOut("fast");
    $("html, body").removeClass("hidden");
  });

  //MyMenu
  $(".btn_menu").click(function () {
    $("#myMenu .myMenu-wrapper").animate(
      {
        left: 0,
      },
      500
    );
  });
  $(".btn_myMenu-close").click(function () {
    $("#myMenu .myMenu-wrapper").animate(
      {
        left: "100%",
      },
      500
    );
  });
});
