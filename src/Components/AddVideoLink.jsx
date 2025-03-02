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
        className='w-full h-[20px] border-1 border-gray-300 rounded-[50px] px-[12px] py-2'
          type="text"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          placeholder="Enter YouTube video URL"
          required
        />
        <button type="submit" className='w-[120px] mx-auto cursor-pointer bg-black text-white rounded-[50px] px-[12px] py-2'>Load Video</button>
      </form>
    </div>
  )
}

export default AddVideoLink
