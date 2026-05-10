import styles from "./feedback.module.css";

export interface FeedbackProps {
  type: "success" | "error";
  text: string;
}

export function Feedback({ type, text }: FeedbackProps) {
  const feedbackClassName =
    type === "success"
      ? `${styles.feedback} ${styles.feedbackSuccess}`
      : `${styles.feedback} ${styles.feedbackError}`;

  return <div className={feedbackClassName}>{text}</div>;
}