$(document).ready(function () {
  // run ajax now
  // 2 methods = GET and POST
  var startDate
  var endDate
  const $searchResults = $('#searchResults')
  const apiKey = 'acvEahbNOejE5424HVtjzQV3bxdhnEPsCNZI1LTK'
  var $ul = $('.searchResults')

  $('#searchButton').on('click', function (e) {
    e.preventDefault()
    console.log($('#apodStartDate')[0].value)
    console.log($('#apodEndDate')[0].value)
    startDate = $('#apodStartDate')[0].value
    endDate = $('#apodEndDate')[0].value
    var apod_url = `https://api.nasa.gov/planetary/apod?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`
    console.log(apod_url)

    $.get(apod_url)
    .done(function (data) {
      var apod_arr = data
      console.log(apod_arr)
      apod_arr.forEach(function (apod) {
        var $newLi = $('<li>')
        var $newImg = $('<img>')
        var $newPDate = $('<p>')
        var $newPTitle = $('<p>')
        var $newPExplanation = $('<p>')
        var $linkbttn = $(`<button class="addBttn" data-date="${apod.date}"
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
        // return $newLi
        // var $createdList = createList(apod)
        $ul.append($newLi)
      })
    })
  })

// Save APOD search results to DB
  $searchResults.on('click', '.addBttn', function (e) {
    e.preventDefault()

    const bttn = $(this)
    var newApod = {
      title: bttn.data('title'),
      date: bttn.data('date'),
      image: bttn.data('image'),
      description: bttn.data('description')
    }

    // send the ajax to own server

    $.post('/apod', newApod).done(function (data) {
      if (data.status === 'ok') {
        alert('Hurray! ' + data.message)
      }
    })
  })
})
