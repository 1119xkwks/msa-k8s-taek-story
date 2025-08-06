
import { Button, Card } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <Card className="not-found-card ">
        <div className="not-found-illustration">
          <FontAwesomeIcon icon={faExclamationTriangle} className="w-full h-full" />
        </div>
        
        <h1 className="not-found-title">404</h1>
        
        <h2 className="not-found-subtitle">존재하지 않은 페이지</h2>
        
        <p className="not-found-description">
          요청하신 페이지를 찾을 수 없습니다. 
          URL을 다시 확인하거나 홈페이지로 돌아가세요.
        </p>
        
        <Button 
          href="/" 
          className="not-found-button"
          gradientDuoTone="purpleToBlue"
        >
          <FontAwesomeIcon icon={faHome} className="not-found-button-icon" />
          홈으로 돌아가기
        </Button>
      </Card>
    </div>
  );
};

export default NotFound;