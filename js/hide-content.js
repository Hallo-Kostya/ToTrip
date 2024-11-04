let trips = document.querySelectorAll('.trips');

for (let i = 0; i < trips.length; i++) {
   let trip = trips[i];
   let toggleButton = trip.querySelector('.toggle-button');
   let content = trip.querySelector('.hide-content');
	let arrow = toggleButton.querySelector('.arrow');

   toggleButton.onclick = function() {
      if (content.classList.contains('hidden')) {
         content.classList.remove('hidden');
			arrow.classList.remove('rotated');
      } else {
         content.classList.add('hidden');
			arrow.classList.add('rotated');
      }
   };
}