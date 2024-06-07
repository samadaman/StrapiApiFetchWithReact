import React, { useState, useEffect } from 'react';

const ConsultationTimings = () => {
  const [consultations, setConsultations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/cousulation-timings?pagination%5BwithCount%5D=true&populate=%2A');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        if (!result || !result.data || result.data.length === 0) {
          throw new Error('No data found');
        }
        const consultationsData = result.data.map(item => ({
          username: item.attributes.users_permissions_users.data[0].attributes.username,
          email: item.attributes.users_permissions_users.data[0].attributes.email,
          date: new Date(item.attributes.CounsulationTiming.DateAndTime).toLocaleDateString(),
          time: new Date(item.attributes.CounsulationTiming.DateAndTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
        }));
        setConsultations(consultationsData);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 style={{color: 'red'}}>Consultation Timing</h1>
      <ul>
        {consultations.map((consultation, index) => (
          <li key={index}>
            <strong>Username:</strong> {consultation.username}<br />
            <strong>Email:</strong> {consultation.email}<br />
            <strong>Date:</strong> {consultation.date}<br />
            <strong>Time:</strong> {consultation.time}<br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConsultationTimings;
