
var menu = document.getElementById('menu');
var nav = document.getElementById('nav');
var exit = document.getElementById('exit');
var angle = document.getElementById('angle');

menu.addEventListener('click', function (e) {
    nav.classList.toggle('hide-mobile');
    e.preventDefault();
});

exit.addEventListener('click', function (e) {
    nav.classList.add('hide-mobile');
    e.preventDefault();
})

angle.addEventListener('click', function (e) {
    cez.classList.toggle('show-desktop');
    e.preventDefault();
})