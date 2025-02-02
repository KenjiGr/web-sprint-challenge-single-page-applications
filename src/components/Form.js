import React, {useState} from "react";
import * as yup from 'yup';
import axios from "axios";

const yupForm = yup.object().shape({
    name: yup.string().required("name must be at least 2 characters"),
    size: yup.string().required("Size must be selected."),
    special: yup.string(),
    pepperoni: yup.boolean().oneOf([true]),
    sausage: yup.boolean().oneOf([true]),
    ham: yup.boolean().oneOf([true]),
    bacon: yup.boolean().oneOf([true]),
    pineapple: yup.boolean().oneOf([true]),
    mushroom: yup.boolean().oneOf([true]),
    greenPepper: yup.boolean().oneOf([true]),
    jalapeno: yup.boolean().oneOf([true]),
    instructions: yup.string(),
})

function Form() {

    const [form, setForm] = useState(
      {
        name: "",
        size: "",
        special: "",
        pepperoni: false,
        sausage: false,
        ham: false,
        bacon: false,
        pineapple: false,
        mushroom: false,
        greenPepper: false,
        jalapeno: false,
        instructions: "",
    });

    const [errorState, setErrorState] = useState({
        name: "",
        size: "",
        special: "",
        pepperoni: "",
        sausage: "",
        ham: "",
        bacon: "",
        pineapple: "",
        mushroom: "",
        greenPepper: "",
        jalapeno: "",
        instructions: "",
    });

    const validate = (e) => {
        yup.reach(yupForm, e.target.name)
        .validate(e.target.value)
        .then( valid => {
           setErrorState({
             ...errorState,
             [e.target.name]: ""
           })
        })
        .catch(error => {
          console.log(error.errors)
          setErrorState({
            ...errorState,
            [e.target.name]: error.errors[0]
          })
        })
    };

    const inputChange = e => {
        e.persist
        (validate(e))
        let value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setForm({...form, [e.target.name]: value });
      };
      
      const formSubmit = (e) => {
        e.preventDefault();
        axios.post('https://reqres.in/api/orders', form)
        .then(res => console.log(res))
        .catch(err => console.log(err));
      };

      return(
        <div className="pizzaForm">
          <h1>Order Here</h1>
      <form onSubmit={formSubmit} id='pizza-form'>
        <p><label htmlFor="name">Name
        <input 
        id="name-input" 
        name="name"
        type="text" 
        placeholder="Name" 
        value={form.name} 
        onChange={inputChange} 
        />
        {errorState.name.length > 1 ? <p className="error">{errorState.name}</p> : null}
        </label></p>
      
        <p><label htmlFor="sauce">Sauce Select</label>
        <input id="sauce" type="radio" value="Tomato" name="sauce" /> Tomato
        <input id="sauce" type="radio" value="Garlic Ranch" name="sauce" /> Garlic Ranch
        <input id="sauce" type="radio" value="Alfredo" name="sauce" /> Alfredo
        </p>
        <p><label htmlFor="size-dropdown">Size Select</label>
        <select id="size-dropdown" name="size" value={form.size} onChange={inputChange}>
            <option>---Pick One---</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
            <option value="Extra Large">Extra Large</option>
        </select>
    </p>
    <label htmlFor="toppings">Choose Your Toppings Below:</label>
    <p id='toppingsCont'>
    <input 
    id="toppings" type="checkbox" checked={form.pepperoni} 
    onChange={inputChange} name="pepperoni" 
    />Pepperoni
    <input id="toppings" type="checkbox" checked={form.sausage} 
    onChange={inputChange} name="sausage" 
    />Sausage
    <input id="toppings" type="checkbox" checked={form.ham} 
    onChange={inputChange} name="ham" 
    />Ham
    <input id="toppings" type="checkbox" checked={form.bacon} 
    onChange={inputChange} name="bacon" 
    />Bacon
    </p>
    <p>
        <input id="toppings" type="checkbox" checked={form.pineapple} 
        onChange={inputChange} name="pineapple" 
        />Pineapple
        <input id="toppings" type="checkbox" checked={form.mushroom} 
        onChange={inputChange} name="mushroom" 
        />Mushroom
        <input id="toppings" type="checkbox" checked={form.greenPepper} 
        onChange={inputChange} name="greenPepper" 
        />Green Peppers
        <input id="toppings" type="checkbox" checked={form.jalapeno} 
        onChange={inputChange} name="jalapeno" 
        />Jalapeno
    </p>
    <p >
    <label htmlFor="instructions">Special Requests?</label>
    <textarea 
    name="instructions"
    id="special-request"
    placeholder="Instructions"
    value={form.instructions}
    onChange={inputChange}
    /></p>
    <button className="submit" id='order-button'>Order</button>
    </form>
    </div>
    );
    }

export default Form;