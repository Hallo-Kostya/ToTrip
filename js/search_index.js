document.addEventListener('DOMContentLoaded', function () {
   const searchButton = document.querySelector('.search-button__lead');
   const popup = document.querySelector('.lead-search__pop-up');
   const overlay = document.querySelector('.overlay');

   searchButton.addEventListener('click', function (e) {
      e.preventDefault();
      popup.classList.add('active');
      overlay.classList.add('active');
   });

   // Закрытие окна по клику вне его
   document.addEventListener('click', function (e) {
      if (!popup.contains(e.target) && !searchButton.contains(e.target)) {
         popup.classList.remove('active');
         overlay.classList.remove('active');
      }
   });
});
