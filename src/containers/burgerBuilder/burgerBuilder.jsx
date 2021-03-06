import React, { Component } from "react";

import BuildControls from "../../components/burger/buildControls/buildControls";
import Burger from "../../components/burger/burger";

import Auxx from "../../hoc/Auxx";

const INGREDIENT_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      cheese: 0,
      bacon: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
  };
  
  updatePurchaseState (ingredients){
    const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum, el) =>{
            return sum + el;
        }, 0);

        this.setState( { purchasable: sum > 0} )
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;

    const ingredientPrice = INGREDIENT_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + ingredientPrice;

    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0){
        return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;

    const ingredientPrice = INGREDIENT_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - ingredientPrice;

    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);

  };

  render() {
      
    const disabledInfo = { ...this.state.ingredients };
    for( let key in disabledInfo ) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }
    console.log( disabledInfo)

    return (
      <Auxx>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled = {disabledInfo}
          price = {this.state.totalPrice}
          purchasable ={this.state.purchasable}
        />
      </Auxx>
    );
  }
}

export default BurgerBuilder;
