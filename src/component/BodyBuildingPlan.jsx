import React, { useState, useEffect } from 'react';

const ExerciseList = () => {
  const [exerciseData, setExerciseData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/body-building-plans?pagination[withCount]=true&populate=*');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        if (!result || !result.data || result.data.length === 0) {
          throw new Error('No data found');
        }
        const extractedData = result.data.reduce((accumulator, item) => {
          const days = Object.keys(item.attributes).filter(key => key.startsWith('Day'));
          days.forEach(day => {
            accumulator.push({
              day,
              exerciseName: item.attributes[day].ExerciseName,
              writeExercise: item.attributes[day].WriteExercises.split('<li>').map((item, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
              ))
            });
          });
          return accumulator;
        }, []);
        setExerciseData(extractedData);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 style={{color: 'red'}}>Body Building Plans</h1>
      <ul>
        {exerciseData.map((exercise, index) => (
          <li key={index}>
            <strong>Day:</strong> {exercise.day}<br />
            <strong>Exercise Name:</strong> {exercise.exerciseName}<br />
            <strong>Write Exercise:</strong>
            <ul>{exercise.writeExercise}</ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExerciseList;
