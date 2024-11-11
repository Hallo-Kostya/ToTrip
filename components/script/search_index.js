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

const places = [
   { name: "Какао-Бич", location: "Флорида, США", image: "img/index/index_pop-up/exp_1.jpg" },
   { name: "Краков", location: "Южная Польша, Польша", image: "img/index/index_pop-up/exp_1.jpg" },
   { name: "Кауаи", location: "Гавайи, США", image: "img/index/index_pop-up/exp_1.jpg" },
   { name: "Какао-Какао", location: "Екатеринбург, Россия", image: "img/index/index_pop-up/exp_1.jpg" },
   { name: "Кафе 1991", location: "Екатеринбург, Россия", image: "img/index/index_pop-up/exp_1.jpg" },
   { name: "Кафе-бар Уют-клуба Тепло", location: "Екатеринбург, Россия", image: "img/index/index_pop-up/exp_1.jpg" },
   { name: "Всё как у зверей", location: "Екатеринбург, Россия", image: "img/index/index_pop-up/exp_1.jpg" },
   { name: "Кафе-пекарня Франческо Тортини", location: "Заречный, Россия", image: "img/index/index_pop-up/exp_1.jpg" }
];

document.getElementById('search').addEventListener('input', function () {
   const query = this.value.toLowerCase();
   const dropdown = document.getElementById('places-dropdown');
   dropdown.innerHTML = '';

   const filteredPlaces = places.filter(place => place.name.toLowerCase().includes(query)).slice(0, 10);
   
   if (filteredPlaces.length > 0) {
       filteredPlaces.forEach(place => {
           const item = document.createElement('div');
           item.classList.add('recent-places-item');

           item.innerHTML = `
               <div class="recent-place__inner">
                   <img src="${place.image}" alt="">
                   <div class="place-description">
                       <h5>${place.name}</h5>
                       <p>${place.location}</p>
                   </div>
               </div>
           `;

           item.addEventListener('click', () => {
               document.getElementById('search').value = place.name;
               dropdown.style.display = 'none';
           });

           dropdown.appendChild(item);
       });

       dropdown.style.display = 'block';
   } else {
       dropdown.style.display = 'none';
   }
});

document.addEventListener('click', (event) => {
   if (!event.target.closest('#search') && !event.target.closest('#places-dropdown')) {
       document.getElementById('places-dropdown').style.display = 'none';
   }
});
