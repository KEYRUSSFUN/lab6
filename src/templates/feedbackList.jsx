import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFeedback } from "../reducers/feedback";
import { deleteFeedbackAsync } from "../reducers/feedback";

function FeedbackList() {

  const {feedbacks} = useSelector((state) => state.feedback);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeedback());
  }, [dispatch]);

  const onDelete = async (id) => { 
      try {
        await dispatch(deleteFeedbackAsync(id)).unwrap();
      } catch (error) {
        console.error("Ошибка при удалении:", error);
      }
  };

  return (
    <div>
      <br></br>
      <h3>Отзывы</h3>
      {feedbacks.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666' }}>
          Пока нет отзывов
        </p>
      ) : (
        feedbacks.map(feedback => (
          <div
            key={feedback.id}
            style={{
              backgroundColor:  '#f8f9fa',
              padding: '15px',
              marginBottom: '15px',
              borderRadius: '8px',
              border: `1px solid ${ '#ddd'}`
            }}
          >
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              marginBottom: '10px'
            }}>
              <strong style={{ color:  '#000' }}>
                {feedback.email}
              </strong>    
              <span style={{ color: '#666' }}>
                {feedback.date}
              </span>
            </div>
            <div style={{ marginBottom: '10px' }}>
              {feedback.message}
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              color:  '#666'
            }}>
            <button onClick={() => onDelete(feedback.id)}>удалить</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default FeedbackList; 