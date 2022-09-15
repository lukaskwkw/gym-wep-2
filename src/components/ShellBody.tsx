import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from "./routes/Home";
import { Login } from "./routes/Login";
import { NoMatch } from "./routes/NoMatch";
import { CreatePlan } from './routes/plans/CreatePlan';
import { EditPlan } from './routes/plans/EditPlan';
import { EditWorkoutDay } from './routes/plans/EditWorkoutDay';
import { NewWorkoutDay } from './routes/plans/NewWorkoutDay';
import { Plan } from './routes/plans/Plan';
import { PlanHistory } from './routes/plans/PlanHistory';
import { Plans } from './routes/plans/Plans';
import { PlansIndex } from './routes/plans/PlansIndex';
import { WorkoutDay } from './routes/plans/WorkoutDay';

export const ShellBody = () => {
  return <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/plans" element={<Plans />} >
      <Route path=":planId" element={<Plan />} />
      <Route path=":planId/:day" element={<WorkoutDay />} />
      <Route path=":planId/:day/edit" element={<EditWorkoutDay />} />
      <Route path=":planId/newDay" element={<NewWorkoutDay />} />
      <Route path=":planId/edit" element={<EditPlan />} />
      <Route path=":planId/history" element={<PlanHistory />} />
      <Route path="new" element={<CreatePlan />} />
      <Route index element={<PlansIndex />} />
    </Route>

    <Route path="/login" element={<Login />} />

    <Route path="*" element={<NoMatch />} />
  </Routes>;
}
