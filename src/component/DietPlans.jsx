import React, { useState, useEffect } from 'react';

const DietPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/diet-plans?filters[users_permissions_users][id][$eq]=1&populate[0]=users_permissions_users&populate[1]=Breakfast&populate[2]=Lunch&populate[3]=Snacks&populate[4]=Dinner');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        if (!result || !result.data || result.data.length === 0) {
          throw new Error('No data found');
        }
        const planData = result.data.map(plan => ({
          breakfast: {
            TillDate: plan.attributes.Breakfast.TillDate,
            WriteDiet: plan.attributes.Breakfast.WriteDiet
          },
          lunch: {
            TillDate: plan.attributes.Lunch.TillDate,
            WriteDiet: plan.attributes.Lunch.WriteDiet
          },
          snacks: {
            TillDate: plan.attributes.Snacks.TillDate,
            WriteDiet: plan.attributes.Snacks.WriteDiet
          },
          dinner: {
            TillDate: plan.attributes.Dinner.TillDate,
            WriteDiet: plan.attributes.Dinner.WriteDiet
          }
        }));
        setPlans(planData);
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
      <h1 style={{color:'red'}}>Diet Plans</h1>
      {plans.map((plan, index) => (
        <div key={index}>
          <h2>Plan {index + 1}</h2>
          <div>
            <h3>Breakfast</h3>
            <p><strong>Till Date:</strong> {plan.breakfast.TillDate}</p>
            <div dangerouslySetInnerHTML={{__html: plan.breakfast.WriteDiet}}></div>
          </div>
          <div>
            <h3>Lunch</h3>
            <p><strong>Till Date:</strong> {plan.lunch.TillDate}</p>
            <div dangerouslySetInnerHTML={{__html: plan.lunch.WriteDiet}}></div>
          </div>
          <div>
            <h3>Snacks</h3>
            <p><strong>Till Date:</strong> {plan.snacks.TillDate}</p>
            <div dangerouslySetInnerHTML={{__html: plan.snacks.WriteDiet}}></div>
          </div>
          <div>
            <h3>Dinner</h3>
            <p><strong>Till Date:</strong> {plan.dinner.TillDate}</p>
            <div dangerouslySetInnerHTML={{__html: plan.dinner.WriteDiet}}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DietPlans;
