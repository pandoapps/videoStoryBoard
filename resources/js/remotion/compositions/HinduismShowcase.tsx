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

// --- Reusable ---

const FadeIn: React.FC<{ children: React.ReactNode; delay?: number }> = ({
    children,
    delay = 0,
}) => {
    const frame = useCurrentFrame();
    const opacity = interpolate(frame - delay, [0, 20], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const y = interpolate(frame - delay, [0, 20], [30, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    return <div style={{ opacity, transform: `translateY(${y}px)` }}>{children}</div>;
};

const ProgressBar: React.FC<{ progress: number; color: string }> = ({ progress, color }) => (
    <div style={{ width: '100%', height: 6, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ width: `${progress * 100}%`, height: '100%', backgroundColor: color, borderRadius: 3 }} />
    </div>
);

// --- Title ---

const TitleSlide: React.FC<{ title: string; synopsis: string }> = ({ title, synopsis }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const titleScale = spring({ frame, fps, config: { damping: 15 } });
    const synopsisOpacity = interpolate(frame, [30, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill style={{ background: 'linear-gradient(135deg, #1a0a2e 0%, #3d1c6e 50%, #2d1250 100%)', justifyContent: 'center', alignItems: 'center', padding: 100 }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 72, fontWeight: 800, color: '#fbbf24', transform: `scale(${titleScale})`, letterSpacing: -2 }}>
                    {title}
                </div>
                <div style={{ fontSize: 22, color: 'rgba(255,255,255,0.6)', marginTop: 24, opacity: synopsisOpacity, maxWidth: 800, lineHeight: 1.6 }}>
                    {synopsis}
                </div>
            </div>
        </AbsoluteFill>
    );
};

// --- Stage Intro ---

const StageIntro: React.FC<{ stageNumber: number; title: string; description: string; icon: string; color: string }> = ({
    stageNumber, title, description, icon, color,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const badgeScale = spring({ frame, fps, config: { damping: 12 } });
    const textOpacity = interpolate(frame, [15, 35], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill style={{ background: 'linear-gradient(135deg, #1a0a2e 0%, #3d1c6e 50%, #2d1250 100%)', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 64, transform: `scale(${badgeScale})`, marginBottom: 24 }}>{icon}</div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, transform: `scale(${badgeScale})` }}>
                    <div style={{ backgroundColor: color, color: 'white', width: 48, height: 48, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 700 }}>
                        {stageNumber}
                    </div>
                    <span style={{ fontSize: 48, fontWeight: 700, color: 'white' }}>{title}</span>
                </div>
                <div style={{ fontSize: 22, color: 'rgba(255,255,255,0.6)', marginTop: 20, opacity: textOpacity, maxWidth: 600 }}>
                    {description}
                </div>
            </div>
        </AbsoluteFill>
    );
};

// --- Script Chat ---

const ScriptSlide: React.FC = () => {
    const frame = useCurrentFrame();
    const messages = [
        { role: 'user', text: 'I want a 30-second cinematic opening of the Ramayana — the climactic battle of Lanka where Rama draws his divine arrow.' },
        { role: 'assistant', text: "I'll create a powerful sequence: battlefield chaos, time freezing as Rama draws the divine arrow, and a golden explosion of good over evil." },
        { role: 'user', text: 'Include Hanuman, Lakshmana, Sita and Ravana as characters.' },
        { role: 'assistant', text: 'Script finalized with 6 characters and 10 storyboard frames! Moving to character generation.' },
    ];

    return (
        <AbsoluteFill style={{ background: 'linear-gradient(135deg, #1a0a2e 0%, #3d1c6e 50%, #2d1250 100%)', padding: 80 }}>
            <div style={{ fontSize: 18, color: '#c084fc', fontWeight: 600, marginBottom: 24, textTransform: 'uppercase', letterSpacing: 2 }}>
                Chat with Claude AI — 14 messages, 31K input tokens
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {messages.map((msg, i) => {
                    const appear = i * 30;
                    const opacity = interpolate(frame, [appear, appear + 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
                    const tx = interpolate(frame, [appear, appear + 15], [msg.role === 'user' ? 40 : -40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
                    return (
                        <div key={i} style={{ opacity, transform: `translateX(${tx}px)`, display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                            <div style={{ maxWidth: '70%', padding: '16px 24px', borderRadius: 16, fontSize: 22, lineHeight: 1.5, backgroundColor: msg.role === 'user' ? '#7c3aed' : 'rgba(255,255,255,0.1)', color: 'white' }}>
                                {msg.text}
                            </div>
                        </div>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};

// --- Characters Grid ---

const CharactersSlide: React.FC<{ characters: { name: string; url: string }[] }> = ({ characters }) => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill style={{ background: 'linear-gradient(135deg, #1a0a2e 0%, #3d1c6e 50%, #2d1250 100%)', padding: 60 }}>
            <div style={{ fontSize: 18, color: '#c084fc', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 32 }}>
                6 Characters Generated — 41 API calls to Nano Banana
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, flex: 1 }}>
                {characters.map((char, i) => {
                    const delay = i * 15;
                    const opacity = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
                    const scale = interpolate(frame, [delay, delay + 20], [0.85, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
                    return (
                        <div key={i} style={{ opacity, transform: `scale(${scale})`, textAlign: 'center' }}>
                            <div style={{ borderRadius: 16, overflow: 'hidden', border: '2px solid rgba(255,255,255,0.15)', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
                                <Img src={char.url} style={{ width: '100%', height: 280, objectFit: 'cover' }} />
                            </div>
                            <div style={{ color: 'white', fontSize: 18, fontWeight: 600, marginTop: 12 }}>{char.name}</div>
                        </div>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};

// --- Storyboard ---

const StoryboardSlide: React.FC<{ frameUrls: string[] }> = ({ frameUrls }) => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill style={{ background: 'linear-gradient(135deg, #1a0a2e 0%, #3d1c6e 50%, #2d1250 100%)', padding: 60 }}>
            <div style={{ fontSize: 18, color: '#c084fc', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 32 }}>
                10 Storyboard Frames
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, flex: 1 }}>
                {frameUrls.map((url, i) => {
                    const delay = i * 8;
                    const opacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
                    return (
                        <div key={i} style={{ opacity, borderRadius: 12, overflow: 'hidden', border: '2px solid rgba(255,255,255,0.1)', position: 'relative' }}>
                            <Img src={url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', top: 8, left: 8, backgroundColor: 'rgba(0,0,0,0.7)', color: 'white', fontSize: 14, fontWeight: 600, padding: '2px 8px', borderRadius: 6 }}>{i + 1}</div>
                        </div>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};

// --- Video Clips ---

export interface ClipData {
    fromUrl: string;
    toUrl: string;
}

const VideoClipsSlide: React.FC<{ clips: ClipData[] }> = ({ clips }) => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill style={{ background: 'linear-gradient(135deg, #1a0a2e 0%, #3d1c6e 50%, #2d1250 100%)', padding: 60 }}>
            <div style={{ fontSize: 18, color: '#c084fc', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 24, textAlign: 'center' }}>
                9 Video Clips — 13 Kling API calls
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, flex: 1 }}>
                {clips.map((clip, i) => {
                    const delay = i * 12;
                    const opacity = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
                    const checkOpacity = interpolate(frame, [delay + 30, delay + 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
                    return (
                        <div key={i} style={{ opacity, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <div style={{ display: 'flex', gap: 2 }}>
                                <Img src={clip.fromUrl} style={{ width: '50%', height: 120, objectFit: 'cover' }} />
                                <Img src={clip.toUrl} style={{ width: '50%', height: 120, objectFit: 'cover' }} />
                            </div>
                            <div style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <div style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 13, fontWeight: 700 }}>{i + 1}</div>
                                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>Frame {i + 1} → {i + 2}</div>
                                </div>
                                <div style={{ opacity: checkOpacity, color: '#4ade80', fontSize: 20 }}>✓</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};

// --- Costs Slide ---

interface CostData {
    anthropic: { calls: number; inputTokens: number; outputTokens: number; costCents: number };
    nanoBanana: { calls: number; costCents: number };
    kling: { calls: number; costCents: number };
    totalCents: number;
}

const CostsSlide: React.FC<{ costs: CostData }> = ({ costs }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const services = [
        {
            name: 'Anthropic (Claude)',
            icon: '🤖',
            color: '#6366f1',
            details: `${costs.anthropic.calls} calls | ${(costs.anthropic.inputTokens / 1000).toFixed(1)}K input | ${(costs.anthropic.outputTokens / 1000).toFixed(1)}K output`,
            cost: costs.anthropic.costCents,
        },
        {
            name: 'Nano Banana',
            icon: '🎨',
            color: '#f59e0b',
            details: `${costs.nanoBanana.calls} image generations`,
            cost: costs.nanoBanana.costCents,
        },
        {
            name: 'Kling AI',
            icon: '🎬',
            color: '#ef4444',
            details: `${costs.kling.calls} video generations`,
            cost: costs.kling.costCents,
        },
    ];

    return (
        <AbsoluteFill style={{ background: 'linear-gradient(135deg, #1a0a2e 0%, #3d1c6e 50%, #2d1250 100%)', justifyContent: 'center', alignItems: 'center', padding: 80 }}>
            <div style={{ fontSize: 18, color: '#c084fc', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 48, textAlign: 'center' }}>
                API Usage & Costs
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%', maxWidth: 800 }}>
                {services.map((svc, i) => {
                    const delay = i * 20;
                    const opacity = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
                    const barWidth = interpolate(frame, [delay + 10, delay + 40], [0, svc.cost / costs.totalCents], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

                    return (
                        <div key={svc.name} style={{ opacity }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <span style={{ fontSize: 28 }}>{svc.icon}</span>
                                    <div>
                                        <div style={{ color: 'white', fontSize: 20, fontWeight: 600 }}>{svc.name}</div>
                                        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>{svc.details}</div>
                                    </div>
                                </div>
                                <div style={{ color: svc.color, fontSize: 28, fontWeight: 700 }}>
                                    ${(svc.cost / 100).toFixed(2)}
                                </div>
                            </div>
                            <div style={{ width: '100%', height: 8, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden' }}>
                                <div style={{ width: `${barWidth * 100}%`, height: '100%', backgroundColor: svc.color, borderRadius: 4 }} />
                            </div>
                        </div>
                    );
                })}
            </div>
            <div style={{
                marginTop: 48,
                opacity: interpolate(frame, [80, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
                textAlign: 'center',
            }}>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, marginBottom: 8 }}>Total Cost</div>
                <div style={{ fontSize: 56, fontWeight: 800, color: '#fbbf24' }}>
                    ${(costs.totalCents / 100).toFixed(2)}
                </div>
            </div>
        </AbsoluteFill>
    );
};

// --- Final Video ---

const FinalSlide: React.FC<{ finalVideoUrl: string }> = ({ finalVideoUrl }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const scale = spring({ frame, fps, config: { damping: 15 } });

    return (
        <AbsoluteFill style={{ background: 'linear-gradient(135deg, #1a0a2e 0%, #3d1c6e 50%, #2d1250 100%)', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 18, color: '#4ade80', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 24 }}>
                    Final Video — FFmpeg Concatenation
                </div>
                <div style={{ transform: `scale(${scale})`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 25px 50px rgba(0,0,0,0.5)', border: '3px solid rgba(74,222,128,0.3)' }}>
                    <Video src={finalVideoUrl} style={{ width: 960, height: 540 }} />
                </div>
            </div>
        </AbsoluteFill>
    );
};

// --- Outro ---

const OutroSlide: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const scale = spring({ frame, fps, config: { damping: 15 } });

    return (
        <AbsoluteFill style={{ background: 'linear-gradient(135deg, #1a0a2e 0%, #3d1c6e 50%, #2d1250 100%)', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ textAlign: 'center', transform: `scale(${scale})` }}>
                <div style={{ fontSize: 56, fontWeight: 800, color: '#fbbf24', letterSpacing: -1 }}>VideoGenerator</div>
                <div style={{ fontSize: 22, color: 'rgba(255,255,255,0.5)', marginTop: 16 }}>From idea to video — powered by AI</div>
                <div style={{ display: 'flex', gap: 32, justifyContent: 'center', marginTop: 48 }}>
                    {['Anthropic Claude', 'Nano Banana', 'Kling AI', 'FFmpeg'].map(name => (
                        <div key={name} style={{ backgroundColor: 'rgba(255,255,255,0.08)', padding: '10px 24px', borderRadius: 24, color: '#c084fc', fontSize: 16, fontWeight: 500, border: '1px solid rgba(255,255,255,0.1)' }}>
                            {name}
                        </div>
                    ))}
                </div>
            </div>
        </AbsoluteFill>
    );
};

// --- Main ---

export interface HinduismShowcaseProps {
    characters: { name: string; url: string }[];
    frameUrls: string[];
    clips: ClipData[];
    finalVideoUrl: string;
    costs: CostData;
    musicFile?: string;
}

export const HinduismShowcase: React.FC<HinduismShowcaseProps> = ({
    characters, frameUrls, clips, finalVideoUrl, costs, musicFile,
}) => {
    const TITLE = 120;       // 4s
    const STAGE_INTRO = 60;  // 2s
    const SCRIPT = 150;      // 5s
    const CHARACTERS = 150;  // 5s
    const STORYBOARD = 150;  // 5s
    const CLIPS = 150;       // 5s
    const COSTS = 150;       // 5s
    const FINAL = 300;       // 10s
    const OUTRO = 90;        // 3s

    let offset = 0;
    const s: { from: number; duration: number; component: React.ReactNode }[] = [];

    s.push({ from: offset, duration: TITLE, component: <TitleSlide title="Hinduism — The Battle of Lanka" synopsis="A 30-second cinematic opening capturing the climactic moment of the Ramayana epic. Lord Rama draws his divine arrow to vanquish evil as the great battle reaches its peak." /> });
    offset += TITLE;

    s.push({ from: offset, duration: STAGE_INTRO, component: <StageIntro stageNumber={1} title="Script Writing" description="Chat with Claude AI to develop the Ramayana script" icon="✍️" color="#7c3aed" /> });
    offset += STAGE_INTRO;

    s.push({ from: offset, duration: SCRIPT, component: <ScriptSlide /> });
    offset += SCRIPT;

    s.push({ from: offset, duration: STAGE_INTRO, component: <StageIntro stageNumber={2} title="Characters" description="Generate 6 characters with Nano Banana API" icon="🎨" color="#f59e0b" /> });
    offset += STAGE_INTRO;

    s.push({ from: offset, duration: CHARACTERS, component: <CharactersSlide characters={characters} /> });
    offset += CHARACTERS;

    s.push({ from: offset, duration: STAGE_INTRO, component: <StageIntro stageNumber={3} title="Storyboard" description="Generate 10 storyboard frames for each scene" icon="🖼️" color="#10b981" /> });
    offset += STAGE_INTRO;

    s.push({ from: offset, duration: STORYBOARD, component: <StoryboardSlide frameUrls={frameUrls} /> });
    offset += STORYBOARD;

    s.push({ from: offset, duration: STAGE_INTRO, component: <StageIntro stageNumber={4} title="Video Generation" description="Create 9 video clips with Kling AI" icon="🎬" color="#ef4444" /> });
    offset += STAGE_INTRO;

    s.push({ from: offset, duration: CLIPS, component: <VideoClipsSlide clips={clips} /> });
    offset += CLIPS;

    s.push({ from: offset, duration: COSTS, component: <CostsSlide costs={costs} /> });
    offset += COSTS;

    s.push({ from: offset, duration: FINAL, component: <FinalSlide finalVideoUrl={finalVideoUrl} /> });
    offset += FINAL;

    s.push({ from: offset, duration: OUTRO, component: <OutroSlide /> });

    const totalFrames = offset + OUTRO;

    return (
        <AbsoluteFill style={{ backgroundColor: '#1a0a2e' }}>
            {musicFile && (
                <Audio
                    src={staticFile(musicFile)}
                    volume={(f) => {
                        const fadeIn = interpolate(f, [0, 60], [0, 0.3], { extrapolateRight: 'clamp' });
                        const fadeOut = interpolate(f, [totalFrames - 90, totalFrames], [0.3, 0], { extrapolateLeft: 'clamp' });
                        return Math.min(fadeIn, fadeOut);
                    }}
                />
            )}
            {s.map((section, i) => (
                <Sequence key={i} from={section.from} durationInFrames={section.duration}>
                    {section.component}
                </Sequence>
            ))}
        </AbsoluteFill>
    );
};
