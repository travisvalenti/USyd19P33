
/**
 * Debounce is a function which will wait until a minimum of [wait] milliseconds
 * has passed between calls, before calling the given function [func].
 * @param {Function} func a function to call after the debounce
 * @param {number} wait the duraction of the debounce
 */
const debounce = (func, wait) =>  {
  var timeout

  return function executedFunction() {
    var context = this
    var args = arguments

    var later = function () {
      timeout = null
      func.apply(context, args)
    }

    var callNow = !timeout

    clearTimeout(timeout)

    timeout = setTimeout(later, wait)

    if (callNow) func.apply(context, args)
  }
}

// We define this so that it can be refered to by the debounce function
const onDOMNodeInserted = () => {
  const ads = document.getElementsByClassName('aKA D6NH0b zE')
  if (ads.length > 0) console.log(`Rebuild Email: Removing ${ads.length} ad${ads.length !== 1 && 's'}`)
  while (ads.length > 0) {
    ads.item(0).parentNode.removeChild(ads.item(0))
  }
}

/*
  The DOMNodeInserted listener will trigger every time a node is inserted
  This means that we can listen for ads being injected into the page.
  Using debounce ensures that we wait for all updates before trying to scan the page, instead of scanning each
  time the DOM changes, as in GMail it changes quite frequently. This is here to ensure future performance.

  Note that one may be tempted to just check the node that has been asserted, but it's worth noting that the
  node may be a distant ancestor of the node we are looking for.
  We could probably use e.target.findElementsByClassName immediately, but I didn't think of that and it's bed time.
*/
document.addEventListener(
  "DOMNodeInserted",
  debounce(onDOMNodeInserted, 30)
)