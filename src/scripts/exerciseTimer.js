let exercises = [];
let usedExercises = [];
let exerciseCounter = 0;

async function GetExercise() {
  const options = {
    method: "GET",
    headers: { "x-api-key": "Sua_API_Key" },
  }; // Fala o método e adiciona a minha chave da api na requisição

  const url = `https://api.api-ninjas.com/v1/exercises?type=stretching`; // URL da apiNinja para buscar apenas do tipo stretching

  try {
    let res = await fetch(url, options);
    exercises = await res.json();
  } catch (error) {
    console.log(error);
  }
}

function selectRandomExercise() {
  // Aqui na feature 5 tem que ter a logica do local storage em relação ao usedExercises e exerciseCounter
  if (usedExercises.length === exercises.length || exerciseCounter >= 10) {
    // verifica se o contador e os execícios usados então em 10 e reseta
    usedExercises = [];
    exerciseCounter = 0;
  }

  let remainingExercises = exercises.filter(
    (exercise) => !usedExercises.includes(exercise.id) // verifica quais exercícios faltam a ser feito
  );

  if (remainingExercises.length === 0) {
    // Se todos os exercicios foram usados reseta
    usedExercises = [];
    remainingExercises = exercises;
  }

  let randomIndex = Math.floor(Math.random() * remainingExercises.length);
  let randomExercise = remainingExercises[randomIndex];

  usedExercises.push(randomExercise.id);
  exerciseCounter++;

  return randomExercise;
}

function exibirAlongamento() {
  let randomExercise = selectRandomExercise();
  document.getElementById("nomeAlongamento").innerText = randomExercise.name;
}
