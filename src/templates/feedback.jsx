import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { FaPhone } from 'react-icons/fa';
import '../Feedback.css';
import FeedbackList from './feedbackList';
import { useDispatch } from 'react-redux';
import { createFeedbackAsync } from '../reducers/feedback';

const FeedbackForm = () => {

  const [isOpen, setIsOpen] = useState(false); 

  const toggleForm = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const dispatch = useDispatch();

  const onSubmit = async (data) => { 
      try {
        await dispatch(createFeedbackAsync({email : data.email, message: data.message, date: new Date().toLocaleDateString() + ''})).unwrap();
        reset();
      } catch (error) {
        console.error("Ошибка при отправке:", error);
      }
  };

  return (
    <>
      <div className='FeedbackButton' onClick={toggleForm}>
        <FaPhone size={20} />
      </div>

      <div className={`FeedbackFormContainer ${isOpen ? ('active') : ('')}`}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input className='FormInput'
            type="email"
            placeholder="Email"
            {...register('email', { 
              required: 'Email обязателен',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Неверный формат email'
              }
             })}
          />
          {errors?.email && <span style={{display: 'block', color: 'red', marginBottom: '10px'}}>{errors.email.message}</span>}
          <textarea className='FormTextArea' placeholder="Ваш отзыв" rows="4"
            {...register("message", {
              required: "Отзыв обязателен",
              minLength:{
              value: 3,
              message: "Отзыв должен содержать не менее 3 символов"
              }
              })}
          />
          {errors?.message && <span style={{display: 'block', color: 'red', marginBottom: '10px'}}>{errors.message.message}</span>}
          <button className='FormButton' type="submit">Отправить</button>
        </form>
        <FeedbackList ></FeedbackList>
      </div>
    </>
  );
};

export default FeedbackForm;