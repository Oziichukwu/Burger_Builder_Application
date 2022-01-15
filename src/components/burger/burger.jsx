import React from "react";

import BurgerIngredient from "./burgerIngredient/burgerIngredient";

import "./burger.css";

const Burger = (props) => {
     
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_,index )=> {
            return <BurgerIngredient  key={igKey + index} type={igKey}/>
        });
        
    })
    .reduce( (arr, el) =>{
        return arr.concat(el);
    }, [] );
  if (transformedIngredients.length === 0) {
      transformedIngredients = <p>Please start adding ingredients</p>
  }
  return (
    <div className="Burger">
      <BurgerIngredient type="bread-top"/>
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom"/>
    </div>
  );
};

export default Burger;
