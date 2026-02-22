import { Composition } from 'remotion';
import { StoryVideo } from './compositions/StoryVideo';
import { PipelineShowcase } from './compositions/PipelineShowcase';
import { HinduismShowcase } from './compositions/HinduismShowcase';

// --- Noah's Ark data ---

const NOAHS_ARK_CHARACTER =
    'https://video-generator-poc.s3.us-east-1.amazonaws.com/stories/1/characters/05b9407c-f7b0-417e-a071-a1a8ac78db90.jpg';

const NOAHS_ARK_FRAMES = [
    'https://video-generator-poc.s3.us-east-1.amazonaws.com/stories/1/storyboard-frames/3367fef6-b9d8-46ed-ac6b-10bc6de21435.jpg',
    'https://video-generator-poc.s3.us-east-1.amazonaws.com/stories/1/storyboard-frames/62dc3a16-a4fb-4c4a-be69-6403b3e2e771.jpg',
    'https://video-generator-poc.s3.us-east-1.amazonaws.com/stories/1/storyboard-frames/b4089561-a053-48d6-a709-d955a9ad255f.jpg',
    'https://video-generator-poc.s3.us-east-1.amazonaws.com/stories/1/storyboard-frames/6b7b2ed9-f671-4f42-90c2-2da4f4babdd6.jpg',
    'https://video-generator-poc.s3.us-east-1.amazonaws.com/stories/1/storyboard-frames/f70b4c70-66f1-4f23-b067-180fde0c78c4.jpg',
    'https://video-generator-poc.s3.us-east-1.amazonaws.com/stories/1/storyboard-frames/0873ddc3-6f17-4647-b657-c032368441bc.jpg',
    'https://video-generator-poc.s3.us-east-1.amazonaws.com/stories/1/storyboard-frames/fa0ec1f7-5f4b-4eab-a08d-b1a30e717023.jpg',
    'https://video-generator-poc.s3.us-east-1.amazonaws.com/stories/1/storyboard-frames/37dfbca5-93ab-40f2-9e68-49269eb284a3.jpg',
    'https://video-generator-poc.s3.us-east-1.amazonaws.com/stories/1/storyboard-frames/f94f4aa3-f2c2-4907-b74f-f86a39de836b.jpg',
    'https://video-generator-poc.s3.us-east-1.amazonaws.com/stories/1/storyboard-frames/3274eb8b-8176-4fb5-bffb-ba347b37fc06.jpg',
];

const NOAHS_ARK_FINAL_VIDEO =
    'https://video-generator-poc.s3.us-east-1.amazonaws.com/stories/1/videos/final_1.mp4';

// --- Hinduism data ---

const S2 = 'https://video-generator-poc.s3.us-east-1.amazonaws.com/stories/2';

const HINDUISM_CHARACTERS = [
    { name: 'Rama', url: `${S2}/characters/ebd0c5cb-6db1-49cb-887a-b0da7f52584f.jpg` },
    { name: 'Lakshmana', url: `${S2}/characters/9d5d8318-130a-415f-a167-ca6508fb70ff.jpg` },
    { name: 'Sita', url: `${S2}/characters/70e2b2f6-8614-4c63-bc3e-72ee982b552f.jpg` },
    { name: 'Hanuman', url: `${S2}/characters/d1aaa908-5839-4c6b-aae2-e7f50d5e8de1.jpg` },
    { name: 'Ravana', url: `${S2}/characters/d89886c5-2a8c-4b4a-9c65-697131ddcaba.jpg` },
    { name: 'Demon Soldiers', url: `${S2}/characters/b7137e7f-ce07-49ad-828d-e84bb158f41c.jpg` },
];

const HINDUISM_FRAMES = [
    `${S2}/storyboard-frames/b454db38-08d5-4f99-8ae1-89baf05451b3.jpg`,
    `${S2}/storyboard-frames/e7974072-02b3-4b2d-b7dc-3b9074902dfd.jpg`,
    `${S2}/storyboard-frames/a0df5f74-6683-4e87-a228-58890bde16b2.jpg`,
    `${S2}/storyboard-frames/2b73d642-12e4-4209-a2d3-4bfcfa002c9d.jpg`,
    `${S2}/storyboard-frames/d8f7b397-2dc7-4f00-af5d-b6318fdfcc39.jpg`,
    `${S2}/storyboard-frames/36e2c7ee-3a60-418b-a0c1-6e498ab55be6.jpg`,
    `${S2}/storyboard-frames/54317240-c36e-4719-a1b1-d1b4d74d982b.jpg`,
    `${S2}/storyboard-frames/906d18ba-59ed-4f6a-b316-eefe5699d5b4.jpg`,
    `${S2}/storyboard-frames/73607562-95ca-4c70-a69a-94ac8298da4e.jpg`,
    `${S2}/storyboard-frames/6ebf5444-7cc7-4b9d-9f26-9ff897b19340.jpg`,
];

const HINDUISM_CLIPS = HINDUISM_FRAMES.slice(0, -1).map((url, i) => ({
    fromUrl: url,
    toUrl: HINDUISM_FRAMES[i + 1],
}));

const HINDUISM_FINAL_VIDEO = `${S2}/videos/b2cb3f84-0946-4813-99f4-42f0517b19c5.mp4`;

const HINDUISM_COSTS = {
    anthropic: { calls: 14, inputTokens: 31510, outputTokens: 12023, costCents: 27 },
    nanoBanana: { calls: 41, costCents: 369 },
    kling: { calls: 13, costCents: 650 },
    totalCents: 1046,
};

// Total: 4 + 2 + 5 + 2 + 5 + 2 + 5 + 2 + 5 + 5 + 10 + 3 = 50 seconds = 1500 frames
const HINDUISM_DURATION = 1500;
const SHOWCASE_DURATION = 1290;

export const RemotionRoot: React.FC = () => {
    return (
        <>
            <Composition
                id="HinduismShowcase"
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                component={HinduismShowcase as any}
                durationInFrames={HINDUISM_DURATION}
                fps={30}
                width={1920}
                height={1080}
                defaultProps={{
                    characters: HINDUISM_CHARACTERS,
                    frameUrls: HINDUISM_FRAMES,
                    clips: HINDUISM_CLIPS,
                    finalVideoUrl: HINDUISM_FINAL_VIDEO,
                    costs: HINDUISM_COSTS,
                    musicFile: 'music/billy_ziogas-pulpy-story-master-track-236196.mp3',
                }}
            />
            <Composition
                id="PipelineShowcase"
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                component={PipelineShowcase as any}
                durationInFrames={SHOWCASE_DURATION}
                fps={30}
                width={1920}
                height={1080}
                defaultProps={{
                    characterUrl: NOAHS_ARK_CHARACTER,
                    characterName: 'NOAH',
                    frameUrls: NOAHS_ARK_FRAMES,
                    finalVideoUrl: NOAHS_ARK_FINAL_VIDEO,
                    musicFile: 'music/billy_ziogas-pulpy-story-master-track-236196.mp3',
                }}
            />
            <Composition
                id="StoryVideo"
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                component={StoryVideo as any}
                durationInFrames={300}
                fps={30}
                width={1920}
                height={1080}
                defaultProps={{
                    frames: [],
                    transitionDurationInFrames: 30,
                }}
            />
        </>
    );
};
