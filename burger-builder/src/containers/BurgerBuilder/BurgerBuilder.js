import React, { Component } from "react";

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {

  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    buying: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    axios.get('https://react-my-burger-19a6b.firebaseio.com/ingredients.json')
      .then(response => {
        let dbIngredients = response.data;
        // readjust price for initial burger toppings
        let sum = this.state.totalPrice;
        for (let ing in dbIngredients) {
          sum += dbIngredients[ing] * INGREDIENT_PRICES[ing];
        }
        
        this.setState({ingredients: dbIngredients, totalPrice: sum});
      })
      .catch(error => {
        this.setState({error: true});
      });
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
    this.setState({loading:true});
    const order =  {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Richard Bun',
        address: {
          street: 'test Street',
          zipCode: '43243',
          country: 'Canada',
          email: 'test@test.com'
        },
        deliveryMethod: 'fastest'
      }
    }

    axios.post('/orders.json', order)
      .then(response => {
        this.setState({loading: false, buying: false});
      })
      .catch(error => {
        console.log(error);
        this.setState({loading: false, buying: false});
      });
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
    
    // handle asynchronous purchase call (posting data to firebase)
    let orderSummary = null;

    if(this.state.loading) {
      orderSummary = <Spinner />;
    }

    // handle  asynchronous ingredients retrieval (from firebase)
    let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;



    if (this.state.ingredients) {
      burger = (
        <Aux>
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

      orderSummary = (
        <OrderSummary 
            ingredients={this.state.ingredients}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.state.totalPrice}
            >
        </OrderSummary>
      );
    }

    if(this.state.loading) {
      orderSummary = <Spinner />;
    }
    // return some JSX code
    return (
      <Aux>
        <Modal 
          show={this.state.buying} 
          modalClosed={this.purchaseCancelHandler}>
            {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);