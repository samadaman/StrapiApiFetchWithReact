import React, { useState, useEffect } from 'react';

const WorkoutPlans = () => {
  const [planData, setPlanData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/workout-plans?pagination[withCount]=true&populate=*');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        if (!result || !result.data || !result.data[0].attributes) {
          throw new Error('Invalid response format');
        }
        const daysData = Object.keys(result.data[0].attributes)
          .filter(key => key.startsWith('Day'))
          .map(dayKey => ({
            day: dayKey,
            exerciseName: result.data[0].attributes[dayKey].ExerciseName,
            writeExercise: result.data[0].attributes[dayKey].WriteExercises
          }));
        setPlanData(daysData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount.

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 style={{color:'red'}}>Workout Plans</h1>
      {planData.map((dayData, index) => (
        <div key={index}>
          <h2>{dayData.day}</h2>
          <p><strong>Exercise Name:</strong> {dayData.exerciseName}</p>
          <div>
            <strong>Write Exercise:</strong>
            <ul dangerouslySetInnerHTML={{__html: dayData.writeExercise}}></ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkoutPlans;
