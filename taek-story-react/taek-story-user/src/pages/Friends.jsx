import "./Friends.css";

import Header from "../components/Header.jsx";
import AnchorHome from "../components/anchor/AnchorHome.jsx";
import DisplayMyName from "../components/display/DisplayMyName.jsx";
import AnchorSetting from "../components/anchor/AnchorSetting.jsx";
import RightMenuDrawer from "../components/drawer/RightMenuDrawer.jsx";

import { useEffect, useState } from "react";
import { Avatar, Button, Card, TextInput } from "flowbite-react";
import { API_BASE, apiFetch } from "../util/api.js";
import { $alert } from "../util/modals.js";
import { useSelector } from "react-redux";
import { selectUser } from "../store/sessionSlice.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";

const Friends = () => {
  const loggedUser = useSelector(selectUser);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);

  const onSearch = async (e) => {
    e?.preventDefault?.();
    if (!keyword) {
      setResults([]);
      return;
    }
    await sendFriendSearch();
  };

  useEffect(() => {
    if (results) {
      (async () => {
        await sendFriendList();
      })();
    }
  }, []);

  const sendFriendList = async (e) => {
    try {
      const res = await apiFetch(`/user-service/friend/friends`);
      if (!res.ok) {
        await $alert("처리도중 에러가 발생하였습니다.");
        return;
      }
      const result = await res.json();
      setResults(result);
    } catch (_e) {
      console.error(_e);
      return;
    }
  };
  const sendFriendSearch = async (e) => {
    try {
      const res = await apiFetch(
        `/user-service/friend/search?keyword=${keyword}`,
      );
      if (!res.ok) {
        await $alert("처리도중 에러가 발생하였습니다.");
        return;
      }
      const result = await res.json();
      setResults(result);
    } catch (_e) {
      console.error(_e);
      return;
    }
  };
  const sendFriendRequest = async (seq) => {
    try {
      const res = await apiFetch(`/user-service/friend/request/${seq}`);
      if (!res.ok) {
        await $alert("처리도중 에러가 발생하였습니다.");
        return;
      }
      // const result = await res.json();
      await sendFriendSearch();
    } catch (_e) {
      console.error(_e);
      return;
    }
  };
  const sendFriendAccept = async (seq) => {
    try {
      const res = await apiFetch(`/user-service/friend/accept/${seq}`);
      if (!res.ok) {
        await $alert("처리도중 에러가 발생하였습니다.");
        return;
      }
      // const result = await res.json();
      await sendFriendSearch();
    } catch (_e) {
      console.error(_e);
      return;
    }
  };
  const sendFriendReject = async (seq) => {
    try {
      const res = await apiFetch(`/user-service/friend/reject/${seq}`);
      if (!res.ok) {
        await $alert("처리도중 에러가 발생하였습니다.");
        return;
      }
      // const result = await res.json();
      await sendFriendSearch();
    } catch (_e) {
      console.error(_e);
      return;
    }
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
            <input
              className="rounded-xl"
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
                    {user.fileProfileSeq ? (
                      <Avatar
                        className="poster-avatar"
                        img={`${API_BASE}/file-service/file/image/content/${user.fileProfileSeq}`}
                        alt={`${user.nickname} 프로필 이미지`}
                        rounded
                      />
                    ) : (
                      <div className="rounded-full bg-gray-300 w-10 h-10 flex items-center justify-center mr-2">
                        <FontAwesomeIcon
                          className="text-2xl"
                          icon={faUserTie}
                        />
                      </div>
                    )}

                    <div className="poster-name">
                      {user.nickname}{" "}
                      <span className="text-gray-800/50">({user.email})</span>
                    </div>
                  </div>
                  {user.seq === loggedUser?.seq ? (
                    <div className="friends-actions">(나)</div>
                  ) : (
                    <div className="friends-actions">
                      {/* 친구 상태별 버튼 */}
                      <div className="friends-action-group">
                        {user.friendStatus === "friend" && (
                          <span className="status-friend">친구</span>
                        )}
                        {user.friendStatus === "received" && (
                          <span className="status-request">친구 요청</span>
                        )}
                        {user.friendStatus === "requested" && (
                          <span className="status-sent">친구 요청 보냄</span>
                        )}
                        {user.friendStatus === "rejected" && (
                          <span className="status-declined">거절됨</span>
                        )}
                        {![
                          "friend",
                          "received",
                          "requested",
                          "rejected",
                        ].includes(user.friendStatus) && (
                          <Button
                            color="blue"
                            size="sm"
                            onClick={() => sendFriendRequest(user.seq)}
                          >
                            친구 요청
                          </Button>
                        )}
                      </div>
                      {user.friendStatus === "received" && (
                        <div className="friends-action-group">
                          <Button
                            color="green"
                            size="sm"
                            onClick={() => sendFriendAccept(user.seq)}
                          >
                            수락
                          </Button>
                          <Button
                            color="light"
                            size="sm"
                            onClick={() => sendFriendReject(user.seq)}
                          >
                            거절
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
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
