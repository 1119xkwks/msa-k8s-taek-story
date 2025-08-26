import "./Friends.css";

import Header from "../components/Header.jsx";
import AnchorHome from "../components/anchor/AnchorHome.jsx";
import DisplayMyName from "../components/display/DisplayMyName.jsx";
import AnchorSetting from "../components/anchor/AnchorSetting.jsx";
import RightMenuDrawer from "../components/drawer/RightMenuDrawer.jsx";
import PostCardHeader from "../components/post/PostCardHeader.jsx";

import { useEffect, useState } from "react";
import { Avatar, Button, Card, TextInput } from "flowbite-react";
import { API_BASE } from "../util/api.js";

const mockUsers = [
  {
    seq: 1,
    nickname: "홍길동",
    email: "hong@example.com",
    fileProfileSeq: 0,
  },
  {
    seq: 2,
    nickname: "김철수",
    email: "kim@example.com",
    fileProfileSeq: 0,
  },
  {
    seq: 3,
    nickname: "박영희",
    email: "park@example.com",
    fileProfileSeq: 0,
  },
];

const Friends = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    // 초기에는 빈 결과
    setResults([]);
  }, []);

  const onSearch = (e) => {
    e?.preventDefault?.();
    if (!keyword) {
      setResults([]);
      return;
    }
    // 백엔드 연동 전까지는 프론트 목 데이터로 필터
    const filtered = mockUsers.filter((u) =>
      u.nickname.toLowerCase().includes(keyword.toLowerCase()),
    );
    setResults(filtered);
  };

  return (
    <div className="friends-page">
      {/* 헤더 */}
      <Header
        left={<AnchorHome />}
        center={<DisplayMyName />}
        right={<AnchorSetting clickHandler={() => setIsMenuOpen(true)} />}
      />

      {/* 본문 */}
      <div className="friends-wrap">
        <Card className="friends-card">
          <h2 className="friends-title">친구 찾기</h2>
          <form className="friends-search" onSubmit={onSearch}>
            <TextInput
              type="text"
              placeholder="닉네임을 입력하세요"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <Button color="blue" type="submit">
              검색
            </Button>
          </form>
        </Card>

        <Card className="friends-card">
          <h3 className="friends-subtitle">검색 결과</h3>
          <div className="friends-list">
            {results.length === 0 ? (
              <div className="friends-empty">검색 결과가 없습니다.</div>
            ) : (
              results.map((user) => (
                <div key={user.seq} className="friends-item">
                  <div className="friends-user">
                    <Avatar
                      className="poster-avatar"
                      img={`${API_BASE}/file-service/file/image/content/1`}
                      alt={`11 프로필 이미지`}
                      rounded
                    />
                    <div className="poster-name">nickname</div>
                  </div>
                  <div className="friends-actions">
                    {/* 두 가지 상태 예시 */}
                    <div className="friends-action-group">
                      <Button color="blue" size="sm">
                        친구 요청
                      </Button>
                      <Button color="light" size="sm">
                        요청 보냄
                      </Button>
                      <Button color="failure" size="sm">
                        거절됨
                      </Button>
                    </div>
                    <div className="friends-action-group">
                      <Button color="success" size="sm">
                        수락
                      </Button>
                      <Button color="failure" size="sm">
                        거절
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
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

export default Friends;
