import "./Notification.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header.jsx";
import AnchorHome from "../components/anchor/AnchorHome.jsx";
import DisplayMyName from "../components/display/DisplayMyName.jsx";
import AnchorSetting from "../components/anchor/AnchorSetting.jsx";
import RightMenuDrawer from "../components/drawer/RightMenuDrawer.jsx";
import usePageTitle from "../hooks/usePageTitle.jsx";
import { API_BASE, apiFetch } from "/src/util/api.js";
import { $alert } from "../util/modals.js";
import { classifyDate } from "../util/common.js";
import { Avatar } from "flowbite-react";

const Notification = () => {
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [filterType, setFilterType] = useState("");

  usePageTitle("알림");

  const [notifications, setNotifications] = useState([]);
  const [userMap, setUserMap] = useState({});

  const groups = [
    { key: "today", label: "오늘" },
    { key: "lastweek", label: "이번 주" },
    { key: "old", label: "오래됨." },
  ];

  const setReadAll = async () => {
    try {
      const res = await apiFetch(
        `${API_BASE}/notification-service/notification/read/all`,
        {
          method: "GET",
        },
      );
      if (!res.ok) {
        await $alert("처리도중 에러가 발생하였습니다.");
        return;
      }
      const result = await res.text();
      setNotifications(notifications.map((x) => ({ ...x, isRead: true })));
    } catch (e) {
      console.error(e);
    }
  };

  const setRead = async (seq) => {
    if (!seq) {
      return;
    }
    try {
      const res = await apiFetch(
        `${API_BASE}/notification-service/notification/read/${seq}`,
        {
          method: "GET",
        },
      );
      if (!res.ok) {
        await $alert("처리도중 에러가 발생하였습니다.");
        return;
      }
      const result = await res.text();
      setNotifications(
        notifications.map((x) => (x.seq === seq ? { ...x, isRead: true } : x)),
      );
    } catch (e) {
      console.error(e);
    }
  };

  const selectNotification = async () => {
    try {
      const res = await apiFetch(
        `${API_BASE}/notification-service/notification/all`,
        {
          method: "GET",
        },
      );
      if (!res.ok) {
        await $alert("처리도중 에러가 발생하였습니다.");
        return;
      }
      const result = await res.json();
      setNotifications(
        result.map((x) => ({
          ...x,
          group: classifyDate(x.crtDt),
        })),
      );
    } catch (e) {
      console.error(e);
    }
  };

  // 최초 및 토스트에서 refreshAt 전달 시 재조회
  useEffect(() => {
    (async () => {
      await selectNotification();
    })();
  }, [location.state?.refreshAt]);

  // 알림 목록이 채워진 후: 사용자 기본정보 조회
  useEffect(() => {
    if (!notifications?.length) {
      return;
    }
    (async () => {
      let temp = notifications
        .filter((x) => x.fromUserSeq)
        .map((x) => x.fromUserSeq);
      const userSeqs = [...new Set(temp)];
      for (const x of userSeqs) {
        try {
          const res = await apiFetch(`/user-service/users/basic-info/${x}`, {
            method: "GET",
          });
          if (!res.ok) {
            await $alert("처리도중 에러가 발생하였습니다.");
            return;
          }
          const result = await res.json();
          setUserMap((prev) => ({
            ...prev,
            [x]: result,
          }));
        } catch (_e) {
          console.error(_e);
          return;
        }
      }
    })();
  }, [notifications]);

  return (
    <>
      {/*헤더*/}
      <Header
        left={<AnchorHome />}
        center={<DisplayMyName />}
        right={<AnchorSetting clickHandler={() => setIsMenuOpen(true)} />}
      />
      <div className="notification-page">
        <div className="notification-page__container">
          {/* Header */}
          <div className="notification-page__header">
            <h1 className="notification-page__title">알림</h1>
            <div className="notification-page__actions">
              <button
                className="notification-page__btn"
                onClick={() => setReadAll()}
              >
                모두 읽음 처리
              </button>
              {/*<button className="notification-page__btn">설정</button>*/}
            </div>
          </div>

          {/* Filters */}
          <div className="notification-page__filters">
            <button
              className={`notification-page__filter-btn notification-page__filter-btn--${filterType === "" ? "primary" : "secondary"}`}
              onClick={() => setFilterType("")}
            >
              전체
            </button>
            <button
              className={`notification-page__filter-btn notification-page__filter-btn--${filterType === "unread" ? "primary" : "secondary"}`}
              onClick={() => setFilterType("unread")}
            >
              읽지 않음
            </button>
          </div>

          {/* List */}
          <div className="notification-page__list">
            {groups.map((g) => {
              const items = notifications
                .filter((n) => {
                  switch (filterType) {
                    case "":
                      return true;
                    case "unread":
                      return !n.isRead;
                  }
                })
                .filter((n) => n.group === g.key);
              if (items.length === 0) return null;
              return (
                <div key={g.key} className="p-0">
                  <div className="notification-page__group-header">
                    {g.label}
                  </div>
                  <ul className="notification-page__ul">
                    {items.map((n) => (
                      <li
                        key={n.seq}
                        className={`notification-page__item ${n.unread ? "is-unread" : ""}`}
                      >
                        <div className="notification-page__row">
                          {/* Avatar */}
                          <div className="notification-page__avatar-wrap">
                            {userMap[n.fromUserSeq]?.fileProfileSeq ? (
                              <Avatar
                                className="poster-avatar"
                                img={`${API_BASE}/file-service/file/image/content/${userMap[n.fromUserSeq]?.fileProfileSeq}`}
                                alt={`${userMap[n.fromUserSeq]?.nickname} 프로필 이미지`}
                                rounded
                              />
                            ) : (
                              <div className="notification-page__avatar">
                                {n.name?.slice(0, 1) || "N"}
                              </div>
                            )}

                            {!n.isRead && (
                              <span className="notification-page__badge badge-blue"></span>
                            )}
                          </div>

                          {/* Content */}
                          <div className="notification-page__content">
                            <p className="notification-page__text">
                              <span className="notification-page__name">
                                {userMap[n.fromUserSeq]?.nickname}
                              </span>
                              <span className="notification-page__message">
                                {n.message}
                              </span>
                            </p>
                            <p className="notification-page__time">{n.time}</p>
                          </div>

                          {/* Actions */}
                          <div className="notification-page__item-actions">
                            <button
                              className="notification-page__action-btn"
                              onClick={() => setRead(n.seq)}
                            >
                              읽음
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/*사이드바*/}
      <RightMenuDrawer
        isMenuOpen={isMenuOpen}
        menuCloseHandler={() => setIsMenuOpen(false)}
      />
    </>
  );
};

export default Notification;
