import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "/src/store/sessionSlice.js";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faEnvelope,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import "./Login.css";
import usePageTitle from "../hooks/usePageTitle.jsx";
import AnchorHome from "../components/anchor/AnchorHome.jsx";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", pw: "" });
  const [showPw, setShowPw] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  usePageTitle("로그인");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPw(!showPw);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // 간단한 유효성 검사
    if (!formData.email || !formData.pw) {
      setError("이메일과 비밀번호를 모두 입력해주세요.");
      setIsLoading(false);
      return;
    }

    if (!formData.email.includes("@")) {
      setError("올바른 이메일 형식을 입력해주세요.");
      setIsLoading(false);
      return;
    }

    // 실제 로그인 로직은 여기에 구현
    try {
      // TODO: 실제 로그인 API 호출 후 서버가 주는 사용자 정보(비번 제외)를 사용
      await new Promise((resolve) => setTimeout(resolve, 300));
      const profile = {
        email: formData.email,
        nickname: "Guest",
        roles: ["USER"],
      };
      dispatch(setUser(profile));
      navigate("/", { replace: true });
    } catch (err) {
      setError("로그인에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* 홈 버튼 */}
      <AnchorHome className="home-button text-gray-600" showText="홈으로" />

      <div className="login-container">
        {/* 로그인 제목 */}
        <div className="login-header">
          <h1 className="login-title">로그인</h1>
          <p className="login-subtitle">
            계정에 로그인하여 서비스를 이용하세요
          </p>
        </div>

        {/* 로그인 폼 */}
        <Card className="login-card">
          <form onSubmit={handleSubmit} className="login-form">
            {/* 이메일 입력 필드 */}
            <div className="input-group">
              <label htmlFor="email" className="input-label">
                이메일
              </label>
              <div className="input-container">
                <span className="input-icon-span">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="example@email.com"
                  className="input-field"
                  tabIndex="1"
                  required
                />
              </div>
            </div>

            {/* 비밀번호 입력 필드 */}
            <div className="input-group">
              <label htmlFor="password" className="input-label">
                비밀번호
              </label>
              <div className="input-container">
                <span className="input-icon-span">
                  <FontAwesomeIcon icon={faLock} />
                </span>
                <input
                  type={showPw ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="비밀번호를 입력하세요"
                  className="input-field"
                  autoComplete="off"
                  tabIndex="2"
                  required
                />
                <span
                  className="password-toggle-span"
                  onClick={togglePasswordVisibility}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      togglePasswordVisibility();
                    }
                  }}
                  tabIndex="3"
                  role="button"
                  aria-label={showPw ? "비밀번호 숨기기" : "비밀번호 보기"}
                >
                  <FontAwesomeIcon icon={showPw ? faEyeSlash : faEye} />
                </span>
              </div>
            </div>

            {/* 에러 메시지 */}
            {error && (
              <div className="error-message" role="alert" aria-live="polite">
                {error}
              </div>
            )}

            {/* 로그인 버튼 */}
            <Button
              type="submit"
              className="login-button justify-center"
              disabled={isLoading}
              color="blue"
              tabIndex="4"
            >
              {isLoading ? "로그인 중..." : "로그인"}
            </Button>
          </form>
        </Card>

        {/* 회원가입 링크 */}
        <div className="signup-link">
          계정이 없으신가요?{" "}
          <a href="/signup" tabIndex="5">
            회원가입
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
