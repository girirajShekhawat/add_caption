import React, { useEffect, useRef } from 'react';

function YouTubePlayer({ videoUrl, onTimeUpdate, isPlaying, onPlayPause }) {
  const playerRef = useRef(null);

  // Helper function to extract video ID from URL
  const extractVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  useEffect(() => {
    // Load YouTube IFrame API if not already loaded
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    // Initialize player when API is ready
    const initPlayer = () => {
      const videoId = extractVideoId(videoUrl);
      if (!videoId) return;

      playerRef.current = new window.YT.Player('youtube-player', {
        height: '400',
        width: '100%',
        borderRadius: '10px',
        videoId: videoId,
        playerVars: {
          enablejsapi: 1,
          origin: window.location.origin,
        },
        events: {
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              onPlayPause(true);
            } else if (event.data === window.YT.PlayerState.PAUSED) {
              onPlayPause(false);
            }
          },
        },
      });
    };

    // Handle API ready state
    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoUrl]);

  useEffect(() => {
    let interval;
    if (isPlaying && playerRef.current) {
      interval = setInterval(() => {
        if (playerRef.current.getCurrentTime) {
          const currentTime = playerRef.current.getCurrentTime();
          onTimeUpdate(currentTime);
        }
      }, 100);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying, onTimeUpdate]);

  // Update player state when isPlaying changes
  useEffect(() => {
    if (playerRef.current && playerRef.current.playVideo && playerRef.current.pauseVideo) {
      if (isPlaying) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    }
  }, [isPlaying]);

  return (
    <div className="youtube-player-container">
      <div id="youtube-player"></div>
    </div>
  );
}

export default YouTubePlayer; 