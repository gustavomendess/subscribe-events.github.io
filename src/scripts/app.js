  const img = document.createElement('img');

  function pickUpDate() {
    let select = document.getElementById("event");
    let value = select.options[select.selectedIndex].id;
    let date = document.getElementById("date-event");

    if (value === '1') {
      date.value = '2021-11-15'
    } else if (value === '2'){
      date.value = '2021-10-12'
    } else if (value === '3') {
      date.value = '2021-12-08'
    } else {
      date.value = '2021-09-25'
    }
  }

  window.onload = function () {
    const url = window.location.href;

    function deleteAllCookies() {
      var cookies = document.cookie.split(";");

      for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i];
          var eqPos = cookie.indexOf("=");
          var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
    }

    if (!url.match("/src/pages/success.html")) {
      deleteAllCookies()
      let btn = document.getElementById('registerButton');
      btn.addEventListener('click', function(e) {
        let checkBox = document.getElementById('checkbox-terms');

        if (!checkBox.checked) {
          alert('Favor aceitar os termos de politica e privacidade')
          e.preventDefault()
        } else {
          generate()
        }
      })
    }
  };

  function setCookie(cookieName , cookieValue, expirationdays) {
    let d = new Date();
    d.setTime(d.getTime() + (expirationdays*24*60*60*1000));
    let expires = "expires=" + d.toGMTString();

    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
  }

  // Lógica que captura os cookies dentro do array e retorna baseado no name
  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  function dateToBr(date)
  {
    return new Date(date.split('/').reverse().join('-')).toLocaleDateString();
  }

  function generate() {
    // Captura os inputs no html
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let event = document.getElementById('event');
    let dateEvent = document.getElementById('date-event');

    if (!name.checkValidity()) {
      document.getElementById("name").innerHTML = name.validationMessage;
    } if (!name.checkValidity()) {
      document.getElementById("email").innerHTML = name.validationMessage;
    } else {

      if (getCookie("name") !== name.value ||
          getCookie("email") !== email.value ||
          getCookie("event") !== event.value
      )
      {
        setCookie('name', name.value, 30);
        setCookie('email', email.value, 30);
        setCookie('event', event.value, 30);
        setCookie('date', dateEvent.value, 30);
      } else {
        return true;
      }

      // Redireciona para página de sucesso
      window.location.href="./src/pages/success.html";
    }
  }

  // Verifica a página aberta
  const url = window.location.href;

  if (url.match("/src/pages/success.html")) {
    // Altura x largura do QR code
    const height = 200;
    const width = 200;

    // Chamada core da API
    const api = 'https://chart.googleapis.com/chart';

    // Monta a query de chamada da api
    let queryString =  '?chs=' + height + 'x' + width + '&cht=qr&chl=' + document.cookie;

    // Cria um objeto img passando a query
    img.src = api + queryString;

    // Adiciona o objeto img na id show_qr_code do html
    document.getElementById("show_qr_code").appendChild(img);

    // Adiciona o objeto receiptNumber na página como numeral random
    let receiptNumber = Math.floor(Math.random() * 10000)
    document.getElementById("receiptNumber").append(`#${receiptNumber}`)

    // Adiciona os cookies nos campos da tela de recibo
    let receiptName = getCookie("name");
    let receiptEmail = getCookie("email");
    let receiptEvent = getCookie("event");
    let receiptDate = getCookie("date");

    document.getElementById("receiptName").append(`${receiptName}`)
    document.getElementById("receiptEmail").append(`${receiptEmail}`)
    document.getElementById("receiptEvent").append(`${receiptEvent}`)
    document.getElementById("receiptDate").append(`${dateToBr(receiptDate)}`)

  }
