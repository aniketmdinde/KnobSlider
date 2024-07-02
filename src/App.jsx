import React, { useEffect, useRef, useCallback, useState } from 'react';
import gsap from 'gsap';
import './App.css';
import video1 from './assets/videos/video1.mp4';
import video2 from './assets/videos/video2.mp4';
import video3 from './assets/videos/video3.mp4';
import video4 from './assets/videos/video4.mp4';
import video5 from './assets/videos/video5.mp4';

function App() {
  const [active, setActive] = useState(2);
  const circleRef = useRef(null);
  const secDivsRef = useRef([]);
  const panelRef = useRef(null);
  const videoURLs = [
    video1,
    video2,
    video3,
    video4,
    video5
  ];

  const greyOut = useCallback(() => {
    gsap.to(secDivsRef.current, {
      opacity: 0.5,
      duration: 0.5,
      ease: 'power1.inOut',
      fontSize: '16px',
    });
    gsap.to(panelRef.current, {
      opacity: 0.2,
      duration: 0.5,
    });
  }, []);

  const handleMouseEnter = () => {
    gsap.to(panelRef.current, {
      opacity: 0.2,
      duration: 0.5,
    });
  };
  
  const handleMouseLeave = () => {
    gsap.to(panelRef.current, {
      opacity: 0.6,
      duration: 0.5,
    });
  };
  

  const makeChange = useCallback(
    (index) => {
      gsap.to(circleRef.current, {
        rotate: (2 - index) * 20,
        duration: 2,
        ease: 'back.out(1.7)',
      });
  
      setActive(index);
      greyOut();
  
      const video = document.querySelector('video');
      if (video) {
        video.src = videoURLs[index];
        video.play();
      }
  
      gsap.to(secDivsRef.current[index], {
        opacity: 1,
        fontSize: '30px',
        ease: 'power1.inOut',
        color: 'white',
        duration: 0.5,
      });
    },
    [greyOut, videoURLs]
  );

  useEffect(() => {
    const secDivs = document.querySelectorAll('.second h1');
    secDivsRef.current = secDivs;
  
    secDivs.forEach((e, index) => {
      e.addEventListener('mouseenter', () => {
        e.parentElement.classList.add('hovered');
        handleMouseEnter();
      });
      e.addEventListener('mouseleave', () => {
        e.parentElement.classList.remove('hovered');
        handleMouseLeave();
      });
      e.addEventListener('click', () => makeChange(index));
    });
  
    const circle = circleRef.current;
    
    circle.addEventListener('mouseenter', handleMouseEnter);
    circle.addEventListener('mouseleave', handleMouseLeave);
  
    gsap.to(secDivs[active], {
      opacity: 1,
      fontSize: '30px',
      duration: 0.5,
      color: 'white',
      ease: 'power1.inOut',
    });
  
    return () => {
      secDivs.forEach((e, index) => {
        e.removeEventListener('mouseenter', () => {
          e.parentElement.classList.add('hovered');
          handleMouseEnter();
        });
        e.removeEventListener('mouseleave', () => {
          e.parentElement.classList.remove('hovered');
          handleMouseLeave();
        });
        e.removeEventListener('click', () => makeChange(index));
      });
  
      circle.removeEventListener('mouseenter', handleMouseEnter);
      circle.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [makeChange, active, handleMouseEnter, handleMouseLeave]);  

  useEffect(() => {
    gsap.to(circleRef.current, {
      rotate: 0,
      opacity: 0.6,
      duration: 1.5,
      ease: 'back.out(1.7)',
    });
  
    const circle = circleRef.current;
    circle.addEventListener('mouseleave', handleMouseLeave);
  
    const secDivs = secDivsRef.current;
    secDivs.forEach((e) => {
      e.addEventListener('mouseleave', handleMouseLeave);
    });
  
    return () => {
      circle.removeEventListener('mouseleave', handleMouseLeave);
      secDivs.forEach((e) => {
        e.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);  

  return (
    <div className='outer-box'>
      <div id='circle' ref={circleRef}>
        <div id='str1' className='stripe'>
          <div className='first'></div>
          <div className='second'>
            <h1>World Championship</h1>
          </div>
        </div>
        <div id='str2' className='stripe'>
          <div className='first'></div>
          <div className='second'>
            <h1>World Championship</h1>
          </div>
        </div>
        <div id='str3' className='stripe'>
          <div className='first'></div>
          <div className='second'>
            <h1>Grand Championship</h1>
          </div>
        </div>
        <div id='str4' className='stripe'>
          <div className='first'></div>
          <div className='second'>
            <h1>Football Championship</h1>
          </div>
        </div>
        <div id='str5' className='stripe'>
          <div className='first'></div>
          <div className='second'>
            <h1>Lionel Championship</h1>
          </div>
        </div>
      </div>
      <div className='panel'  ref={panelRef}>
        <video autoPlay loop muted>
          <source src={videoURLs[active]} type="video/mp4" />
          {/* Your browser does not support HTML5 video. */}
        </video>
      </div>
    </div>
  );
}

export default App;
