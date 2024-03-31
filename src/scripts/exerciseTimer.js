const exerciseContent = document.getElementById("exercise-content");

let exercises = [];
let usedExercises = [];
let exerciseCounter = 0;

// Coisa extra que resolvi fazer @Glauton
let exercisesTranslated = [
  { namePtBr: "Círculos de Quadril (Prone)", nameEn: "Hip Circles (Prone)" },
  { namePtBr: "Círculos de Quadril em Pé", nameEn: "Standing Hip Circles" },
  { namePtBr: "Groiners", nameEn: "Groiners" },
  { namePtBr: "Sucção Abdominal", nameEn: "Stomach Vacuum" },
  { namePtBr: "Puxão Lateral de Punho", nameEn: "Side Wrist Pull" },
  { namePtBr: "Balanço de Perna em Pé", nameEn: "Standing leg swing" },
  { namePtBr: "Superman", nameEn: "Superman" },
  { namePtBr: "SMR da Banda Iliotibial", nameEn: "Iliotibial band SMR" },
  { namePtBr: "Moinhos de Vento", nameEn: "Windmills" },
  {
    namePtBr: "Alongamento de Isquiotibiais com Perna Elevada",
    nameEn: "Leg-Up Hamstring Stretch",
  },
];

// O feth da Api passando uam key fornecida na ApiNinja
async function GetExercise() {
  const options = {
    method: "GET",
    headers: { "x-api-key": "RKlKZlRsnbGSHIgoA4QEmwcTupyMFzXAk5h0Odm6" },
  }; // Fala o método e adiciona a minha chave da api na requisição

  const url = `https://api.api-ninjas.com/v1/exercises?type=stretching`; // URL da apiNinja para buscar apenas do tipo stretching

  try {
    let res = await fetch(url, options);
    exercises = await res.json();
  } catch (error) {
    console.log(error);
  }
}

//Função para selecionar aleatoriamente um execício e dentro outras formas de fazer o execício não se repetir
function selectRandomExercise() {
  exerciseCounter = parseInt(localStorage.getItem("exerciseCounter")) || 0;
  usedExercises = JSON.parse(localStorage.getItem("usedExercises")) || [];
  // Pega do localstorage os dados caso tenha ou inicia com um valor inicial

  if (usedExercises.length === exercises.length || exerciseCounter >= 10) {
    // verifica se o contador e os execícios usados então em 10 e reseta
    usedExercises = [];
    exerciseCounter = 0;
  }

  let remainingExercises = exercises.filter(
    (exercise) => !usedExercises.includes(exercise.name) // verifica quais exercícios faltam a ser feito
  );

  // Reinicia a Array e os exercícios filtrados se todos foram usados
  if (remainingExercises.length === 0) {
    usedExercises = [];
    remainingExercises = exercises;
  }

  let randomIndex = Math.floor(Math.random() * remainingExercises.length);
  let randomExercise = remainingExercises[randomIndex];

  usedExercises.push(randomExercise.name);
  exerciseCounter++;

  localStorage.setItem("exerciseCounter", exerciseCounter);
  localStorage.setItem("usedExercises", JSON.stringify(usedExercises));
  // Salva no localStorage os exercícios e o contador

  return randomExercise;
}

// Mostra o alongamento traduzido no HTML
function exibirAlongamento() {
  const randomExercise = selectRandomExercise();
  let translatedName;
  exercisesTranslated.forEach((translation) => {
    if (translation.nameEn === randomExercise.name) {
      translatedName = translation.namePtBr;
    }
  });
  exerciseContent.innerHTML = `${translatedName} `;
}
