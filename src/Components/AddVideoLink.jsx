import { useState } from 'react'

function AddVideoLink({ onVideoSubmit }) {
  const [inputUrl, setInputUrl] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onVideoSubmit(inputUrl)
  }

  return (
    <div className="video-link-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          placeholder="Enter YouTube video URL"
          required
        />
        <button type="submit">Load Video</button>
      </form>
    </div>
  )
}

export default AddVideoLink
