import {
    AbsoluteFill,
    Audio,
    Img,
    Sequence,
    Video,
    interpolate,
    spring,
    staticFile,
    useCurrentFrame,
    useVideoConfig,
} from 'remotion';

// --- Reusable components ---

const FadeIn: React.FC<{
    children: React.ReactNode;
    delay?: number;
}> = ({ children, delay = 0 }) => {
    const frame = useCurrentFrame();
    const opacity = interpolate(frame - delay, [0, 20], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const y = interpolate(frame - delay, [0, 20], [30, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    return (
        <div style={{ opacity, transform: `translateY(${y}px)` }}>
            {children}
        </div>
    );
};

const ProgressBar: React.FC<{ progress: number; color: string }> = ({
    progress,
    color,
}) => (
    <div
        style={{
            width: '100%',
            height: 6,
            backgroundColor: 'rgba(255,255,255,0.15)',
            borderRadius: 3,
            overflow: 'hidden',
        }}
    >
        <div
            style={{
                width: `${progress * 100}%`,
                height: '100%',
                backgroundColor: color,
                borderRadius: 3,
            }}
        />
    </div>
);

// --- Title Slide ---

const TitleSlide: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const titleScale = spring({ frame, fps, config: { damping: 15 } });
    const subtitleOpacity = interpolate(frame, [25, 45], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <AbsoluteFill
            style={{
                background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div style={{ textAlign: 'center' }}>
                <div
                    style={{
                        fontSize: 72,
                        fontWeight: 800,
                        color: 'white',
                        transform: `scale(${titleScale})`,
                        letterSpacing: -2,
                    }}
                >
                    VideoGenerator
                </div>
                <div
                    style={{
                        fontSize: 28,
                        color: '#a5b4fc',
                        marginTop: 16,
                        opacity: subtitleOpacity,
                        fontWeight: 400,
                    }}
                >
                    AI-Powered Video Creation Pipeline
                </div>
                <div
                    style={{
                        fontSize: 20,
                        color: 'rgba(255,255,255,0.5)',
                        marginTop: 40,
                        opacity: subtitleOpacity,
                    }}
                >
                    Example: Noah's Ark
                </div>
            </div>
        </AbsoluteFill>
    );
};

// --- Stage Intro Slide ---

const StageIntro: React.FC<{
    stageNumber: number;
    title: string;
    description: string;
    icon: string;
    color: string;
}> = ({ stageNumber, title, description, icon, color }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const badgeScale = spring({ frame, fps, config: { damping: 12 } });
    const textOpacity = interpolate(frame, [15, 35], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <AbsoluteFill
            style={{
                background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div style={{ textAlign: 'center' }}>
                <div
                    style={{
                        fontSize: 64,
                        transform: `scale(${badgeScale})`,
                        marginBottom: 24,
                    }}
                >
                    {icon}
                </div>
                <div
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 12,
                        transform: `scale(${badgeScale})`,
                    }}
                >
                    <div
                        style={{
                            backgroundColor: color,
                            color: 'white',
                            width: 48,
                            height: 48,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 24,
                            fontWeight: 700,
                        }}
                    >
                        {stageNumber}
                    </div>
                    <span
                        style={{
                            fontSize: 48,
                            fontWeight: 700,
                            color: 'white',
                        }}
                    >
                        {title}
                    </span>
                </div>
                <div
                    style={{
                        fontSize: 22,
                        color: 'rgba(255,255,255,0.6)',
                        marginTop: 20,
                        opacity: textOpacity,
                        maxWidth: 600,
                    }}
                >
                    {description}
                </div>
            </div>
        </AbsoluteFill>
    );
};

// --- Script Chat Slide ---

const ScriptSlide: React.FC = () => {
    const frame = useCurrentFrame();

    const messages = [
        { role: 'user', text: "I need a video showing Noah's Ark construction and the flood as Earth fills up." },
        { role: 'assistant', text: "I'll create a 20-second stylized retelling with three phases: construction, crimson flood, and golden sunrise renewal." },
        { role: 'user', text: 'That sounds great! Go ahead and finalize the script.' },
        { role: 'assistant', text: "Script finalized! Moving to character generation phase." },
    ];

    return (
        <AbsoluteFill
            style={{
                background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
                padding: 80,
            }}
        >
            <div
                style={{
                    fontSize: 18,
                    color: '#a5b4fc',
                    fontWeight: 600,
                    marginBottom: 24,
                    textTransform: 'uppercase',
                    letterSpacing: 2,
                }}
            >
                Chat with Claude AI
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {messages.map((msg, i) => {
                    const appearFrame = i * 30;
                    const opacity = interpolate(
                        frame,
                        [appearFrame, appearFrame + 15],
                        [0, 1],
                        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                    );
                    const translateX = interpolate(
                        frame,
                        [appearFrame, appearFrame + 15],
                        [msg.role === 'user' ? 40 : -40, 0],
                        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                    );

                    return (
                        <div
                            key={i}
                            style={{
                                opacity,
                                transform: `translateX(${translateX}px)`,
                                display: 'flex',
                                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                            }}
                        >
                            <div
                                style={{
                                    maxWidth: '70%',
                                    padding: '16px 24px',
                                    borderRadius: 16,
                                    fontSize: 22,
                                    lineHeight: 1.5,
                                    backgroundColor:
                                        msg.role === 'user'
                                            ? '#6366f1'
                                            : 'rgba(255,255,255,0.1)',
                                    color: 'white',
                                }}
                            >
                                {msg.text}
                            </div>
                        </div>
                    );
                })}
            </div>
            <div style={{ position: 'absolute', bottom: 60, left: 80, right: 80 }}>
                <ProgressBar
                    progress={interpolate(frame, [0, 120], [0, 1], {
                        extrapolateRight: 'clamp',
                    })}
                    color="#6366f1"
                />
            </div>
        </AbsoluteFill>
    );
};

// --- Character Slide ---

const CharacterSlide: React.FC<{
    characterUrl: string;
    characterName: string;
}> = ({ characterUrl, characterName }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const imgScale = spring({ frame, fps, config: { damping: 15 } });

    return (
        <AbsoluteFill
            style={{
                background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div style={{ textAlign: 'center' }}>
                <div
                    style={{
                        fontSize: 18,
                        color: '#a5b4fc',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: 2,
                        marginBottom: 32,
                    }}
                >
                    Character Generated via Nano Banana API
                </div>
                <div
                    style={{
                        transform: `scale(${imgScale})`,
                        borderRadius: 24,
                        overflow: 'hidden',
                        boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
                        display: 'inline-block',
                    }}
                >
                    <Img
                        src={characterUrl}
                        style={{
                            height: 600,
                            objectFit: 'contain',
                        }}
                    />
                </div>
                <div
                    style={{
                        fontSize: 36,
                        fontWeight: 700,
                        color: 'white',
                        marginTop: 32,
                        opacity: interpolate(frame, [30, 50], [0, 1], {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp',
                        }),
                    }}
                >
                    {characterName}
                </div>
            </div>
        </AbsoluteFill>
    );
};

// --- Storyboard Grid Slide ---

const StoryboardSlide: React.FC<{
    frameUrls: string[];
}> = ({ frameUrls }) => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill
            style={{
                background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
                padding: 60,
            }}
        >
            <div
                style={{
                    fontSize: 18,
                    color: '#a5b4fc',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: 2,
                    marginBottom: 32,
                }}
            >
                10 Storyboard Frames Generated
            </div>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    gap: 12,
                    flex: 1,
                }}
            >
                {frameUrls.map((url, i) => {
                    const delay = i * 8;
                    const opacity = interpolate(
                        frame,
                        [delay, delay + 15],
                        [0, 1],
                        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                    );
                    const scale = interpolate(
                        frame,
                        [delay, delay + 15],
                        [0.8, 1],
                        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                    );

                    return (
                        <div
                            key={i}
                            style={{
                                opacity,
                                transform: `scale(${scale})`,
                                borderRadius: 12,
                                overflow: 'hidden',
                                border: '2px solid rgba(255,255,255,0.1)',
                                position: 'relative',
                            }}
                        >
                            <Img
                                src={url}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 8,
                                    left: 8,
                                    backgroundColor: 'rgba(0,0,0,0.7)',
                                    color: 'white',
                                    fontSize: 14,
                                    fontWeight: 600,
                                    padding: '2px 8px',
                                    borderRadius: 6,
                                }}
                            >
                                {i + 1}
                            </div>
                        </div>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};

// --- Video Clips Slide ---

const VideoClipsSlide: React.FC<{
    clipCount: number;
}> = ({ clipCount }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const clips = Array.from({ length: clipCount }, (_, i) => i + 1);

    return (
        <AbsoluteFill
            style={{
                background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 80,
            }}
        >
            <div
                style={{
                    fontSize: 18,
                    color: '#a5b4fc',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: 2,
                    marginBottom: 40,
                    textAlign: 'center',
                }}
            >
                9 Video Clips Generated via Kling AI
            </div>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 20,
                    width: '100%',
                    maxWidth: 900,
                }}
            >
                {clips.map((num, i) => {
                    const delay = i * 10;
                    const opacity = interpolate(
                        frame,
                        [delay, delay + 20],
                        [0, 1],
                        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                    );
                    const checkDelay = delay + 30;
                    const checkOpacity = interpolate(
                        frame,
                        [checkDelay, checkDelay + 10],
                        [0, 1],
                        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                    );

                    return (
                        <div
                            key={num}
                            style={{
                                opacity,
                                backgroundColor: 'rgba(255,255,255,0.08)',
                                borderRadius: 16,
                                padding: 20,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 16,
                                border: '1px solid rgba(255,255,255,0.1)',
                            }}
                        >
                            <div
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: '50%',
                                    backgroundColor: '#6366f1',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontSize: 18,
                                    fontWeight: 700,
                                    flexShrink: 0,
                                }}
                            >
                                {num}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div
                                    style={{
                                        color: 'white',
                                        fontSize: 16,
                                        fontWeight: 600,
                                    }}
                                >
                                    Clip {num}
                                </div>
                                <div
                                    style={{
                                        color: 'rgba(255,255,255,0.5)',
                                        fontSize: 13,
                                    }}
                                >
                                    Frame {num} → {num + 1}
                                </div>
                            </div>
                            <div
                                style={{
                                    opacity: checkOpacity,
                                    color: '#4ade80',
                                    fontSize: 24,
                                }}
                            >
                                ✓
                            </div>
                        </div>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};

// --- Final Result Slide ---

const FinalSlide: React.FC<{
    finalVideoUrl: string;
}> = ({ finalVideoUrl }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const scale = spring({ frame, fps, config: { damping: 15 } });

    return (
        <AbsoluteFill
            style={{
                background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div style={{ textAlign: 'center' }}>
                <div
                    style={{
                        fontSize: 18,
                        color: '#4ade80',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: 2,
                        marginBottom: 24,
                    }}
                >
                    Final Video — Concatenated with FFmpeg
                </div>
                <div
                    style={{
                        transform: `scale(${scale})`,
                        borderRadius: 16,
                        overflow: 'hidden',
                        boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
                        border: '3px solid rgba(74, 222, 128, 0.3)',
                    }}
                >
                    <Video
                        src={finalVideoUrl}
                        style={{ width: 960, height: 540 }}
                    />
                </div>
            </div>
        </AbsoluteFill>
    );
};

// --- Outro Slide ---

const OutroSlide: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const scale = spring({ frame, fps, config: { damping: 15 } });

    return (
        <AbsoluteFill
            style={{
                background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div style={{ textAlign: 'center', transform: `scale(${scale})` }}>
                <div
                    style={{
                        fontSize: 56,
                        fontWeight: 800,
                        color: 'white',
                        letterSpacing: -1,
                    }}
                >
                    VideoGenerator
                </div>
                <div
                    style={{
                        fontSize: 22,
                        color: 'rgba(255,255,255,0.5)',
                        marginTop: 16,
                    }}
                >
                    From idea to video — powered by AI
                </div>
                <div
                    style={{
                        display: 'flex',
                        gap: 32,
                        justifyContent: 'center',
                        marginTop: 48,
                    }}
                >
                    {['Anthropic Claude', 'Nano Banana', 'Kling AI', 'FFmpeg'].map(
                        (name) => (
                            <div
                                key={name}
                                style={{
                                    backgroundColor: 'rgba(255,255,255,0.08)',
                                    padding: '10px 24px',
                                    borderRadius: 24,
                                    color: '#a5b4fc',
                                    fontSize: 16,
                                    fontWeight: 500,
                                    border: '1px solid rgba(255,255,255,0.1)',
                                }}
                            >
                                {name}
                            </div>
                        )
                    )}
                </div>
            </div>
        </AbsoluteFill>
    );
};

// --- Main Composition ---

export interface PipelineShowcaseProps {
    characterUrl: string;
    characterName: string;
    frameUrls: string[];
    finalVideoUrl: string;
    musicFile?: string;
}

export const PipelineShowcase: React.FC<PipelineShowcaseProps> = ({
    characterUrl,
    characterName,
    frameUrls,
    finalVideoUrl,
    musicFile,
}) => {
    // Timing (in frames at 30fps)
    const TITLE = 90; // 3s
    const STAGE_INTRO = 60; // 2s each
    const SCRIPT = 150; // 5s
    const CHARACTER = 120; // 4s
    const STORYBOARD = 150; // 5s
    const CLIPS = 150; // 5s
    const FINAL = 300; // 10s
    const OUTRO = 90; // 3s

    let offset = 0;

    const sections: { from: number; duration: number; component: React.ReactNode }[] = [];

    // Title
    sections.push({ from: offset, duration: TITLE, component: <TitleSlide /> });
    offset += TITLE;

    // Stage 1 intro
    sections.push({
        from: offset,
        duration: STAGE_INTRO,
        component: (
            <StageIntro
                stageNumber={1}
                title="Script Writing"
                description="Chat with Claude AI to develop your story"
                icon="✍️"
                color="#6366f1"
            />
        ),
    });
    offset += STAGE_INTRO;

    // Script chat
    sections.push({ from: offset, duration: SCRIPT, component: <ScriptSlide /> });
    offset += SCRIPT;

    // Stage 2 intro
    sections.push({
        from: offset,
        duration: STAGE_INTRO,
        component: (
            <StageIntro
                stageNumber={2}
                title="Characters"
                description="Generate character images with Nano Banana API"
                icon="🎨"
                color="#f59e0b"
            />
        ),
    });
    offset += STAGE_INTRO;

    // Character
    sections.push({
        from: offset,
        duration: CHARACTER,
        component: <CharacterSlide characterUrl={characterUrl} characterName={characterName} />,
    });
    offset += CHARACTER;

    // Stage 3 intro
    sections.push({
        from: offset,
        duration: STAGE_INTRO,
        component: (
            <StageIntro
                stageNumber={3}
                title="Storyboard"
                description="Generate storyboard frames for each scene"
                icon="🖼️"
                color="#10b981"
            />
        ),
    });
    offset += STAGE_INTRO;

    // Storyboard grid
    sections.push({
        from: offset,
        duration: STORYBOARD,
        component: <StoryboardSlide frameUrls={frameUrls} />,
    });
    offset += STORYBOARD;

    // Stage 4 intro
    sections.push({
        from: offset,
        duration: STAGE_INTRO,
        component: (
            <StageIntro
                stageNumber={4}
                title="Video Generation"
                description="Create video clips from frame pairs with Kling AI"
                icon="🎬"
                color="#ef4444"
            />
        ),
    });
    offset += STAGE_INTRO;

    // Video clips
    sections.push({
        from: offset,
        duration: CLIPS,
        component: <VideoClipsSlide clipCount={9} />,
    });
    offset += CLIPS;

    // Final video
    sections.push({
        from: offset,
        duration: FINAL,
        component: <FinalSlide finalVideoUrl={finalVideoUrl} />,
    });
    offset += FINAL;

    // Outro
    sections.push({ from: offset, duration: OUTRO, component: <OutroSlide /> });

    const totalFrames = offset + OUTRO;

    return (
        <AbsoluteFill style={{ backgroundColor: '#0f0c29' }}>
            {musicFile && (
                <Audio
                    src={staticFile(musicFile)}
                    volume={(f) => {
                        // Fade in first 2s, fade out last 3s
                        const fadeIn = interpolate(f, [0, 60], [0, 0.3], { extrapolateRight: 'clamp' });
                        const fadeOut = interpolate(f, [totalFrames - 90, totalFrames], [0.3, 0], { extrapolateLeft: 'clamp' });
                        return Math.min(fadeIn, fadeOut);
                    }}
                />
            )}
            {sections.map((section, i) => (
                <Sequence
                    key={i}
                    from={section.from}
                    durationInFrames={section.duration}
                >
                    {section.component}
                </Sequence>
            ))}
        </AbsoluteFill>
    );
};
