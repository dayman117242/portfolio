import logo from './logo.svg';
import React from 'react';
import { useState } from 'react';
import './App.css';

const element = <h1> Hello, Za Warudo</h1>

function App() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [count, setCount] = useState(0);

  const upCount = () => {
    setCount(count + 1)

  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
    }}>
      <h1>How Much I Owe in Child Support: ${count}</h1>
      <button onClick = {upCount}>One Up</button>
      <h2>Survey:</h2>
      <ShortInput placeholder="Name" value={name} onChange={setName}/>
      <ShortInput placeholder="Phone" value={phone} onChange={setPhone}/>
      <ShortInput placeholder="Email" value={email} onChange={setEmail}/>
      <AnswerComponent answer={name} label="Name"/>
      <AnswerComponent answer={phone} label="Phone"/>
      <AnswerComponent answer={email} label="Email"/>
      <h3>Insert Copypasta Here:</h3>
      <textarea></textarea>
      <ShortQuestionComponent question="What is your name?" AnswerBinding={setName}/>
      <QuestionComponent question="Ain't you Nathaniel B?"/>
      <QuestionComponent question="Is there a lore reason?"/>
      <QuestionComponent question="Is he stupid?"/>
    </div>
  );
}

function ShortInput(props) {

  return(
    <input 
      type="text"
      placeholder={props.placeholder}
      value={props.name}
      onChange={(event) => {
        props.onChange(event.target.value);
      }}></input>
  );
}

function QuestionComponent(props) {

  return(
  <div>
    <h4>{props.question}</h4>
    <textarea></textarea>
  </div>
  )
}

function ShortQuestionComponent(props) {

  return(
  <div>
    <h4>{props.question}</h4>
    <input type="text" onChange={(event) => {props.AnswerBinding(event.target.value)}}/>
  </div>
  )
}

function AnswerComponent(props) {

return(
<div>
  <h3>{props.label}</h3>
  {props.answer}
</div>
)
}

export default App;
