import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGear} from "@fortawesome/free-solid-svg-icons";

const AnchorSetting = ({ clickHandler }) => {
  return (
    <div className="cursor-pointer" onClick={clickHandler}>
      <FontAwesomeIcon icon={faGear} />
    </div>
  )
}

export default AnchorSetting;