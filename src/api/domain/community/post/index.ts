import { del, get, post } from "@api/index.ts";
import { components, paths } from "@type/schema";
import { API_PATH } from "@api/constants/apiPath.ts";

/**
 * @description 게시글 조회 API
 * @param postId
 */

type postGetResponse =
  paths["/api/dev/posts/{postId}"]["get"]["responses"]["200"]["content"]["*/*"];

type postGetRequest = paths["/api/dev/posts/{postId}"]["get"]["requestBody"];

/**
 * @description 최근 검색어 조회 API
 */

export const getPost = async (postId: number) => {
  const { data } = await get<postGetResponse>(`${API_PATH.POST}/${postId}`);
  return data.data;
};

/**
 * @description 댓글 & 대댓글 조회 API
 */

export type commentGetResponse =
  paths["/api/dev/comments/{postId}"]["get"]["responses"]["200"]["content"]["*/*"];

export type commentGetResponseCommentType =
  components["schemas"]["CommentAndSubCommentsResponse"];

export type commentGetRequestSubCommentType =
  components["schemas"]["SubCommentResponse"];

export const getComments = async (postId: number) => {
  const { data } = await get<commentGetResponse>(
    `${API_PATH.COMMENTS}/${postId}`
  );
  return data.data?.comments;
};

/**
 * @description 댓글 삭제 API
 */

export type deleteCommentResponse =
  paths["/api/dev/comments/{commentId}"]["delete"]["responses"]["200"]["content"]["*/*"];

export const deleteComment = async (commentId: number | undefined) => {
  const { data } = await del<deleteCommentResponse>(
    `${API_PATH.COMMENTS}/${commentId}`
  );
  return data.data;
};

/**
 * @description 대댓글 삭제 API
 */

export type deleteSubCommentResponse =
  paths["/api/dev/comments/sub/{subCommentId}"]["delete"]["responses"]["200"]["content"]["*/*"];

export const deleteSubComment = async (subCommentId: number | undefined) => {
  const { data } = await del<deleteSubCommentResponse>(
    `${API_PATH.SUBCOMMENTS}/${subCommentId}`
  );
  return data.data;
};

/**
 * @description 게시글 삭제 API
 */

export type deletePostResponse =
  paths["/api/dev/posts/{postId}"]["delete"]["responses"]["200"]["content"]["*/*"];

export const deletePost = async (postId: number) => {
  const { data } = await del<deletePostResponse>(`${API_PATH.POST}/${postId}`);
  return data.data;
};

/**
 * @description 좋아요 추가 API
 * @param postId
 */

type likePostResponse =
  paths["/api/dev/likes/{postId}"]["post"]["responses"]["204"]["content"]["*/*"];

export const postLike = async (postId: string) => {
  const { data } = await post<likePostResponse>(`${API_PATH.LIKE}/${postId}`);
  return data;
};
/**
 * @description 좋아요 삭제 API
 * @param postId
 */

type likeDeleteResponse =
  paths["/api/dev/likes/{postId}"]["delete"]["responses"]["204"]["content"]["*/*"];

export const deleteLike = async (postId: string) => {
  const { data } = await del<likeDeleteResponse>(`${API_PATH.LIKE}/${postId}`);
  return data;
};

/**
 *
 */

type articlePostResponse =
  paths["/api/dev/posts"]["post"]["responses"]["200"]["content"]["*/*"];

export type articlePostRequest =
  paths["/api/dev/posts"]["post"]["requestBody"]["content"]["application/json"];

export const postArticle = async (params: articlePostRequest) => {
  const { data } = await post<articlePostResponse>(API_PATH.POST, params);
  return data;
};

/**
 * @description 댓글 작성 API
 */

type commentPostResponse =
  paths["/api/dev/comments/{postId}"]["post"]["responses"]["201"]["content"]["*/*"];

export const postComment = async (postId: number, content: string) => {
  const { data } = await post<commentPostResponse>(
    `${API_PATH.COMMENTS}/${postId}`,
    {
      content,
    }
  );
  return data;
};

/**
 * @description 대댓글 작성 API
 */

type subCommentPostResponse =
  paths["/api/dev/comments/sub/{commentId}"]["post"]["responses"]["201"]["content"]["*/*"];

export const postSubComment = async (content: {
  commentId: number | undefined;
  content: string;
  nickname: string;
}) => {
  const { data } = await post<subCommentPostResponse>(
    `${API_PATH.SUBCOMMENTS}/${content.commentId}`,
    {
      content: content.content,
      nickname: content.nickname,
    }
  );
  return data;
};
