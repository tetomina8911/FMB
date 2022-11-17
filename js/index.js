//index.js
$(document).ready(function () {
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
  });
});
