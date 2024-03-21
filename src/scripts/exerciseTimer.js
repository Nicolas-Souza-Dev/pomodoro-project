let stretching = [];

async function GetStretchingExercises() {
  const options = {
    method: "GET",
    headers: { "x-api-key": "kp+TrnjIj077wADxI9ivnQ==vZPzz4ccNYz4jmNp" },
  }; // Fala o método e adiciona a minha chave da api na requisição

  const url = `https://api.api-ninjas.com/v1/exercises?type=stretching`; // URL da apiNinja para buscar apenas do tipo stretching

  await fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      stretching = data;
      console.log(stretching);
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}
GetStretchingExercises();
