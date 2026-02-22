import {
    AbsoluteFill,
    Img,
    Sequence,
    interpolate,
    useCurrentFrame,
} from 'remotion';

export interface StoryFrame {
    imageUrl: string;
    description?: string;
}

export interface StoryVideoProps {
    frames: StoryFrame[];
    transitionDurationInFrames: number;
}

const FrameSlide: React.FC<{
    frame: StoryFrame;
    durationInFrames: number;
    transitionDurationInFrames: number;
}> = ({ frame, durationInFrames, transitionDurationInFrames }) => {
    const currentFrame = useCurrentFrame();

    // Fade in
    const opacity = interpolate(
        currentFrame,
        [0, transitionDurationInFrames],
        [0, 1],
        { extrapolateRight: 'clamp' }
    );

    // Ken Burns zoom effect
    const scale = interpolate(
        currentFrame,
        [0, durationInFrames],
        [1, 1.1],
        { extrapolateRight: 'clamp' }
    );

    return (
        <AbsoluteFill style={{ opacity }}>
            <AbsoluteFill style={{ transform: `scale(${scale})` }}>
                <Img
                    src={frame.imageUrl}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
            </AbsoluteFill>
            {frame.description && (
                <div
                    style={{
                        position: 'absolute',
                        bottom: 80,
                        left: 0,
                        right: 0,
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <div
                        style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            color: 'white',
                            padding: '16px 32px',
                            borderRadius: 8,
                            fontSize: 28,
                            maxWidth: '80%',
                            textAlign: 'center',
                            lineHeight: 1.4,
                        }}
                    >
                        {frame.description}
                    </div>
                </div>
            )}
        </AbsoluteFill>
    );
};

export const StoryVideo: React.FC<StoryVideoProps> = ({
    frames,
    transitionDurationInFrames,
}) => {
    if (frames.length === 0) {
        return (
            <AbsoluteFill
                style={{
                    backgroundColor: '#111',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    fontSize: 48,
                }}
            >
                No frames provided
            </AbsoluteFill>
        );
    }

    const frameDuration = 150; // 5 seconds at 30fps

    return (
        <AbsoluteFill style={{ backgroundColor: '#000' }}>
            {frames.map((frame, index) => (
                <Sequence
                    key={index}
                    from={index * (frameDuration - transitionDurationInFrames)}
                    durationInFrames={frameDuration}
                >
                    <FrameSlide
                        frame={frame}
                        durationInFrames={frameDuration}
                        transitionDurationInFrames={transitionDurationInFrames}
                    />
                </Sequence>
            ))}
        </AbsoluteFill>
    );
};
