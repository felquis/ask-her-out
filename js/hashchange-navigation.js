(function (sandbox) {
	'use strict'

	// Check browser support
	if (!'onhashchange' in window) {
	    console.warn('onhashchange problem')
	}

	var navigationHistory = []

	// check current hash
	var historyIndex = -1

	var direction = 0

	onHashChange()

	// bind events
	window.addEventListener('hashchange', onHashChange)
	window.addEventListener('keydown', onKeyDown)

	function onKeyDown(event) {
		if(event.keyCode !== 8) return

		direction = true
	}

	// event handler
	function onHashChange(event) {

		var hash = (!!event && event.target)? event.target.location.hash : location.hash

		// select first
		if (!hash) {
			location.hash = sandbox.headerNavigation.getFirst()
			return
		}

		if (hash === navigationHistory[historyIndex]) return

		direction = direction || hash === navigationHistory[historyIndex - 1]


		navigationHistory.push(hash)
		historyIndex += 1

		// call page transition
		sandbox.headerNavigation.showPage(current(), direction)

		// reset direction
		direction = false
	}

	// method, return current page hash
	function current() {
		return navigationHistory[historyIndex]
	}

	sandbox.hashchangeNavigation = {}
	sandbox.hashchangeNavigation.current = current
}(sandbox))
