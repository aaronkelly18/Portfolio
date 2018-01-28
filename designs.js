// Select color input
// Select size input
// When size is submitted by the user, call makeGrid()
$(document).ready(function() {
    const table = $('#pixel_canvas');
    //Creat a reset button
    const resetBt = $('<input type="reset">');
    $('#sizePicker').append(resetBt);
    //Clear table
    resetBt.click(function() {
      table.empty();
    });

    //Make a grid with values between 1 and 100
    $('form').submit(function(event) {
        event.preventDefault();
        table.find($('tr')).remove();
        let height = $('#input_height').val();
        let width = $('#input_width').val();
        let rows;
        let cells;

        if(height > 0 && height <= 100 && width > 0 && width <= 100) {
          for(let i = 1; i <= height; i++) {
            rows = $('<tr></tr>').appendTo(table);
            for(let j = 1; j <= width; j++) {
              cells = rows.append('<td></td>');
            }
          };
        } else {
          alert("Invalid input.\nTry with values between 1 and 100.");
        }
      });

    //Coloring cells
    table.on('click', 'td', function() {
      let color = $('#colorPicker').val();
      $(this).css('background-color', color)
        .addClass('coloredCell');
    });
    //Erasing color
    table.on('click', 'td.coloredCell', function() {
      $(this).css('background-color', 'initial')
        .removeClass();
    });
  });
