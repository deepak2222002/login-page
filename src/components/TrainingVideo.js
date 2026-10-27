import { useEffect, useRef, useState } from "react";

export default function TrainingVideo({ src, onComplete }) {
    const videoRef = useRef(null);

    const [lastTime, setLastTime] = useState(0);
    const [fastForward, setFastForward] = useState(false);
    const [fastForwardTime, setFastForwardTime] = useState(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const onTimeUpdate = () => {
            const currentTime = video.currentTime;

            if (currentTime > lastTime) {
                if (currentTime - lastTime > 2) {
                    setFastForward(true);
                    if (fastForwardTime === null) {
                        setFastForwardTime(lastTime);
                    }
                }
            } else if (currentTime < lastTime) {
                if (fastForwardTime !== null && currentTime < fastForwardTime) {
                    setFastForward(false);
                    setFastForwardTime(null);
                }
            }

            setLastTime(currentTime);
        };

        const onEnded = () => {
            if (!fastForward && fastForwardTime === null) {
                onComplete(true);
            } else {
                const time = Math.ceil(fastForwardTime || 0);
                alert(
                    `You fast-forwarded the video. Please replay from ${formatTime(
                        time
                    )}`
                );
                video.currentTime = (time-2);
                video.play();
            }
        };

        video.addEventListener("timeupdate", onTimeUpdate);
        video.addEventListener("ended", onEnded);

        return () => {
            video.removeEventListener("timeupdate", onTimeUpdate);
            video.removeEventListener("ended", onEnded);
        };
    }, [lastTime, fastForward, fastForwardTime, onComplete]);

    return (
        <video
            ref={videoRef}
            className="videos"
            controls
            controlsList="nodownload noplaybackrate"
            disablePictureInPicture
            autoPlay
            style={{ width: "100%" }}
            onContextMenu={e => e.preventDefault()}
        >
            <source src={src} type="video/mp4" />
        </video>
    );
}

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
}
