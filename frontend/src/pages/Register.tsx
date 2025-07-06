import { registerSchema } from '../../../shared/authValidation';
import styles from '../components/AuthForm/AuthForm.module.css';
import Loader from '../components/Loader/Loader';
import AuthLayout from '../layouts/AuthLayout/AuthLayout';
import { register } from '../services/auth';
import { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({
    email: '',
    username: '',
    password: '',
    passwordConfirmation: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    username: '',
    password: '',
    passwordConfirmation: '',
    backend: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const parsed = registerSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors = {
        email: '',
        username: '',
        password: '',
        passwordConfirmation: '',
        backend: ''
      };

      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as 'email' | 'username' | 'password' | 'passwordConfirmation';
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }

      setIsSubmitting(false);
      setErrors(fieldErrors);
      return;
    }

    try {
      await register(form.email, form.username, form.password, form.passwordConfirmation);
      setErrors({ email: '', username: '', password: '', passwordConfirmation: '', backend: '' });
      navigate('/');
    } catch (err: any) {
      setErrors({ email: '', username: '', password: '', passwordConfirmation: '', backend: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <form noValidate onSubmit={handleSubmit}>
        <div className={styles.header}>Register</div>
        <div className={styles.inputContainer}>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            name='email'
            type='email'
            autoFocus
            value={form.email}
            onChange={handleChange}
            autoComplete='off'
          />
          {errors.email && <div className={styles.error}>{errors.email}</div>}
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor='username'>Username</label>
          <input
            id='username'
            name='username'
            value={form.username}
            onChange={handleChange}
            autoComplete='off'
          />
          {errors.username && <div className={styles.error}>{errors.username}</div>}
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            name='password'
            type='password'
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <div className={styles.error}>{errors.password}</div>}
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor='password-confirmation'>Confirm Password</label>
          <input
            id='password-confirmation'
            name='passwordConfirmation'
            type='password'
            value={form.passwordConfirmation}
            onChange={handleChange}
          />
          {errors.passwordConfirmation && <div className={styles.error}>{errors.passwordConfirmation}</div>}
        </div>
        <button
          className={styles.submit}
          type='submit'
          disabled={isSubmitting}
        >
          {isSubmitting ? <Loader theme='dark' /> : 'Sign up'}
        </button>
        {errors.backend && <div className={styles.backendError}>{errors.backend}</div>}
        <div className={styles.redirectWrapper}>
          Have an account?
          <Link className={styles.redirect} to='/login'>
            Log in
          </Link>
        </div>
      </form>
    </AuthLayout>
  )
}

export default Register;