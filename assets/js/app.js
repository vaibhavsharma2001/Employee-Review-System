const names = [];
var SubBut = document.getElementById('submit_review');

var Peoplecards = document.getElementsByClassName(
  'admin_scroll_container_box_items'
);
// console.log('Peoplecards :', Peoplecards);
// for (let i = 0; i < Peoplecards.length; i++) {
//   console.log(Peoplecards[i]);
//   console.log(Peoplecards[i].childNodes[5].value);
// }
SubBut.addEventListener('click', function () {
  for (let i = 0; i < Peoplecards.length; i++) {
    if (Peoplecards[i].childNodes[5].checked == true) {
      console.log(Peoplecards[i].childNodes[5].value);
      names.push(Peoplecards[i].childNodes[5].value);
    }
  }
});
