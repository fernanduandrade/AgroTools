const express = require('express');
const cors = require('cors');

const DB = require('./DB');

const app = express();
const port = 8001

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());


app.get('/quiz',(req, res) => {
	res.json(DB)
});

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

//POST USUÁRIO
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

//PUT RESPOSTAS
app.put('/quiz/:id', (req, res) => {
	const id  = req.params.id;
    console.log(id)

	let quizId = DB.find(quiz => quiz.id === id)
	console.log(quizId)
    
	const {localização, dataCadastroResposta, respostas} = req.body;

	try {

		quizId.localização = localização;
		quizId.dataCadastroResposta = dataCadastroResposta;
		quizId.respostas = respostas;

	} catch(err) {
		console.error(err);
	}
	console.log(quizId)
	return res.sendStatus(200);

});

app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`)
});

