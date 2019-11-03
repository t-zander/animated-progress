import React, {useState, useEffect} from "react";
import "./App.css";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Animate } from "react-move";
import { easeQuadInOut } from "d3-ease";

const AnimatedProgressProvider = (props) => {
  const [isAnimated, setAnimated] = useState(false)
  
  useEffect(() => {
    setAnimated(!isAnimated)
  }, [])
  
  return (
    <Animate
      start={() => ({
        value: props.valueStart
      })}
      update={() => ({
        value: [
          isAnimated ? props.valueEnd : props.valueStart
        ],
        timing: {
          duration: props.duration * 1000,
          ease: props.easingFunction
        }
      })}
    >
      {({ value }) => props.children(value)}
    </Animate>
  );
}

function App() {
  const [progress, setProgress] = useState(0)

  React.useEffect(() => {
    setProgress(50)
  }, [])

  return (
    <div className="App">
      <div style={{width: 200, height: 200}}>
      <AnimatedProgressProvider
        valueStart={0}
        valueEnd={66}
        duration={1.4}
        easingFunction={easeQuadInOut}
      >
        {value => {
          const roundedValue = Math.round(value);
          return (
            <CircularProgressbar
              value={value}
              text={`${roundedValue}%`}
              styles={buildStyles({ pathTransition: "none", pathColor: '#349beb', trailColor: '#34eb65' })}
            />
          );
        }}
      </AnimatedProgressProvider>
      </div>
    </div>
  );
}

export default App;

/* 

<svg width="300" height="300">
        <circle
          stroke="#4080db"
          fill="none"
          strokeWidth={12}
          cx={150}
          cy={150}
          r={80}
        />
        <circle
          stroke="#58e061"
          fill="none"
          strokeWidth={12}
          cx={150}
          cy={150}
          r={80}
          transform={`rotate(-90 150 150)`}
          style={{
            strokeDasharray: 80 * 2 * Math.PI,
            strokeDashoffset: 80 * 2 * Math.PI - 80 * 2 * Math.PI * 0.6,
            strokeLinecap: "round",
            strokeLinejoin: 'round',
          }}
        />
        <text
          className="circle-text"
          x="50%"
          y="50%"
          dy=".3em"
          textAnchor="middle">
          60%
        </text>
      </svg>
*/