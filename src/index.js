import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import BodyBuildingPlans from './component/BodyBuildingPlan';
import PowerLiftingPlans from './component/PowerLiftingPlans';
import ConsultationTimings from './component/ConsultationTimings';
import DietPlans from './component/DietPlans';
import WorkoutPlans from './component/WorkoutPlans';
import UserSheduling from './component/UserSheduling';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PowerLiftingPlans />
    <BodyBuildingPlans />
    <ConsultationTimings />
    <DietPlans />
    <WorkoutPlans />
    <UserSheduling />
  </React.StrictMode>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
