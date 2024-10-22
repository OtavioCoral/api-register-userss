//Importar pacotes para aplicação
const express = require('express');
const cors    = require('cors');
//Definir a porta e instanciar o express
const porta = 3000;
const app = express();
//Habilitar o cors e utiçização de JSON
app.use(cors());
app.use(express.json());
//Testar API
app.listen(porta, () => console.log(`Rodando na porta ${porta}`));
//Importar conexão com o banco
const connection = require('./db_config');
 
//Rota post para cadastrar novo usuário
app.post('/usuario/cadastrar', (request, response) => {
    //Criar uma array com os dados recebidos
    let params = Array(  //Mesma coisa que let list[]
        request.body.name,
        request.body.email,
        request.body.password,
        request.body.cpf_number
    );
    // Criar o comando de execução no banco de dados
    let query = "INSERT INTO users(name,email,password,cpf_number) VALUES(?,?,?,?);";
    //Passar o comando e os dados para função query
    connection.query(query,params, (err,results) => {
        if(results) {
            response
             .status(201) //sucesso!
             .json({
                success: true,
                message: "Sucesso!",
                data: results  
             })
        } else {
            response
             .status(400)//Bad Request
             .json({
                success: false,
                message: "Ops, não obteve sucesso",
                data: err
             })
        }
    })
})
 
app.get('/usuarios/listar', (request, response) => {
    const query = "SELECT * FROM users";
   
    connection.query(query, (err, results) => {
        if(results) {
            response
             .status(200)
             .json({
                success: true,
                message: "Sucesso!",
                data: results
             })
        } else {
            response
             .status(400)
             .json({
                success: false,
                message: "Ops, não obteve sucesso!",
                data: err
             })
        }
    })
})
 
app.put('/usuarios/editar/:id', (request, response) => {
    let params = Array(
        request.body.name,
        request.params.id
    );
 
    let query = "UPDATE users SET name = ? WHERE id = ?";
 
    connection.query(query,params, (err, results) => {
        if(results) {
            response
            .status(200)
            .json({
               success: true,
               message: "Sucesso",
               data: results
             })
        } else {
            response
            .status(400)
            .json({
               success: false,
               message: "Ops, não obteve sucesso!",
               data: err
        })
    }
    })
})
 
app.delete('/usuarios/deletar/:id', (request, response) => {
    let params = Array(
        request.params.id
    );
 
    let query = "DELETE FROM users WHERE id = ?;"
 
    connection.query(query,params, (err, results) => {
        if(results) {
            response
            .status(200)
            .json({
               success: true,
               message: "Sucesso",
               data: results
             })
        } else {
            response
            .status(400)
            .json({
               success: false,
               message: "Ops, não obteve sucesso!",
               data: err
        })
    }
    })
})
 
app.post('/login', (request, response) => {
    let params = Array(
        request.body.email
    )
 
    let query = "SELECT id,name,email,password, perfil FROM users WHERE email = ?";
 
    connnection.query(query, params, (err, results) => {
        if(results.length > 0) {
            let senhaDigita = request
            let senhaBanco = results[0].password
 
            if(senhaBanco === senhaDigita) {
                response
                    .stauts(200)
                    .json({
                        success: true,
                        message: "Sucesso",
                        data: results[0]
                    })
            } else {
                response
              .status(400)
              .json({
                success: false,
                message: "Verifique sua Senha!"
                })
            }
        } else {
            response
              .status(400)
              .json({
                success: false,
                message: "E-mail não cadastrado!"
              })
        }
    })
})
//tem menu de contexto 
app.get('/produtos/listar', (request, response) => {
    let query = "SELECT * FROM products";

    connection.query(query, (err,results) => {
        if (results) {
            response 
            .status(200)
            .json({
                success: true,
                massage: "Sucesso!",
                data: results
            })
        } else {
            response 
            .status(400)
            .json({
                sucess: false,
                message: "Sem sucesso!",
                data: err
            })
        }
    })
})

app.put('/produto/:id', upload.single('file'), (request, response) => {
    let params = Array(
        request.params.titulo,
        request.params.preco,
        request.file.filename,
        request.params.id
    )

    let query = `UPDATE products SET title = ?, price = ?, image = ? WHERE id = ?`

    connection.query(query, params, (err, results) => {
        if (results) {
            response 
            .status(200)
            .json({
                success: true,
                massage: "Sucesso!",
                data: results
            })
        } else {
            response 
            .status(400)
            .json({
                sucess: false,
                message: "Sem sucesso!",
                data: err
            })
        }
    })
})
 
//server.js