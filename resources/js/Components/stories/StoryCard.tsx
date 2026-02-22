import { Link, router } from '@inertiajs/react';
import { Story } from '@/types';
import StoryStatusBadge from './StoryStatusBadge';

export default function StoryCard({ story }: { story: Story }) {
    const handleDelete = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (confirm('Are you sure you want to delete this story?')) {
            router.delete(route('stories.destroy', story.id));
        }
    };

    return (
        <div className="relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
            {/* Action buttons */}
            <div className="absolute top-2 right-2 z-10 flex gap-1">
                <Link
                    href={route('stories.edit', story.id)}
                    className="rounded-full bg-white/80 p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-white shadow-sm backdrop-blur-sm transition-colors"
                    title="Edit"
                    onClick={(e) => e.stopPropagation()}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                        <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                        <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                    </svg>
                </Link>
                <button
                    onClick={handleDelete}
                    className="rounded-full bg-white/80 p-1.5 text-gray-500 hover:text-red-600 hover:bg-white shadow-sm backdrop-blur-sm transition-colors"
                    title="Delete"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                        <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.519.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 1 .7.798l-.2 4.5a.75.75 0 0 1-1.496-.066l.2-4.5a.75.75 0 0 1 .796-.731ZM11.42 7.72a.75.75 0 0 1 .796.731l.2 4.5a.75.75 0 1 1-1.496.066l-.2-4.5a.75.75 0 0 1 .7-.798Z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            <Link href={route('stories.show', story.id)} className="block">
                {story.final_video?.status === 'completed' && story.final_video.video_url && (
                    <video
                        src={story.final_video.video_url}
                        controls
                        muted
                        playsInline
                        className="w-full aspect-video object-cover"
                    />
                )}
                <div className="p-6">
                    <div className="flex items-start justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                            {story.title}
                        </h3>
                        <div className="flex items-center gap-2 shrink-0 ml-2">
                            {(story.total_cost_cents ?? 0) > 0 && (
                                <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
                                    ${((story.total_cost_cents ?? 0) / 100).toFixed(2)}
                                </span>
                            )}
                            <StoryStatusBadge status={story.status} />
                        </div>
                    </div>
                    {story.synopsis && (
                        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                            {story.synopsis}
                        </p>
                    )}
                    <p className="mt-4 text-xs text-gray-400">
                        Created {new Date(story.created_at).toLocaleDateString()}
                    </p>
                </div>
            </Link>
        </div>
    );
}
