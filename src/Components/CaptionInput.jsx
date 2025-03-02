import { useState } from 'react'

function CaptionInput({ onAddCaption }) {
  const [captionText, setCaptionText] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddCaption({
      text: captionText,
      startTime: parseFloat(startTime),
      endTime: parseFloat(endTime)
    })
    setCaptionText('')
    setStartTime('')
    setEndTime('')
  }

  return (
    <form onSubmit={handleSubmit} className="caption-form">
      <div className="form-group">
        <label>Caption Text:</label>
        <textarea
          value={captionText}
          onChange={(e) => setCaptionText(e.target.value)}
          required
          placeholder="Enter caption text"
        />
      </div>
      
      <div className="time-inputs">
        <div className="form-group">
          <label>Start Time (seconds):</label>
          <input
            type="number"
            step="0.1"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
            min="0"
          />
        </div>
        
        <div className="form-group">
          <label>End Time (seconds):</label>
          <input
            type="number"
            step="0.1"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
            min={startTime}
          />
        </div>
      </div>
      
      <button type="submit">Add Caption</button>
    </form>
  )
}

export default CaptionInput 