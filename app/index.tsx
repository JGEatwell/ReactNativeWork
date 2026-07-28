import * as React from 'react';
import HomeScreen from './home';

// This file is the "/" route. It just renders HomeScreen as a component,
// separate from home.js's own "/home" route (see note in home.tsx).
export default function Index() {
  return <HomeScreen />;
}
