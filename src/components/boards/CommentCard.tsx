import { useState } from "react";
import Image from "next/image";
import CardContainer from "@components/CardContainer";
import { CommentType } from "../../lib/types/commentType";
import CommentInput from "./CommentInput";
import { formatDate } from "@utils/dateFormatter";
import deleteIcon from "@icons/ic_delete.svg";
import editIcon from "@icons/ic_edit.svg";
import profileIcon from "@icons/ic_profile.svg";

interface CommentCardProps {
  comment: CommentType;
  onEditComment: (commentId: number, newContent: string) => void;
  onDeleteComment: (commentId: number) => void;
}

const CommentCard = ({
  comment,
  onEditComment,
  onDeleteComment,
}: CommentCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  return (
    <CardContainer className="mb-[24px] items-start py-[22px]">
      <div className="flex grow items-start gap-[20px]">
        <Image
          src={profileIcon}
          alt="기본 프로필 아이콘"
          width={50}
          height={50}
        />
        <div className="flex flex-col">
          <span className="mb-[6px] text-lg font-semibold">
            {comment.writer.name}
          </span>
          {isEditing ? (
            <CommentInput
              type="edit"
              initialContent={comment.content}
              className="mb-[10px]"
            />
          ) : (
            <span className="mb-[10px]">{comment.content}</span>
          )}
          <span className="text-gray400">
            {formatDate(new Date(comment.createdAt))}
          </span>
        </div>
      </div>
      <div className="flex gap-[20px]">
        {isEditing ? null : (
          <>
            <Image
              src={editIcon}
              alt="댓글 수정 아이콘"
              onClick={() => setIsEditing(true)}
              className="cursor-pointer"
            />
            <Image
              src={deleteIcon}
              alt="댓글 삭제 아이콘"
              className="cursor-pointer"
            />
          </>
        )}
      </div>
    </CardContainer>
  );
};

export default CommentCard;
