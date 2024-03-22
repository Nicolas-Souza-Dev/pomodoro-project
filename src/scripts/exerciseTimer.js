let exercises = [];

async function GetExercise() {
  const options = {
    method: "GET",
    headers: { "x-api-key": "kp+TrnjIj077wADxI9ivnQ==vZPzz4ccNYz4jmNp" },
  }; // Fala o método e adiciona a minha chave da api na requisição

  const url = `https://api.api-ninjas.com/v1/exercises?type=stretching`; // URL da apiNinja para buscar apenas do tipo stretching

  try {
    let res = await fetch(url, options);
    exercises = await res.json();
  } catch (error) {
    console.log(error);
  }
}

function selectRandomExercise(exercise) {
  let randomId = Math.floor(Math.random() * exercise.length);
  return exercise[randomId];
}

function log() {
  let randomExercise = selectRandomExercise(exercises);
  console.log(randomExercise);
}
