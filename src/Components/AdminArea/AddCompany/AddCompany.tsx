import "./AddCompany.css";
import { Button, FormControl, FormLabel, TextField } from "@mui/material";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import errorHandler from "../../../Utils/ErrorHandler";
import {useNavigate} from "react-router-dom";
import adminService from "../../../Services/AdminService";
import Company from "../../../Models/Company";


function AddCompany(): JSX.Element {

    const navigate = useNavigate();
    const {register, handleSubmit, setError, formState:{errors} } = useForm<Company>({mode:"onChange"});

    function sendForm(comp:Company) {
        adminService.addCompany(comp)
            .then(t => {
                toast.success("Company added! ");navigate("/admin/getcompanies")})
            .catch(err => errorHandler.showError(err))
    }

    const handleBlur = (field: keyof Company) => (e: React.FocusEvent<HTMLInputElement>) => {
        if (!e.target.value) {
            setError(field, { type: 'manual' });
        }
    };
    return (
        <div className="AddCompany">
            <FormControl>
                <FormLabel>New Company</FormLabel>
                <TextField 
                        variant="outlined"
                        label="Name" 
                        id="name"
                        {...register('name', { required: true, minLength: 2, maxLength: 15 })}
                        onBlur={handleBlur('name')}
                        error={!!errors.name}
                        helperText={errors.name ? "Name must be at least 2 characters long" : ""}
                />
                <TextField 
                        variant="outlined"
                        label="Email" 
                        id="email"
                        {...register('email', { required: true, minLength: 2, maxLength: 100 })}
                        onBlur={handleBlur('email')}
                        error={!!errors.email}
                        helperText={errors.email ? "Email must be at least 2 characters long" : ""}
                />
                <TextField  
                        variant="outlined" 
                        type="Password"
                        label="Password" 
                        id="password"
                        {...register('password', { required: true, minLength: 4, maxLength: 15 })}
                        onBlur={handleBlur('password')}
                        error={!!errors.password}
                        helperText={errors.password ? "Password must be at least 4 characters long" : ""}

                />
                <Button variant="outlined" onClick={handleSubmit(sendForm)}>Add</Button>
            </FormControl>
        </div>
    );
}


export default AddCompany;
