import "./Profile.css";
import { useEffect, useRef, useState } from "react";
import Header from "/src/components/Header.jsx";
import AnchorHome from "/src/components/anchor/AnchorHome.jsx";
import DisplayMyName from "/src/components/display/DisplayMyName.jsx";
import AnchorSetting from "/src/components/anchor/AnchorSetting.jsx";
import RightMenuDrawer from "/src/components/drawer/RightMenuDrawer.jsx";
import { Button, Card } from "flowbite-react";
import { API_BASE, apiFetch } from "/src/util/api.js";
import MyDivider from "../components/layout/MyDivider.jsx";
import { useSelector } from "react-redux";
import { selectUser } from "../store/sessionSlice.js";

const Profile = () => {
  const user = useSelector(selectUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const fileRef = useRef(null);

  const onSelectFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const onUpload = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) return;
    const form = new FormData();
    form.append("file", file);
    const response = await apiFetch("/file-service/file/upload/profile", {
      method: "POST",
      body: form,
    });
    if (!response.ok) {
      return;
    }
    const contentType = response.headers.get("content-type") || "";
    const result = contentType.includes("application/json")
      ? await response.json()
      : await response.text();

    // 업로드 성공 후 미리보기 URL 해제
    URL.revokeObjectURL(previewUrl);
    setPreviewUrl("");
    fileRef.current.value = "";
  };

  const loadMyProfile = async () => {
    if (!user) return; // 아직 세션 없음
    const { seq } = user; // 필요 키 사용
    console.debug("user", user);
    // setPreviewUrl(`${API_BASE}/file-service/file/view/profile`);
  };

  useEffect(() => {
    console.debug("useEffect");
    loadMyProfile();
  }, [user]);

  return (
    <div className="profile-page">
      {/* 헤더 */}
      <Header
        left={<AnchorHome />}
        center={<DisplayMyName />}
        right={<AnchorSetting clickHandler={() => setIsMenuOpen(true)} />}
      />

      {/* 본문 */}
      <div className="profile-wrap">
        <Card className="profile-card">
          <h2 className="profile-title">현재 프로필 이미지</h2>
          <div className="profile-preview">
            {previewUrl ? (
              <img src={previewUrl} alt="preview" className="" />
            ) : (
              <div className="profile-hint">
                이미지를 선택하면 미리보기가 표시됩니다
              </div>
            )}
          </div>
        </Card>

        <Card className="profile-card">
          <h2 className="profile-title">프로필 이미지 업로드</h2>
          <div className="">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={onSelectFile}
              className="profile-file-input"
            />
            <MyDivider className="my-3" />
            <div className="profile-actions">
              <Button onClick={onUpload} color="blue">
                업로드
              </Button>
              <Button
                color="light"
                onClick={() => {
                  fileRef.current.value = "";
                  setPreviewUrl("");
                }}
              >
                취소
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* 사이드바 */}
      <RightMenuDrawer
        isMenuOpen={isMenuOpen}
        menuCloseHandler={() => setIsMenuOpen(false)}
      />
    </div>
  );
};

export default Profile;
