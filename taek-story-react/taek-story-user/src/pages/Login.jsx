import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE, apiFetch } from "/src/util/api.js";
import { Button, Card } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faEnvelope,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import "./Login.css";
import usePageTitle from "/src/hooks/usePageTitle.jsx";
import AnchorHome from "/src/components/anchor/AnchorHome.jsx";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "/src/store/sessionSlice.js";

const Login = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [formData, setFormData] = useState({ email: "", pw: "" });
  const [showPw, setShowPw] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  usePageTitle("로그인");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

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
      const res = await apiFetch(`/user-service/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (result < 1) {
        setError("회원 정보가 존재하지 않습니다.");
        return false;
      }
      // 로그인 성공
      navigate("/", { replace: true });
    } catch (err) {
      setError("서버 에러입니다.. 다시 시도해주세요.");
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
                  id="pw"
                  name="pw"
                  value={formData.pw}
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
