// Select color input
// Select size input
const colorPicker = $("#colorPicker");
const inputWidth = $("#input_width");
const inputHeight = $("#input_height");

// function to make a grid
function makeGrid(width, height) {
  for (let r = 0; r < height; r++) {
    $("#pixel_canvas").append("<tr></tr>");
  }
  for (let c = 0; c < width; c++) {
    $("tr").append("<td></td>");
  }
}

// set default values
colorPicker.val("#00b5e9");
inputWidth.val(40);
inputHeight.val(40);

// make default grid
makeGrid(inputWidth.val(), inputHeight.val());

// When size is submitted by the user, call makeGrid()
const submit = $("#sizePicker input:last");
submit.click(function (event) {
  event.preventDefault();
  $("#pixel_canvas").empty();
  makeGrid(inputWidth.val(), inputHeight.val());
});

// td click event
$("#pixel_canvas").on("click", "td", function () {
  $(this).css("background-color", colorPicker.val());
});
