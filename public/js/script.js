$(document).ready(function () {
  var startDate
  var endDate
  const $searchResults = $('#searchResults')
  const apiKey = 'acvEahbNOejE5424HVtjzQV3bxdhnEPsCNZI1LTK'
  var $ul = $('.searchResults')

  $('#searchButton').on('click', function (e) {
    e.preventDefault()
    startDate = $('#apodStartDate')[0].value
    endDate = $('#apodEndDate')[0].value
    var apod_url = `https://api.nasa.gov/planetary/apod?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`

    $.get(apod_url)
    .done(function (data) {
      var apod_arr = data
      console.log(apod_arr)
      apod_arr.forEach(function (apod) {
        var $newLi = $('<li class="list-group-item">')
        var $newImg = $('<img class="img-fluid">')
        var $newPDate = $('<p class="text-left">')
        var $newPTitle = $('<h3 class="text-center">')
        var $newPExplanation = $('<p class="lead">')
        var $linkbttn = $(`<button class="btn btn-primary" id="addBttn" data-date="${apod.date}"
        data-title="${apod.title}"
        data-image="${apod.url}"
        data-description="${apod.explanation}"
        >Add</button>`)

        $newPDate.text(apod.date)
        $newPTitle.text(apod.title)
        $newImg.attr({
          src: apod.url,
          alt: apod.title
        })
        $newPExplanation.text(apod.explanation)

        $newLi.append($newPDate, $newPTitle, $newImg, $newPExplanation, $linkbttn)
        $ul.append($newLi)
      })
    })
  })

// Save APOD search results to DB =======
  $searchResults.on('click', '#addBttn', function (e) {
    e.preventDefault()

    const bttn = $(this)
    var newApod = {
      title: bttn.data('title'),
      date: bttn.data('date'),
      image: bttn.data('image'),
      description: bttn.data('description')
    }

    // send the ajax to own server

    $.post('/apods', newApod).done(function (data) {
      if (data.status === 'ok') {
        alert('Hurray! ' + data.message)
      }
    })
  })
})
