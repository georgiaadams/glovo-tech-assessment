import { Component } from "react";
import axios from "axios";

class CocktailService extends Component {
  constructor() {
    super();
    this.api = axios.create({
      baseURL: "https://thecocktaildb.com/api/json/v1/1",
    });
  }

  getCocktailByLetter(letter) {
    return this.api.get(`/search.php?f=${letter}`).then(({ data }) => data);
  }
}

const cocktailService = new CocktailService();
export default cocktailService;
