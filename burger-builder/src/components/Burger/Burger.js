import React from 'react';

import classes from './burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

  // Object.keys() translates object of keys to an array
  // mapping the JS object into an array of the keys

  // const transformedIngredients = Object.keys(props.ingredients)
  //   .map(igKey => {
  //     return [...Array(props.ingredients[igKey])].map((_, i) => {
  //       <BurgerIngredient key={igKey+i} type={igKey} ></BurgerIngredient>
  //     });
  //   });

  const ingredients = [];
 
  for (const ingredient in props.ingredients) {
    if (props.ingredients.hasOwnProperty(ingredient)) {
      const amountOfSameIngredients = props.ingredients[ingredient];
 
      for (let i = 0; i < amountOfSameIngredients; i++) {
        ingredients.push(
          <BurgerIngredient 
            key={ingredient + i} 
            type={ingredient} 
          />);
      }
    }
  }

  if (ingredients.length === 0) {
    ingredients.push(
      <p key="addIngredientMessage">Please start adding ingredients!</p>
    );
  } 

  return (
    <div className={classes.Burger}>
      <BurgerIngredient key="bread-top" type="bread-top"></BurgerIngredient>
      {ingredients}
      <BurgerIngredient key="bread-bottom" type="bread-bottom"></BurgerIngredient>
    </div>
  );
}

 export default burger;