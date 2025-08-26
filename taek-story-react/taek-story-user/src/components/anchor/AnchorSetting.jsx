import "./AnchorSetting.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

const AnchorSetting = ({ clickHandler, showBadge = false }) => {
  return (
    <div className="cursor-pointer anchor-setting" onClick={clickHandler}>
      <FontAwesomeIcon icon={faGear} />

      {showBadge ? (
        <span className="anchor-setting__badge badge-blue"></span>
      ) : null}
    </div>
  );
};

export default AnchorSetting;
