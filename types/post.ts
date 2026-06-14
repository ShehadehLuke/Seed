export interface Post {
    postTitle: string;
    postSubtitle: string;
    postAuthor: string;
    postBody: string;
    createdAt: string;
    tags: string[];
}

export interface PostThumbnail {
    postTitle: string;
    postSubtitle: string;
    postAuthor: string;
    tags: string[];
    postId: number;
}