
import './Header.css'

const Header = ({left, center, right}) => {
  return (
    <header className="header">
      <div className="header-left">{left}</div>
      <div className="header-center">{center}</div>
      <div className="header-right">{right}</div>
    </header>
  )
};

export default Header