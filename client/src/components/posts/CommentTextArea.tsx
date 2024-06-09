import Button from "@/components/Button";
import React from "react";

type Props = {
  cancelComment: () => void;
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
};

function CommentTextArea(props: Props) {
  return (
    <div className="border border-gray-400 rounded-2xl p-2">
      <textarea
        className="textarea h-14 no-scrollbar border-none"
        placeholder="Add a comment"
        autoFocus
        value={props.comment}
        onChange={(e) => props.setComment(e.target.value)}
      />

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          className="bg-grayscale-100 text-dark text-sm h-9 "
          onClick={props.cancelComment}
        >
          Cancel
        </Button>
        <Button type="submit" className="bg-dark text-white text-sm h-9">
          Comment
        </Button>
      </div>
    </div>
  );
}

export default CommentTextArea;
