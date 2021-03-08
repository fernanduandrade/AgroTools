const express = require('express');
const cors = require('cors');

const DB = require('./DB');

const app = express();
const port = 8001

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

//GET - Pegar todos questionários
app.get('/quiz',(req, res) => {
	res.json(DB)
});

//GET - Pegar questionário único
app.get('/quiz/:id', (req,res) => {
	const id = req.params.id;

	if(!id) {
		res.sendStatus(400);
	} else {
		const quizId = DB.find(quiz => quiz.id === id)
		res.json(quizId)
		res.sendStatus(200);
	}
});

//POST - Para os questionários
app.post('/quiz', (req, res) => {
	const {título, usuário, dataCadastroPergunta, perguntas} = req.body

	DB.push({
		id: `${Math.random().toString(36).substring(2,9)}`,
		título: título,
		usuário: usuário,
		dataCadastroPergunta: dataCadastroPergunta,
        perguntas: perguntas,
		localização: {},
		dataCadastroResposta: "",
		respostas: [],
		respondido: false
	});

	return res.sendStatus(200);
});

//PUT - Para as respostas
app.put('/quiz/:id', (req, res) => {
	const id  = req.params.id;

	let quizId = DB.find(quiz => quiz.id === id);
    
	const {localização, dataCadastroResposta, respostas, respondido} = req.body;
	try {

		quizId.localização = localização;
		quizId.dataCadastroResposta = dataCadastroResposta;
		quizId.respostas = respostas;
		quizId.respondido = respondido


	} catch(err) {
		console.error(err);
	}

	return res.sendStatus(200);
});

app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`)
});