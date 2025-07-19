import { loginSchema } from '../../../../shared/authValidation';
import styles from '../../components/AuthForm/AuthForm.module.css';
import Loader from '../../components/Loader/Loader';
import AuthLayout from '../../layouts/AuthLayout/AuthLayout';
import { login } from '../../services/auth';
import { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
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

    const parsed = loginSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors = { email: '', password: '', backend: '' };

      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as 'email' | 'password';
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }

      setIsSubmitting(false);
      setErrors(fieldErrors);
      return;
    }

    try {
      await login(form.email.trim(), form.password);
      setErrors({ email: '', password: '', backend: '' });
      navigate('/');
    } catch (err: any) {
      setErrors({ email: '', password: '', backend: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <form noValidate className={styles.login} onSubmit={handleSubmit}>
        <div className={styles.header}>Login</div>
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
        <button
          className={styles.submit}
          type='submit'
          disabled={isSubmitting}
        >
          {isSubmitting ? <Loader theme='dark' /> : 'Log in'}
        </button>
        {errors.backend && <div className={styles.backendError}>{errors.backend}</div>}
        <div className={styles.redirectWrapper}>
          Don't have an account?
          <Link className={styles.redirect} to='/register'>
            Sign up
          </Link>
        </div>
      </form>
    </AuthLayout>
  )
}

export default Login;