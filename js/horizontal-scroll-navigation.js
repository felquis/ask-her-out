;(function () {
  // element lists
  var containPageContent = document.querySelector('.contain-page-content')
  var screenWidthHalf = 0
  var swipeNavigationLocked = false
  var swipeNavigationStarted = false

  setScreenWidthHalf()

  containPageContent.addEventListener('touchstart', onSwipeScrollMightStarted)
  containPageContent.addEventListener('mousedown', onSwipeScrollMightStarted)

  containPageContent.addEventListener('touchcancel', onSwipeScrollMightStopped)
  containPageContent.addEventListener('touchleave', onSwipeScrollMightStopped)
  containPageContent.addEventListener('mouseup', onSwipeScrollMightStopped)

  let timer

  containPageContent.addEventListener(
    'scroll',
    (event) => {
      const tempIndex = event.target.scrollLeft / window.innerWidth

      clearTimeout(timer)

      timer = setTimeout(() => {
        const rounded = Math.round(tempIndex)

		console.log(rounded)

		scrollTo(rounded)
      }, 100)
    }
    // { passive: true }
  )

  function scrollTo(index) {
    console.log('scrollTo', index)
    const element = containPageContent.children[index]

    if (element && element.scrollIntoView) {
      element.scrollIntoView({
        behavior: 'smooth',
        inline: 'start',
      })
    }
  }

  function onSwipeScrollMightStopped() {
    swipeNavigationStarted = false
  }

  function onSwipeScrollMightStarted(event) {
    console.log(event.type)
    swipeNavigationStarted = true
  }

  function setScreenWidthHalf() {
    screenWidthHalf = window.innerWidth / window.innerWidth
  }

  // helper
  function nodeListToArray(nodeList) {
    return Array.prototype.slice.call(nodeList)
  }

  window.addEventListener('resize', () => {
    setScreenWidthHalf()
  })
})(sandbox)
