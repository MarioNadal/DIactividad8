import { useReducer} from 'react';
import classes from './Form.module.css';

function validate(state, action){
    if(action.type === 'emailValidate'){
        return{
            ...state,
            email:{
                value:action.payload,
                isValid:((action.payload).includes('@'))
            }
        };
    }
    if(action.type === 'passwordValidate'){
        return{
            ...state,
            password:{
                value:action.payload,
                isValid:((action.payload).trim().length > 7)
            }
        };
    }
    return state;
}

const initalFormState = {
    email:{
        value:" ",
        isValid:false
    },
    password:{
        value:" ",
        isValid:false
    }
}

function Form() {
    const [FormState, dispatch] = useReducer(validate,initalFormState);
    const formIsValid = FormState.email.isValid && FormState.password.isValid;

    function submitFormHandler(event) {
        if (!formIsValid) {
            alert('Invalid form inputs!');
            return;
        }else{
            alert('¡Formulario enviado!')
        }
    }

    return (
        <form className={classes.form} onSubmit={submitFormHandler}>
            <div className={classes.control}>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" onChange={(e)=>{dispatch({ type: 'emailValidate', payload: e.target.value})}} />
            </div>
            <div className={classes.control}>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" onChange={(e)=>{dispatch({ type: 'passwordValidate', payload: e.target.value})}} />
            </div>
            <button>Submit</button>
        </form>
    );
}
export default Form;