export const goToHomePage = (navigate) => {
  navigate("/");
};

export const goToPokedexPage = (navigate) => {
  navigate("/pokedex");
};

export const goToPokemonDetailsPage = (navigate, id) => {
  navigate(`/pokemon/details/${id}`)
};

export const goToBattlePage=(navigate)=>{
  navigate('/arena')
}