import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoMySql from './TodoMySql';
import AuthorMySql from './AuthorMySql';

function App() {
    return (
        <div className="App">
            <AuthorMySql />
        </div>
    );
}
export default App;
