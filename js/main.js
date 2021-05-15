"use strict";

window.onload = function () {
  function testWebP(callback) {
    var webP = new Image();

    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };

    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  }

  testWebP(function (support) {
    if (support == true) {
      document.querySelector('body').classList.add('webp');
    } else {
      document.querySelector('body').classList.add('no-webp');
    }
  }); // /====================== Modal/

  var modalBtn = document.querySelectorAll('[data-modal]'); //выбираем все кнопки по атрибуту

  var body = document.body;
  var modalClose = document.querySelectorAll('.modal__close'); //выбираем все кнопки закрыть модалку

  var modal = document.querySelectorAll('.modal'); //выбираем все модалки

  var burger = document.getElementById('sidebarToggle');
  var sidebar = document.getElementById('sidebar');
  var page = document.getElementById('page');
  modalBtn.forEach(function (item) {
    //обращаемся к каждой кнопке через item
    item.addEventListener('click', function (event) {
      var $this = event.currentTarget; //выбираем конкретную кнопку

      var modalId = $this.getAttribute('data-modal'); //получаем значение атрибута у кнопки

      var modal = document.getElementById(modalId); //выбираем модальное окно по айдишнику

      var modalContent = modal.querySelector('.modal__content');
      modalContent.addEventListener('click', function (event) {
        event.stopPropagation(); //запрещаем срабатывать событию клик по дочерним элементам модального окна
      });
      modal.classList.add('show-modal'); //открываем модалку через цсс

      body.classList.add('no-scroll');
      setTimeout(function () {
        modalContent.style.transform = 'none';
        modalContent.style.opacity = '1';
      }, 1);
    });
  });
  modalClose.forEach(function (item) {
    //обращаемся к каждой кнопке через item
    item.addEventListener('click', function (event) {
      var currentModal = event.currentTarget.closest('.modal'); // ищем ближайшего родителя с классом модал от кнопки закрытия

      closeModal(currentModal);
    });
  });
  modal.forEach(function (item) {
    item.addEventListener('click', function (event) {
      var currentModal = event.currentTarget;
      closeModal(currentModal);
    });
  });

  function closeModal(currentModal) {
    var modalContent = currentModal.querySelector('.modal__content');
    modalContent.removeAttribute('style');
    setTimeout(function () {
      currentModal.classList.remove('show-modal');
      body.classList.remove('no-scroll');
    }, 200);
  } // /====================== burger menu/


  burger.addEventListener('click', function (e) {
    if (body.classList.contains('show-sidebar')) {
      closeSidebar();
    } else {
      showSidebar();
    }
  });

  function showSidebar() {
    var mask = document.createElement('div');
    mask.classList.add('page__mask');
    mask.addEventListener('click', closeSidebar);
    page.appendChild(mask);
    body.classList.add('show-sidebar');
  }

  function closeSidebar() {
    body.classList.remove('show-sidebar');
    document.querySelector('.page__mask').remove();
  } //================================================textarea


  var textArea = document.querySelectorAll('[data-autoresize]');
  textArea.forEach(function (item) {
    var textAreaH = item.offsetHeight;
    item.addEventListener('input', function (e) {
      var $this = e.target;
      $this.style.height = textAreaH + 'px';
      $this.style.height = $this.scrollHeight + 'px';
    });
  });
};