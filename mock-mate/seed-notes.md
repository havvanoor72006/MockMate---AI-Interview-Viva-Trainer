# MockMate – Database Seed Notes

## Week 1 – Day 3

Seed data was inserted into Supabase for two demo users:

- Aarav Sharma – Frontend Developer (React)
- Diya Patel – DBMS Viva

## Expected database records

- Profiles: 2
- Sessions: 2
- Questions: 7
- Evaluations: 4

## Purpose

This demo data is used to test session history, questions,
answers, evaluations, and dashboard features.

## Complete SQL Seed Script

begin;

-- 1. Create demo profiles using Supabase Auth user IDs

insert into public.profiles (id, name, target_role, college)
select id, 'Aarav Sharma', 'Frontend Developer (React)', 'VJTI Mumbai'
from auth.users
where email = 'aarav.demo@example.com';

insert into public.profiles (id, name, target_role, college)
select id, 'Diya Patel', 'DBMS Viva', null
from auth.users
where email = 'diya.demo@example.com';


-- 2. Aarav's completed interview session

insert into public.sessions
(id, user_id, title, track, topics, difficulty, question_count, status, overall_score, created_at, completed_at)
values (
  'd0000000-0000-4000-8000-0000000000b1',
  (select id from public.profiles where name = 'Aarav Sharma'),
  'Frontend Developer (React) practice session',
  'Frontend Developer (React)',
  'React, Hooks, Routing',
  'medium',
  4,
  'completed',
  7,
  now() - interval '3 days',
  now() - interval '3 days' + interval '25 minutes'
);


-- 3. Aarav's four questions

insert into public.questions
(id, session_id, order_no, topic, difficulty, prompt, ideal_points, answer_text, answered_at, created_at)
values
(
  'd0000000-0000-4000-8000-0000000000c1',
  'd0000000-0000-4000-8000-0000000000b1',
  1, 'React', 'medium',
  'What is the difference between state and props in React?',
  'Props are read-only inputs passed from parent to child components. State is internal, managed by the component, and changes trigger re-rendering.',
  'Props are passed from parent to child, while state is managed inside a component.',
  now() - interval '3 days' + interval '5 minutes',
  now() - interval '3 days'
),
(
  'd0000000-0000-4000-8000-0000000000c2',
  'd0000000-0000-4000-8000-0000000000b1',
  2, 'Hooks', 'medium',
  'Why do React Hooks start with the word use? Explain the two rules of Hooks.',
  'The use prefix allows React and lint tools to identify Hooks. Call Hooks only at the top level and only from React function components or custom Hooks.',
  'Hooks start with use. They should be called at the top level and inside React components.',
  now() - interval '3 days' + interval '10 minutes',
  now() - interval '3 days' + interval '5 minutes'
),
(
  'd0000000-0000-4000-8000-0000000000c3',
  'd0000000-0000-4000-8000-0000000000b1',
  3, 'Hooks', 'medium',
  'What is the dependency array in useEffect? What does an empty array mean?',
  'The dependency array controls when the effect runs. An empty array means the effect runs after the initial mount, with cleanup when the component unmounts.',
  'The dependency array decides when useEffect runs. An empty array means it runs once after the component mounts.',
  now() - interval '3 days' + interval '15 minutes',
  now() - interval '3 days' + interval '10 minutes'
),
(
  'd0000000-0000-4000-8000-0000000000c4',
  'd0000000-0000-4000-8000-0000000000b1',
  4, 'Routing', 'medium',
  'How does React Router handle navigation to a route such as /session/42?',
  'React Router matches the URL to a route definition. A dynamic route parameter can be read using useParams.',
  'It checks the URL and opens the matching component. The number 42 can be read as a route parameter.',
  now() - interval '3 days' + interval '20 minutes',
  now() - interval '3 days' + interval '15 minutes'
);


-- 4. Aarav's four evaluations

insert into public.evaluations
(id, question_id, score, strengths, improvements, model_answer, created_at)
values
(
  'd0000000-0000-4000-8000-0000000000d1',
  'd0000000-0000-4000-8000-0000000000c1',
  8,
  'Correctly identified the main distinction between props and state.',
  'Mention that props are read-only and state updates trigger re-rendering.',
  'Props are read-only values passed from a parent component. State is managed internally and updated using state setters.',
  now() - interval '3 days' + interval '6 minutes'
),
(
  'd0000000-0000-4000-8000-0000000000d2',
  'd0000000-0000-4000-8000-0000000000c2',
  7,
  'Understood the purpose and basic rules of Hooks.',
  'Explain both rules more precisely and mention custom Hooks.',
  'Hooks must be called at the top level and only from React function components or custom Hooks.',
  now() - interval '3 days' + interval '11 minutes'
),
(
  'd0000000-0000-4000-8000-0000000000d3',
  'd0000000-0000-4000-8000-0000000000c3',
  6,
  'Identified the role of the dependency array.',
  'Clarify how dependencies control reruns and how cleanup works.',
  'The dependency array determines when an effect reruns. An empty array runs the effect after initial mount and cleanup on unmount.',
  now() - interval '3 days' + interval '16 minutes'
),
(
  'd0000000-0000-4000-8000-0000000000d4',
  'd0000000-0000-4000-8000-0000000000c4',
  7,
  'Recognized that React Router matches URLs to components.',
  'Mention dynamic route parameters and useParams.',
  'React Router matches the current URL to a route. Dynamic segments such as :id can be accessed using useParams.',
  now() - interval '3 days' + interval '21 minutes'
);


-- 5. Diya's active DBMS Viva session

insert into public.sessions
(id, user_id, title, track, topics, difficulty, question_count, status, overall_score, created_at, completed_at)
values (
  'd0000000-0000-4000-8000-0000000000b2',
  (select id from public.profiles where name = 'Diya Patel'),
  'DBMS Viva practice session',
  'DBMS Viva',
  'Normalization, Joins',
  'easy',
  3,
  'active',
  null,
  now() - interval '1 hour',
  null
);


-- 6. Diya's three questions (one answered, two unanswered)

insert into public.questions
(id, session_id, order_no, topic, difficulty, prompt, ideal_points, answer_text, answered_at, created_at)
values
(
  'd0000000-0000-4000-8000-0000000000c5',
  'd0000000-0000-4000-8000-0000000000b2',
  1, 'Normalization', 'easy',
  'What is database normalization?',
  'Normalization organizes database tables to reduce redundancy and improve data integrity.',
  'Normalization is the process of organizing data to reduce duplication.',
  now() - interval '50 minutes',
  now() - interval '1 hour'
),
(
  'd0000000-0000-4000-8000-0000000000c6',
  'd0000000-0000-4000-8000-0000000000b2',
  2, 'Joins', 'easy',
  'What is an INNER JOIN in SQL?',
  'An INNER JOIN returns rows with matching values in both tables.',
  null,
  null,
  now() - interval '45 minutes'
),
(
  'd0000000-0000-4000-8000-0000000000c7',
  'd0000000-0000-4000-8000-0000000000b2',
  3, 'Joins', 'easy',
  'What is the difference between LEFT JOIN and RIGHT JOIN?',
  'LEFT JOIN returns all rows from the left table and matching rows from the right. RIGHT JOIN returns all rows from the right table and matching rows from the left.',
  null,
  null,
  now() - interval '40 minutes'
);

commit;
