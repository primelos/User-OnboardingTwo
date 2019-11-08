import React, {useState, useEffect} from 'react'
import * as Yup from 'yup';
import { withFormik, Form, Field} from 'formik';
import axios from 'axios';



const UserInfo = ({values, touched, errors, status}) => {
    const [employee, setEmployee] = useState([])
    useEffect(() => {
        status && setEmployee (employee => [...employee, status]);
    }, [status]);

    return(
        <div>
            <Form>

                <label className='name'>
                    Name:
                    <Field  type='text' name='name' placeholder='enter name' />
                    {touched.name && errors.name && (<p className='error'>{errors.name}</p>)}
                </label>

                <label className='email'>
                    Email:
                    <Field type='text' name='email' placeholder='enter email' />
                    {touched.email && errors.email && (<p className='error'>{errors.email}</p>)}
                </label>

                <label className="password">
                    Password:
                    <Field type='password' name='password' placeholder='enterpassword' />
                    {touched.password && errors.email && (<p className='error'>{errors.password}</p>)}
                </label>

                <label className='checkbox'>
                    Terms & Conditions
                    <Field type='checkbox' name='terms' checked={values.terms} />
                </label>
                
                <button className='button' type='submit'>Send</button>

            </Form>
            {employee.map(i => (
                <ul key={i.id}>
                    <li>Name: {i.name}</li>
                    <li>Email: {i.email}</li>
                </ul>
            ))}
        </div>
    )
}
const FormikUserInfo = withFormik({
    mapPropsToValues({name, email, password, terms}){
        return{
            name: name || '',
            email: email || '',
            password: password || '',
            terms: terms || true
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required()
    }),
    handleSubmit(values, {setStatus}){
        axios.post('https://reqres.in/api/users', values)
        .then(res => {
            setStatus(res.data)
        })
        .catch(error =>{
            console.log(`down`, error.reponse)
        })
    }
})(UserInfo)
export default FormikUserInfo;
