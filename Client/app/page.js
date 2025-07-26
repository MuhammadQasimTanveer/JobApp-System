"use client"
import { submitAction } from "../../Server/submitForm";
import { useState, useEffect } from "react";
import { useFormStatus } from 'react-dom';
import { useActionState } from 'react';
import styles from "./page.module.css";
import toast from 'react-hot-toast';

export default function Home() {

  const [formData,setFormData] = useState({ Fullname: "", Email: "", Phone: "", Position: "", ExpYears: "" });

  const TOAST_ID = 'form-toast';

  const { pending } = useFormStatus();

  /* useFormStatus() is a built-in hook.
  pending is boolean property from useFormStatus() that becomes true while the form is submitting 
  and false when it's done.*/

  const [state, formAction] = useActionState(submitAction, { message: "", success: null });
  useEffect(() => {
    
    if (state.success === true) {
      toast.success(state.message, {id: TOAST_ID, duration: 2000 });
      setFormData({ Fullname: "", Email: "", Phone: "", Position: "", ExpYears: "" });
    } 
    else if (state.success === false) {
      toast.error(state.message, { id: TOAST_ID, duration: 2000 });
    }
  }, [state]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.homepage}>

      <h1> JOB Registration Form </h1>

      <div className={styles.formContainer}>
        <form action={formAction}>

          <label className={styles.lbl} htmlFor="Fullname"> Full Name: </label>
          <input className={styles.input} id="Fullname" name="Fullname" type="text" value={formData.Fullname} onChange={handleChange} required/> 

          <label className={styles.lbl} htmlFor="email"> Email: </label>
          <input className={styles.input} id="email" name="Email" type="email" value={formData.Email} onChange={handleChange} required/>

          <label className={styles.lbl} htmlFor="phone"> Phone No: </label>
          <input className={styles.input} id="phone" name="Phone" type="tel" pattern="[0-9]{10,12}" title="Enter a phone number with 10 to 12 digits" value={formData.Phone} onChange={handleChange} required/>

          <label className={styles.lbl} htmlFor="position"> Position Applied: </label>
          <input className={styles.input} id="position" name="Position" type="text" value={formData.Position} onChange={handleChange} required/>

          <label className={styles.lbl} htmlFor="experience"> Exp Years: </label>
          <input className={styles.input} id="experience" name="ExpYears" type="number" min="0" max="30" value={formData.ExpYears} onChange={handleChange} required/>

          <button type="submit" disabled={pending} className={styles.btn}> 
            {pending ? "Registering..." : "Register"}
          </button>
        </form>

      </div>

    </div>
  );
}