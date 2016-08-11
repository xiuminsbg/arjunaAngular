window.onload = function () {
  // Get the modal
  var modal = document.getElementById('myModal');

  // Get the button that opens the modal
  var btn = document.getElementById("addButton");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks the button, open the modal
  btn.onclick = function() {
    console.log('clicked');
    modal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
  }

  var close = document.getElementById("saveBtn");
  close.onclick = function () {
    modal.style.display = "none";
  }

  // EDIT Input Field
  // var editButton = document.getElementById('editButton');
  // var editInputField = document.getElementById('editInputField');
  // editButton.onclick = function () {
  //   console.log('editInputField clicked');
  //   editInputField.style.display = 'block';
  // };
}
