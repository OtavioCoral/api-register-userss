const { application, json } = require("express");

async function cadastrar(event) {
      event.preventDefault();
      const name      = document.querySelector('name').value;
      const email     = document.querySelector('email').value;
      const password  = document.querySelector('password').value;

      const data = {name,email,password}

      const response = await fetch('http://localhost:3000/usuario/cadastrar', {
            method: "POST",
            headers: {
                  "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
      })

      const results = await response.json();

      if(results.success) {
            alert(results.message)
      } else {
            alert(alert.message)
      }
}

async function logar(event) {
      event.preventDefault();

      const email    = document.getElementById('email_login').value;
      const password = document.getElementById('password_login').value;

      const data = {  email, password }

      const response = await fetch("http://loalhost:3000/login", {
            method: "POST",
            headers: {
                  "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
      })

      let results = await response.json();

      if(results.success) {
            let userData = results.data;

            localStorage.setItem('informacoes', JSON.stringify(userData))
            let html  = document.getElementById('irformacoes')
            let dados = JSON.parse(localStorage.getItem('informacoes'))
            console.log(dados)

            html.innerHTML = `<div style="display: flex flex-direction: colum; align-items: end">
                                 Perfil: ${dados.perfil}
                              </div>`

            html.style.display = 'block'

            dados.perfil === 'admin'
              ? document.getElementById('cadastrar_produtos').style.display = 'block'
              : document.getElementById('cadastrar_produtos').style.display = 'none'

            alert(results.message)
      } else {
            alert(results.message)
      }
}

async function cadastrarProduto(event) {
      event.preventDefault()

      const title = document.getElementById('title').value
      const price = Number(document.getElementById('price').value)
      const file = document.getElementById('file').files[0]

      let formData = new FormData();

      formData.append('title', title)
      formData.append('price', price)
      formData.append('file', file)

      const response = await fetch('http://localhost:3000/produto/cadastrar', {
            method: "POST",
            body: formData
      })

      const results = await response.json()

      if(results.success) {
            let productData = results.data
            const images = 'http://localhost:3000/uploads/'
            let html = document.getElementById('card_produto')

            productData.array.forEach(product => {
             let card = `
              <div style="">
                  <img src="${images + product.image} " alt="" width="50px" height="50px">
                  <p>${product.title}</p>
                  <span>R$ ${product.price}</span>
                  <button onclick="formEditarProduto(${JSON.stringify(product)})">Editar</button>
              </div>
            `
             html.innerHTML += card
            });
              
      } else {
            alert(results.message)
      }
}
// falta atualizar produto

function formEditarProduto(product) {
      console.log(product)
      let modal = document.getElementById('editar_produto')
      let images = 'http://localhost:3000/uploads/'

      document.getElementById('id_produto').value = product.id
      document.getElementById('editar_titulo').value = product.title
      document.getElementById('id_preco').value = product.price
      document.getElementById('imagem_produto').src = images + product.image

      modal.style.display = "block"
}

async function AtualizarProduto(event) {
      event.preventDefault()

      
      let id = document.getElementById('id_produto').value 
      let titulo = document.getElementById('editar_titulo').value
      let preco = document.getElementById('id_preco').value 
      let file = document.getElementById('editar_imagem').files[0]

      let formData = new FormData()

      formData.append('titulo', titulo)
      formData.append('preco', preco)
      formData.append('file', file)

      const response = await fetch(`http://localhost:3000/produto/${id}`, {
         method: "PUT",
         body: formData
      })

      const results = await response.json()

      if(results.success) {
            alert(results.message)
      } else {
            alert(results.message)
      }
      // console.log(formData.get('titulo'), formData.get('preco'), formData.get('file'), id)
}

async function saveProduct(event) {
      event.preventDefault();
  
      const id = document.getElementById('product-id').value;
      const nome = document.getElementById('product-name').value;
      const descricao = document.getElementById('product-description').value;
      const preco = parseFloat(document.getElementById('product-price').value);
      const imagem = document.getElementById('product-image').value;
      const parcela = document.getElementById('product-parcela').value;
}
