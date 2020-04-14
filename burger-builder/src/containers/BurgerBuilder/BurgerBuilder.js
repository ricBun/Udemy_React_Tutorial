import React, { Component } from "react";

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchaseable: false,
    buying: false
  }

  updatePurchaseState (ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({purchaseable: sum > 0});
  }

  purchaseHandler = () => {
    this.setState({buying: true});
  }

  purchaseCancelHandler = () => {
    this.setState({buying: false});
  }

  purchaseContinueHandler = () => {
    alert('You Continue!');
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;

    // update price
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount > 0) {
      const newCount = oldCount - 1;
      const updatedIngredients = {
        ...this.state.ingredients
      }
      updatedIngredients[type] = newCount;

      // update price
      const priceToSubtract = INGREDIENT_PRICES[type];
      const newPrice = this.state.totalPrice - priceToSubtract; 

      this.setState({totalPrice: newPrice, ingredients:updatedIngredients});
      this.updatePurchaseState(updatedIngredients);
    }
    
  }
  render () {

    const disabledInfo = {
      ...this.state.ingredients
    }

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    const ingredients = {
      ...this.state.ingredients
    };

    // return some JSX code
    return (
      <Aux>
        <Modal 
          show={this.state.buying} 
          modalClosed={this.purchaseCancelHandler}>
            <OrderSummary 
              ingredients={this.state.ingredients}
              purchaseCancelled={this.purchaseCancelHandler}
              purchaseContinued={this.purchaseContinueHandler}
              price={this.state.totalPrice}
              >
            </OrderSummary>
        </Modal>
        <Burger ingredients={this.state.ingredients}></Burger>
        <BuildControls
          ingredientAdded={this.addIngredientHandler} 
          ingredientRemoved={this.removeIngredientHandler} 
          disabled={disabledInfo} 
          price={this.state.totalPrice} 
          purchaseble={this.state.purchaseable}
          ordered={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;