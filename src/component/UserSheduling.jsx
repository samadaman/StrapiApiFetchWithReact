import React, { useEffect, useState } from 'react';

const ConsultationData = () => {
  const [consultations, setConsultations] = useState([]);
  const [bookedTimes, setBookedTimes] = useState({});

  useEffect(() => {
    fetchConsultationData();
  }, []);

  const fetchConsultationData = async () => {
    const response = await fetch('http://localhost:1337/api/user-selected-timings?pagination%5BwithCount%5D=true&populate=%2A'); // Replace 'API_ENDPOINT' with your actual endpoint
    const data = await response.json();
    setConsultations(data.data);
  };

  const handleButtonClick = (id, dateTime) => {
    setBookedTimes((prev) => ({ ...prev, [id]: true }));
    console.log(dateTime);
  };

  return (
    <div>
      {consultations.map((consultation) => {
        const { id, attributes } = consultation;
        const dateAndTime = new Date(attributes.DateAndTime.SelectedForUsers);
        const formattedDate = dateAndTime.toLocaleDateString();
        const formattedTime = dateAndTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        return (
          <div key={id}>
            <h1 style={{ color: 'red' }}>Consultation {id}</h1>
            <button onClick={() => handleButtonClick(id, dateAndTime)} disabled={bookedTimes[id]}>
              {bookedTimes[id] ? 'Booked' : `${formattedDate} ${formattedTime}`}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ConsultationData;
