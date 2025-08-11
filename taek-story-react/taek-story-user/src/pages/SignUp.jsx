import { useState } from "react";
import { Button, Card } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faEnvelope,
  faLock,
  faUser,
  faCalendar,
  faPhone,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import "./SignUp.css";
import usePageTitle from "../hooks/usePageTitle";
import AnchorHome from "../components/anchor/AnchorHome.jsx";

const SignUp = () => {
  const API_BASE = (import.meta.env && import.meta.env.VITE_API_BASE) || "";
  const [formData, setFormData] = useState({
    email: "",
    pw: "",
    pwChk: "",
    nickname: "",
    birth: "",
    phone: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  usePageTitle("회원가입");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // 유효성 검사
    if (
      !formData.email ||
      !formData.pw ||
      !formData.pwChk ||
      !formData.nickname ||
      !formData.birth ||
      !formData.phone
    ) {
      setError("모든 필드를 입력해주세요.");
      setIsLoading(false);
      return;
    }

    if (!formData.email.includes("@")) {
      setError("올바른 이메일 형식을 입력해주세요.");
      setIsLoading(false);
      return;
    }

    if (formData.pw !== formData.pwChk) {
      setError("비밀번호가 일치하지 않습니다.");
      setIsLoading(false);
      return;
    }

    if (formData.pw.length < 6) {
      setError("비밀번호는 최소 6자 이상이어야 합니다.");
      setIsLoading(false);
      return;
    }

    // 실제 회원가입 로직은 여기에 구현
    try {
      // API 호출
      const res = await fetch(`${API_BASE}/user-service/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          pw: formData.pw,
          pwChk: formData.pwChk,
          nickname: formData.nickname,
          birth: formData.birth,
          phone: formData.phone,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "회원가입 실패");
      }

      // 성공 시 로그인 페이지로 이동
      window.location.href = "/login";
    } catch (err) {
      setError(err.message || "회원가입에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="sign-up-page">
      {/* 홈 버튼 */}
      <AnchorHome className="home-button text-gray-600" showText="홈으로" />

      <div className="sign-up-container">
        {/* 회원가입 제목 */}
        <div className="sign-up-header">
          <h1 className="sign-up-title">회원가입</h1>
          <p className="sign-up-subtitle">
            새로운 계정을 만들어 서비스를 이용하세요
          </p>
        </div>

        {/* 회원가입 폼 */}
        <Card className="sign-up-card">
          <form onSubmit={handleSubmit} className="sign-up-form">
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
              <label htmlFor="pw" className="input-label">
                비밀번호
              </label>
              <div className="input-container">
                <span className="input-icon-span">
                  <FontAwesomeIcon icon={faLock} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  id="pw"
                  name="pw"
                  value={formData.pw}
                  onChange={handleInputChange}
                  placeholder="비밀번호를 입력하세요"
                  className="input-field"
                  tabIndex="2"
                  required
                  autoComplete="off"
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
                  aria-label={
                    showPassword ? "비밀번호 숨기기" : "비밀번호 보기"
                  }
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
              </div>
            </div>

            {/* 비밀번호 확인 입력 필드 */}
            <div className="input-group">
              <label htmlFor="pwChk" className="input-label">
                비밀번호 확인
              </label>
              <div className="input-container">
                <span className="input-icon-span">
                  <FontAwesomeIcon icon={faLock} />
                </span>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="pwChk"
                  name="pwChk"
                  value={formData.pwChk}
                  onChange={handleInputChange}
                  placeholder="비밀번호를 다시 입력하세요"
                  className="input-field"
                  tabIndex="4"
                  required
                  autoComplete="off"
                />
                <span
                  className="password-toggle-span"
                  onClick={toggleConfirmPasswordVisibility}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleConfirmPasswordVisibility();
                    }
                  }}
                  tabIndex="5"
                  role="button"
                  aria-label={
                    showConfirmPassword ? "비밀번호 숨기기" : "비밀번호 보기"
                  }
                >
                  <FontAwesomeIcon
                    icon={showConfirmPassword ? faEyeSlash : faEye}
                  />
                </span>
              </div>
            </div>

            {/* 닉네임 입력 필드 */}
            <div className="input-group">
              <label htmlFor="nickname" className="input-label">
                닉네임
              </label>
              <div className="input-container">
                <span className="input-icon-span">
                  <FontAwesomeIcon icon={faUser} />
                </span>
                <input
                  type="text"
                  id="nickname"
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleInputChange}
                  placeholder="닉네임을 입력하세요"
                  className="input-field"
                  tabIndex="6"
                  required
                />
              </div>
            </div>

            {/* 생년월일 입력 필드 */}
            <div className="input-group">
              <label htmlFor="birth" className="input-label">
                생년월일
              </label>
              <div className="input-container">
                <span className="input-icon-span">
                  <FontAwesomeIcon icon={faCalendar} />
                </span>
                <input
                  type="date"
                  id="birth"
                  name="birth"
                  value={formData.birth}
                  onChange={handleInputChange}
                  className="input-field"
                  tabIndex="7"
                  required
                />
              </div>
            </div>

            {/* 핸드폰번호 입력 필드 */}
            <div className="input-group">
              <label htmlFor="phone" className="input-label">
                핸드폰번호
              </label>
              <div className="input-container">
                <span className="input-icon-span">
                  <FontAwesomeIcon icon={faPhone} />
                </span>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="010-1234-5678"
                  className="input-field"
                  tabIndex="8"
                  required
                />
              </div>
            </div>

            {/* 에러 메시지 */}
            {error && (
              <div className="error-message" role="alert" aria-live="polite">
                {error}
              </div>
            )}

            {/* 회원가입 버튼 */}
            <Button
              type="submit"
              className="sign-up-button"
              disabled={isLoading}
              color="blue"
              tabIndex="9"
            >
              {isLoading ? "회원가입 중..." : "회원가입"}
            </Button>
          </form>
        </Card>

        {/* 로그인 링크 */}
        <div className="login-link">
          이미 계정이 있으신가요?{" "}
          <a href="/login" tabIndex="10">
            로그인
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
