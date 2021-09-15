// var TxtType = function (el, toRotate, period) {
//   this.toRotate = toRotate
//   this.el = el
//   this.loopNum = 0
//   this.period = parseInt(period, 10) || 2000
//   this.txt = ''
//   this.tick()
//   this.isDeleting = false
// }

// TxtType.prototype.tick = function () {
//   var i = this.loopNum % this.toRotate.length
//   var fullTxt = this.toRotate[i]

//   if (this.isDeleting) {
//     this.txt = fullTxt.substring(0, this.txt.length - 1)
//   } else {
//     this.txt = fullTxt.substring(0, this.txt.length + 1)
//   }

//   this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>'

//   var that = this
//   var delta = 120 - Math.random() * 100

//   if (this.isDeleting) {
//     delta /= 2
//   }

//   if (!this.isDeleting && this.txt === fullTxt) {
//     delta = this.period
//     this.isDeleting = true
//   } else if (this.isDeleting && this.txt === '') {
//     this.isDeleting = false
//     this.loopNum++
//     delta = 500
//   }

//   setTimeout(function () {
//     that.tick()
//   }, delta)
// }

// window.onload = function () {
//   var elements = document.getElementsByClassName('typewrite')
//   for (var i = 0; i < elements.length; i++) {
//     var toRotate = elements[i].getAttribute('data-type')
//     var period = elements[i].getAttribute('data-period')
//     if (toRotate) {
//       new TxtType(elements[i], JSON.parse(toRotate), period)
//     }
//   }
//   // INJECT CSS
//   var css = document.createElement('style')
//   css.type = 'text/css'
//   css.innerHTML = '.typewrite > .wrap { border-right: 0.08em solid #fff}'
//   document.body.appendChild(css)
// }

// slow down main video
window.addEventListener('load', () => {
  const vid = document.getElementById('hero-main-video')

  vid.playbackRate = 0.5
})

// typewrite function
const typewriteFn = () => {
  // values to keep track of the number of letters typed, which quote to use. etc. Don't change these values.
  var i = 0,
    a = 0,
    isBackspacing = false,
    isParagraph = false

  // Typerwrite text content. Use a pipe to indicate the start of the second line "|".
  var textArray = [
    'Translation.',
    'Subtitling.',
    'Voiceover.',
    'Audiobook narration.',
    'Interpretation.',
    'Linguistic Consultation.',
    'Game localization.',
    'App localization.',
    'Website Localization.',
    'Content Writing.',
    'Academic Writing.',
  ]

  // Speed (in milliseconds) of typing.
  var speedForward = 100, //Typing Speed
    speedWait = 1000, // Wait between typing and backspacing
    speedBetweenLines = 1000, //Wait between first and second lines
    speedBackspace = 25 //Backspace Speed

  //Run the loop
  typeWriter('output', textArray)

  function typeWriter(id, ar) {
    var element = $('#' + id),
      aString = ar[a],
      eHeader = element.children('h1'), //Header element
      eParagraph = element.children('p') //Subheader element

    // Determine if animation should be typing or backspacing
    if (!isBackspacing) {
      // If full string hasn't yet been typed out, continue typing
      if (i < aString.length) {
        // If character about to be typed is a pipe, switch to second line and continue.
        if (aString.charAt(i) == '|') {
          isParagraph = true
          eHeader.removeClass('cursor')
          eParagraph.addClass('cursor')
          i++
          setTimeout(function () {
            typeWriter(id, ar)
          }, speedBetweenLines)

          // If character isn't a pipe, continue typing.
        } else {
          // Type header or subheader depending on whether pipe has been detected
          if (!isParagraph) {
            eHeader.text(eHeader.text() + aString.charAt(i))
          } else {
            eParagraph.text(eParagraph.text() + aString.charAt(i))
          }
          i++
          setTimeout(function () {
            typeWriter(id, ar)
          }, speedForward)
        }

        // If full string has been typed, switch to backspace mode.
      } else if (i == aString.length) {
        isBackspacing = true
        setTimeout(function () {
          typeWriter(id, ar)
        }, speedWait)
      }

      // If backspacing is enabled
    } else {
      // If either the header or the paragraph still has text, continue backspacing
      if (eHeader.text().length > 0 || eParagraph.text().length > 0) {
        // If paragraph still has text, continue erasing, otherwise switch to the header.
        if (eParagraph.text().length > 0) {
          eParagraph.text(
            eParagraph.text().substring(0, eParagraph.text().length - 1)
          )
        } else if (eHeader.text().length > 0) {
          eParagraph.removeClass('cursor')
          eHeader.addClass('cursor')
          eHeader.text(eHeader.text().substring(0, eHeader.text().length - 1))
        }
        setTimeout(function () {
          typeWriter(id, ar)
        }, speedBackspace)

        // If neither head or paragraph still has text, switch to next quote in array and start typing.
      } else {
        isBackspacing = false
        i = 0
        isParagraph = false
        a = (a + 1) % ar.length //Moves to next position in array, always looping back to 0
        setTimeout(function () {
          typeWriter(id, ar)
        }, 50)
      }
    }
  }
}

typewriteFn()

// AOS LIBRARY
AOS.init({
  offset: 200,
  delay: 50,
  duration: 400,
})
