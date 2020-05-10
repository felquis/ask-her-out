(function () {
	// element lists
	var header = document.querySelector('.header')
	var navigations = nodeListToArray( header.querySelectorAll('li a') )

	// bind events
	navigations.map(function (element) {
		element.addEventListener('click', onNavigationIntent)
	})

	// event handler
	function onNavigationIntent(event) {
		var pageTarget = event.target.getAttribute('href')

		// var page = document.querySelector('[data-page="' + pageTarget + '"]')

		// prepare new page
		// exit current page
		// enter new page

		showPage(pageTarget)
	}

	// method
	function showPage(hash, direction) {
		var prev = document.querySelector('.page.active') || document.querySelector('.page')
		var next = document.querySelector('[data-page="' + hash + '"]')

		if (!prev) {
			next.classList.add('active');
			return
		}

		if (direction) {
			prev.classList.add('animation-reverse')
			next.classList.add('animation-reverse')

			direction = 0
		}

		prev.classList.add('is-leaving')
		next.classList.add('is-entering')

		setTimeout(function () {
			prev.classList.remove('active')
			prev.classList.remove('is-leaving')
		}, 505)


		setTimeout(function () {
			next.classList.remove('is-entering')
			next.classList.add('active')

			prev.classList.remove('animation-reverse')
			next.classList.remove('animation-reverse')
		}, 510)

		next.scrollIntoView({
			inline: 'start',
			behavior: 'smooth'
		})
	}

	function getFirst() {
		return navigations[0].getAttribute('href')
	}

	// helper
	function nodeListToArray(nodeList) {
		return Array.prototype.slice.call(nodeList)
	}

	// exports
	sandbox.headerNavigation = {}
	sandbox.headerNavigation.showPage = showPage
	sandbox.headerNavigation.getFirst = getFirst
}(sandbox))
