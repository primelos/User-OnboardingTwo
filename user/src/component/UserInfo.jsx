import React, {useState, useEffect} from 'react'
import * as Yup from 'yup';
import { withFormik, Form, Field, ErrorMessage} from 'formik';
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
                    <Field  type='text' name='name' placeholder='enter name' />
                    {touched.name && errors.name && (<p className='error'>{errors.name}</p>)}
                </label>
                <label className='email'>
                    <Field type='text' name='email' placeholder='enter email' />
                    {touched.email && errors.email && (<p className='error'>{errors.email}</p>)}
                </label>
                <label className="password">
                    <Field type='password' name='password' placeholder='enterpassword' />
                    {touched.password && errors.email && (<p className='error'>{errors.password}</p>)}
                </label>
                <button className='button' type='submit'>Send</button>
            </Form>
        </div>
    )
}
const FormikUserInfo = withFormik({
    mapPropsToStatus({}){
        return{

        }
    },
    validationSchema: Yup.object().shape({

    }),
    handleSubmit(values, {setStatus}){
        axios.post('')
    }
})(UserInfo)
export default FormikUserInfo;
