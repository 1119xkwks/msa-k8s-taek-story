import "./MyCard.css";

const MyCard = ({ children, className }) => {
  return <div className={`my-card ${className}`}>{children}</div>;
};

export default MyCard;
