import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";

const AnchorHome = ({ showText, className = '' }) => {
  let iconClassName = '';

  if (showText) {
    iconClassName += 'mr-2';
  }

  return (
    <a href="/" className={className}>
      <FontAwesomeIcon icon={faHome} className={iconClassName} />
      {showText ? <span>{showText}</span> : ''}
    </a>
  )
}

export default AnchorHome;