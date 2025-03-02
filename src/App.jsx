import { useState, useRef, useEffect } from 'react'
import AddVideoLink from './Components/AddVideoLink'
import './App.css'
import CaptionList from './Components/CaptionList'
import CaptionInput from './Components/CaptionInput'

function App() {
  const [videoUrl, setVideoUrl] = useState('')
  const [captions, setCaptions] = useState([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [error, setError] = useState(null)
  const videoRef = useRef(null)

  const handleAddCaption = (newCaption) => {
    setCaptions([...captions, newCaption])
  }

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play().catch(err => {
          setError('Failed to play video: ' + err.message)
          setIsPlaying(false)
        })
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleVideoError = (e) => {
    setError('Error loading video: ' + e.target.error?.message || 'Unknown error')
    setIsPlaying(false)
  }

  const getYouTubeEmbedUrl = (url) => {
    try {
      // Handle different YouTube URL formats
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      
      if (match && match[2].length === 11) {
        // Return embed URL
        return `https://www.youtube.com/embed/${match[2]}`;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  const handleVideoSubmit = (url) => {
    const embedUrl = getYouTubeEmbedUrl(url);
    if (embedUrl) {
      setVideoUrl(embedUrl);
      setError(null);
    } else {
      setError('Invalid YouTube URL. Please provide a valid YouTube video link.');
    }
  }

  return (
    <div className="app-container">
      <h1>Video Caption Editor</h1>
      <AddVideoLink onVideoSubmit={handleVideoSubmit} />
      {error && <div className="error-message">{error}</div>}
      
      <div className="main-content">
        {videoUrl && (
          <div className="video-container">
            <iframe
              width="100%"
              height="400"
              src={videoUrl}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube video player"
            ></iframe>
            <div className="video-controls">
              <button 
                onClick={handlePlayPause}
                className="play-pause-button"
              >
                {isPlaying ? '⏸️ Pause' : '▶️ Play'}
              </button>
            </div>
          </div>
        )}
        
        <div className="caption-editor">
          <h2>Add Captions</h2>
          <CaptionInput onAddCaption={handleAddCaption} />
          <CaptionList captions={captions} />
        </div>
      </div>
    </div>
  )
}

function generateVTTContent(captions) {
  let vttContent = 'WEBVTT\n\n'
  captions.forEach((caption, index) => {
    vttContent += `${index + 1}\n`
    vttContent += `${formatTime(caption.startTime)} --> ${formatTime(caption.endTime)}\n`
    vttContent += `${caption.text}\n\n`
  })
  return vttContent
}

function formatTime(seconds) {
  const pad = (num) => num.toString().padStart(2, '0')
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)
  const ms = Math.floor((seconds % 1) * 1000)
  return `${pad(hours)}:${pad(minutes)}:${pad(secs)}.${ms.toString().padStart(3, '0')}`
}

export default App