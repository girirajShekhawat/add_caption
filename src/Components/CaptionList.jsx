function CaptionList({ captions }) {
  return (
    <div className="captions-list">
      <h3>Added Captions</h3>
      {captions.map((caption, index) => (
        <div key={index} className="caption-item">
          <p>{caption.text}</p>
          <span className="caption-time">
            {caption.startTime}s - {caption.endTime}s
          </span>
        </div>
      ))}
    </div>
  )
}

export default CaptionList 