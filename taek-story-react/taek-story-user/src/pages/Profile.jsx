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
import { $alert } from "/src/util/modals.js";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "/src/store/sessionSlice.js";
import { makeMyProfileSrc } from "../util/common.js";
import usePageTitle from "../hooks/usePageTitle.jsx";

const Profile = () => {
  const user = useSelector(selectUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const fileRef = useRef(null);
  const dispatch = useDispatch();

  usePageTitle("프로필 이미지");

  const onSelectFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  // 로그인 정보 업데이트
  const updateProfile = async () => {
    try {
      const res = await apiFetch(`/user-service/users/me`, {
        method: "POST",
      });
      if (!res.ok) {
        dispatch(clearUser());
        return;
      }
      const result = await res.json();
      if (result) {
        dispatch(setUser(result));
      }
    } catch (_e) {
      console.error(_e);
    }
  };

  const onUpload = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) return;
    const form = new FormData();
    form.append("file", file);
    // user service를 이용해서 프로필 등록되게 구현 필요
    const response = await apiFetch("/user-service/users/profile/save", {
      method: "POST",
      body: form,
    });
    if (!response.ok) {
      await $alert("서버 에러입니다.");
      return;
    }
    // const contentType = response.headers.get("content-type") || "";
    // const result = contentType.includes("application/json")
    //   ? await response.json()
    //   : await response.text();
    const result = await response.json();

    // console.log("result", result, typeof result);
    if (!result) {
      await $alert(
        "처리 도중 에러가 발생하였습니다. 잠시 후 다시 시도해 주세요.",
      );
      return;
    }

    // 업로드 성공 후 미리보기 URL 해제
    URL.revokeObjectURL(previewUrl);
    setPreviewUrl("");
    fileRef.current.value = "";

    // 로그인 정보 - 프로필 번호 업데이트
    await updateProfile();
  };

  const loadMyProfile = () => {
    console.debug("user", user);
    if (!user?.fileProfileSeq) return; // 아직 세션 없음
    // 자기 자신 프로필 불러오는 작업
    setPreviewUrl(makeMyProfileSrc(user));
  };

  useEffect(() => {
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
              <img src={previewUrl} alt="프로필 이미지" className="" />
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
              accept="image/jpeg"
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
