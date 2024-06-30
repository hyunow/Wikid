import axios from "axios";
import { hardCodedToken } from "./articleApi";
import { CommentType } from "@lib/types/commentType";

export const getComments = async (
  targetId: string,
  limit: number = 10,
): Promise<CommentType[]> => {
  try {
    const res = await axios.get(
      `/api/6-6/articles/${targetId}/comments?limit=${limit}`,
    );
    return res.data.list;
  } catch (err) {
    console.error("댓글 불러오기 실패", err);
    throw err;
  }
};

export const postComment = async (
  targetId: string,
  content: string,
): Promise<CommentType> => {
  try {
    const commentData = {
      content,
    };

    const res = await axios.post<CommentType>(
      `/api/6-6/articles/${targetId}/comments`,
      commentData,
      {
        headers: {
          Authorization: `Bearer ${hardCodedToken}`,
        },
      },
    );

    return res.data;
  } catch (err: any) {
    console.error("댓글 등록 실패", err);
    throw err;
  }
};
