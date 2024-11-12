const filters = document.querySelectorAll('.filter');

filters.forEach(filter => {
	const circles = filter.querySelectorAll('.filter-circle');
	circles.forEach(circle => {
			circle.addEventListener('click', function() {
				circles.forEach(c => c.classList.remove('check'));
				this.classList.add('check');
			});
	});
});