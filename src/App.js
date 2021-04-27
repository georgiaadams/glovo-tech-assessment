import "./App.css";
import React from "react";
import cocktailService from "./services/cocktail-service";

function App() {
  const [cocktails, setCocktails] = React.useState([]);
  const [drinkTypes, setDrinkTypes] = React.useState({
    alcoholic: [],
    nonAlcoholic: [],
  });

  React.useEffect(() => {
    const getCocktails = async () => {
      const { drinks } = await cocktailService.getCocktailByLetter("g");
      const alcoholic = [];
      const nonAlcoholic = [];
      const cocktailWithIngredients = drinks.map((drink) => {
        drink.strAlcoholic === "Alcoholic"
          ? alcoholic.push(drink)
          : nonAlcoholic.push(drink);

        return { ...drink, ingredients: getIngredientsList(drink) };
      });
      setDrinkTypes({ alcoholic, nonAlcoholic });
      setCocktails(cocktailWithIngredients);
    };
    getCocktails();
  }, []);

  const getIngredientsList = (cocktail) => {
    const ingredients = [];
    for (let i = 1; i < 15; i++) {
      const cocktailWithIngredients = {
        name: cocktail[`strIngredient${i}`],
        measure: cocktail[`strMeasure${i}`],
      };
      ingredients.push(cocktailWithIngredients);
    }
    return ingredients.filter((ing) => ing.name || ing.measure);
  };

  const renderDrinksByType = (drinks) =>
    drinks.map((drink) => <span>{drink.strDrink} - </span>);

  return (
    <div className="App">
      <h1>Glovo Cocktails 🍸</h1>
      <h3>Number of Cocktails: {cocktails.length}</h3>
      <span style={{ fontWeight: "bold" }}>Names: </span>
      {cocktails.map((cocktail) => (
        <span>{cocktail.strDrink} - </span>
      ))}
      <div>
        <h3>The Extravagent Ones - More than 4 Ingredients</h3>
        {cocktails.map((cocktail) => {
          if (cocktail.ingredients.length >= 5)
            return <span>{cocktail.strDrink} - </span>;
        })}
      </div>
      <h3>With ID, Name, Ingredients & Quantity</h3>
      {cocktails.map((cocktail) => {
        if (cocktail.ingredients.length < 5) return null;
        return (
          <div>
            <p style={{ fontWeight: "bold" }}>
              ID: {cocktail.idDrink} - Cocktail: {cocktail.strDrink}
            </p>
            <span style={{ fontWeight: "bold" }}>Ingredients: </span>
            {cocktail.ingredients.map((ing) => {
              return (
                <span>
                  {ing.name} - Quantity: {ing.measure || "Not Stated"} || {""}
                </span>
              );
            })}
          </div>
        );
      })}
      <h2>Alcoholic vs. Alcohol Optional</h2>
      <h4>Alcoholic:</h4> {renderDrinksByType(drinkTypes.alcoholic)}
      <h4>Alcohol Optional:</h4> {renderDrinksByType(drinkTypes.nonAlcoholic)}
    </div>
  );
}

export default App;
