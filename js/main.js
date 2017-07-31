
$.noConflict();
jQuery(document).ready(function($) {

// Display the whole gallery on the page
function displayGallery(obj, htmlTag) {
  var getElementsId = document.getElementById('images');
    for(var i=0; i<obj.length; i++) {
      getElementsId.innerHTML += displayImages(i);
    }
  }

// Creating an html markup for the gallery
function displayImages(index) {
    var drawMarkup = "";
    drawMarkup += '<div class="image-wrapper">';
    drawMarkup += '<a href="photos/' + (index + 1) + '.jpg"';
    drawMarkup += ' aria-label="' + images[index].title + '<br>' + images[index].caption + '">';
    drawMarkup += '<img class="thumbnails" alt="" src="photos/thumbnails/' + (index + 1) + '.jpg">';
    drawMarkup += '<div class="middle"><div class="text">' + images[index].title + '</div></div>';
    drawMarkup += '</a></div>';
    return drawMarkup;
}

displayGallery(images, "#images");

// Img search filter
function searchImages(element, input) {
  var inner, htmlToLower, flag;
  inner = document.querySelectorAll(element);

  // Looping through the list of images
  for(var i = 0; i < inner.length; i++) {

      flag = false; // Set the flag to false
      htmlToLower = inner[i].innerHTML.toLowerCase();
      // Check if the user input is found
      if(htmlToLower.indexOf(input.toLowerCase()) > -1) {
        flag = true; // if 'yes', set the flag to 'true'
      }

      if(flag) {
        // display matched elements on the page
        inner[i].style.display = "";
      } else {
        // if not, display nothing
        inner[i].style.display = "none";
        // Reset button. Triggers an event upon click.
         $( '#resetButton' ).click(function() {
             $('#not-found').hide(); // hide the 'not-found' img
             $('.image-wrapper').css('display', ''); // display the whole gallery
             $('#search').val(''); // reset the search field
             $('#resetButton').fadeOut("fast"); // the button does all above + disappears upon click
         });
      }
    }
    // Show/hide the 'not-found' img
    var num =  $('.image-wrapper:not([style*="display: none"])').length;
    if(num > 0) {
      $('#not-found').hide();
    } else {
      $('#not-found').show();
    }
  }


// Trigger an event when user types something in the search field
$('#search').on("keyup", function() {

// Show/hide Reset button (next to search button)
  if($.trim(this.value).length > 0) {
    // if search field is not empty
    $('#resetButton').show();
  } else {
    $('#resetButton').hide();
  }

// Calling the img search filter
  searchImages(".image-wrapper", this.value);
});

// Plugin initialization
$('.gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    showCloseBtn: 'false',
    gallery: {
      enabled: true,
      tPrev: 'Previous (Left arrow key)',
      tNext: 'Next (Right arrow key)'
    }
});

}); // End of JQuery ready function
