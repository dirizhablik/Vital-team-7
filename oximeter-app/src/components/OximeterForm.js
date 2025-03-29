import React, { useState, useRef, useEffect } from 'react';

const monkSkinTones = [
  '#f9ede2', '#f1dbb4', '#e1c18d', '#c9a27a', '#a8775f',
  '#8b5c49', '#6f4338', '#553026', '#3a1d17', '#1f0e08'
];

const thresholdsBySkinTone = {
  1: 95, 2: 95, 3: 95,
  4: 96, 5: 96, 6: 96,
  7: 97, 8: 97, 9: 97, 10: 97
};

const OximeterForm = () => {
  const [spo2, setSpo2] = useState('');
  const [pulse, setPulse] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [skinTone, setSkinTone] = useState(null);
  const [result, setResult] = useState(null);
  const [bmi, setBmi] = useState(null);
  const [gender, setGender] = useState('');
  const [temperature, setTemperature] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [respiratory, setRespiratory] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [showCamera, setShowCamera] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
      setShowCamera(true);
      setTimeout(() => {
        videoRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    } catch (err) {
      console.error('Camera error:', err);
    }
  };

  const capturePhoto = async () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);

    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append('image', blob, 'camera.jpg');

      try {
        const res = await fetch('http://127.0.0.1:5050/detect_skin_tone', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        if (data.skinTone !== undefined) {
          setSkinTone(data.skinTone - 1);
        }
      } catch (err) {
        console.error('Camera capture error:', err);
      }
    }, 'image/jpeg');
  };

  const handleSubmit = async (e) => {
   e.preventDefault();
 
   const payload = {
     spo2,
     pulse,
     age,
     height,
     weight,
     skinTone,
     gender,
     temperature,
     bloodPressure,
     respiratory,
   };
 
   try {
     const response = await fetch('http://127.0.0.1:5050/analyze', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(payload),
     });
 
     const resultData = await response.json();
 
     // Вычисляем BMI отдельно для UI:
     const heightM = height / 100;
     const bmiVal = (weight / (heightM * heightM)).toFixed(1);
     setBmi(bmiVal);
 
     setResult(resultData);
   } catch (error) {
     console.error('Fetch error:', error);
     setResult({ status: 'Error', message: 'Server not responding' });
   }
 };

  return (
    <div>
      <header className="header">
        <div className="header-content">
          <nav className="nav">
            <a href="/" className="nav-link">Home</a>
            <a href="test" className="nav-link">Measurement</a>
            <a href="#resources" className="nav-link">Resources</a>
          </nav>
        </div>
      </header>
    <div style={styles.container}>

      <h1>Oximeter Results</h1>
      <p>Enter your data to calculate a personalized result.</p>
      <form onSubmit={handleSubmit} style={styles.form}>

        <label htmlFor="spo2">SpO₂ (%)</label>
        <input
          id="spo2"
          type="number"
          min="50"
          max="100"
          required
          placeholder="95"
          value={spo2}
          onChange={(e) => setSpo2(e.target.value)}
          style={styles.input}
        />

        <label htmlFor="pulse">Pulse (bpm)</label>
        <input
          id="pulse"
          type="number"
          min="30"
          max="250"
          placeholder="70"
          value={pulse}
          onChange={(e) => setPulse(e.target.value)}
          style={styles.input}
        />

        <label htmlFor="age">Age</label>
        <input
          id="age"
          type="number"
          min="1"
          max="120"
          placeholder="30"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          style={styles.input}
        />

        <label htmlFor="height">Height (cm)</label>
        <input
          id="height"
          type="number"
          min="50"
          max="250"
          required
          placeholder="170"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          style={styles.input}
        />

        <label htmlFor="weight">Weight (kg)</label>
        <input
          id="weight"
          type="number"
          min="10"
          max="300"
          required
          placeholder="65"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          style={styles.input}
        />
        <label htmlFor="gender">Gender</label>
<select
  id="gender"
  value={gender}
  onChange={(e) => setGender(e.target.value)}
  style={styles.input}
  required
>
  <option value="">Select</option>
  <option value="male">Male</option>
  <option value="female">Female</option>
  <option value="other">Other</option>
</select>

<label htmlFor="temperature">Body Temperature (°C)</label>
<input
  id="temperature"
  type="number"
  min="34"
  max="43"
  step="0.1"
  placeholder="36.6"
  value={temperature}
  onChange={(e) => setTemperature(e.target.value)}
  style={styles.input}
/>

<label htmlFor="bloodPressure">Blood Pressure (Cuff Pressure Mean)</label>
<input
  id="bloodPressure"
  type="number"
  min="30"
  max="150"
  placeholder="80"
  value={bloodPressure}
  onChange={(e) => setBloodPressure(e.target.value)}
  style={styles.input}
/>

<label htmlFor="respiratory">Respiratory Rate (breaths/min)</label>
<input
  id="respiratory"
  type="number"
  min="5"
  max="60"
  placeholder="16"
  value={respiratory}
  onChange={(e) => setRespiratory(e.target.value)}
  style={styles.input}
/>
        <label>Skin Tone (Monk Scale)</label>
        <label htmlFor="skinUpload">Or upload your photo to detect skin tone</label>
        <input
          id="skinUpload"
          type="file"
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const formData = new FormData();
            formData.append('image', file);

            try {
              const res = await fetch('http://127.0.0.1:5050/detect_skin_tone', {
                method: 'POST',
                body: formData,
              });

              const data = await res.json();
              if (data.skinTone !== undefined) {
                setSkinTone(data.skinTone - 1); // since we store index 0–9
              }
            } catch (err) {
              console.error('Skin tone detection failed', err);
            }
          }}
          style={{ marginBottom: '10px' }}
        />
        <button onClick={startCamera} style={styles.button}>📷 Open Camera</button>

        <div style={styles.cameraSection}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={styles.videoPreview}
          />
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          <div style={styles.cameraControls}>
            <button type="button" onClick={capturePhoto} style={styles.button}>📸 Capture & Detect</button>
          </div>
        </div>
        <div style={styles.skinColors}>
          {monkSkinTones.map((color, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSkinTone(index)}
              style={{
                ...styles.skinButton,
                backgroundColor: color,
                border: skinTone === index ? '3px solid #000' : '1px solid #ccc',
              }}
              title={`Tone ${index + 1}`}
            />
          ))}
        </div>

        <button type="submit" style={styles.button}>
          Show Result
        </button>
      </form>

      {bmi && (
        <p style={{ marginTop: '15px' }}>
          <strong>BMI:</strong> {bmi}
        </p>
      )}

      {result && (
        <div
          style={{
            ...styles.resultBox,
            backgroundColor:
              result.status === 'Error'
                ? '#fff3cd'
                : result.predicted_spo2 < 90
                ? '#f8d7da'
                : result.predicted_spo2 < 94
                ? '#fff3cd'
                : '#e8f5e9',
            color:
              result.status === 'Error'
                ? '#856404'
                : result.predicted_spo2 < 90
                ? '#721c24'
                : result.predicted_spo2 < 94
                ? '#856404'
                : '#2e7d32',
          }}
        >
          <h3>{result.status}</h3>
          <p>{result.message}</p>

          {result.predicted_spo2 < 90 && (
            <p><strong>⚠️ Your SpO₂ is dangerously low. Please seek immediate medical attention.</strong></p>
          )}
          {result.predicted_spo2 >= 90 && result.predicted_spo2 < 94 && (
            <p>
              🟡 Your oxygen level is slightly below normal. Consider checking our{' '}
              <a href="#resources" style={{ textDecoration: 'underline', color: 'inherit' }}>
                Resources page
              </a>{' '}
              for more information and health tips.
            </p>
          )}
          {result.predicted_spo2 >= 94 && (
            <p>✅ Your oxygen level looks good. Stay healthy and keep monitoring regularly!</p>
          )}
        </div>
      )}
    </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '30px',
    borderRadius: '14px',
    boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#fefefe',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
  },
  skinColors: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '10px',
  },
  skinButton: {
    width: '40px',
    height: '40px',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  button: {
    backgroundColor: '#1976d2',
    color: '#fff',
    padding: '12px 20px',
    border: 'none',
    fontSize: '16px',
    borderRadius: '10px',
    cursor: 'pointer',
    marginTop: '20px',
  },
  resultBox: {
    marginTop: '20px',
    padding: '20px',
    borderRadius: '10px',
  },
  cameraSection: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  videoPreview: {
    borderRadius: '12px',
    maxWidth: '100%',
    height: 'auto',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
  cameraControls: {
    marginTop: '10px',
  },
};

export default OximeterForm;