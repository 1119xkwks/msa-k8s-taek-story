import "./Notification.css";
import { useState } from "react";
import Header from "../components/Header.jsx";
import AnchorHome from "../components/anchor/AnchorHome.jsx";
import DisplayMyName from "../components/display/DisplayMyName.jsx";
import AnchorSetting from "../components/anchor/AnchorSetting.jsx";
import RightMenuDrawer from "../components/drawer/RightMenuDrawer.jsx";

const Notification = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      group: "오늘",
      name: "홍길동",
      message: "님이 회원님의 게시글에 댓글을 남겼습니다",
      time: "5분 전",
      unread: true,
    },
    {
      id: 2,
      group: "오늘",
      name: "이영희",
      message: "님이 회원님을 팔로우하기 시작했습니다",
      time: "1시간 전",
      unread: true,
    },
    {
      id: 3,
      group: "이번 주",
      name: "김철수",
      message: "님이 회원님의 게시글을 좋아합니다",
      time: "어제",
      unread: false,
    },
    {
      id: 4,
      group: "이번 주",
      name: "운영팀",
      message: " 보안 알림: 새로운 기기에서 로그인되었습니다",
      time: "3일 전",
      unread: false,
    },
  ];

  const groups = [
    { key: "오늘", label: "오늘" },
    { key: "이번 주", label: "이번 주" },
  ];

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
              <button className="notification-page__btn">모두 읽음 처리</button>
              <button className="notification-page__btn">설정</button>
            </div>
          </div>

          {/* Filters */}
          <div className="notification-page__filters">
            <button className="notification-page__filter-btn notification-page__filter-btn--primary">
              전체
            </button>
            <button className="notification-page__filter-btn notification-page__filter-btn--secondary">
              읽지 않음
            </button>
          </div>

          {/* List */}
          <div className="notification-page__list">
            {groups.map((g) => {
              const items = notifications.filter((n) => n.group === g.key);
              if (items.length === 0) return null;
              return (
                <div key={g.key} className="p-0">
                  <div className="notification-page__group-header">
                    {g.label}
                  </div>
                  <ul className="notification-page__ul">
                    {items.map((n) => (
                      <li
                        key={n.id}
                        className={`notification-page__item ${n.unread ? "is-unread" : ""}`}
                      >
                        <div className="notification-page__row">
                          {/* Avatar */}
                          <div className="notification-page__avatar-wrap">
                            <div className="notification-page__avatar">
                              {n.name?.slice(0, 1) || "N"}
                            </div>
                            {n.unread && (
                              <span className="notification-page__badge"></span>
                            )}
                          </div>

                          {/* Content */}
                          <div className="notification-page__content">
                            <p className="notification-page__text">
                              <span className="notification-page__name">
                                {n.name}
                              </span>
                              <span className="notification-page__message">
                                {n.message}
                              </span>
                            </p>
                            <p className="notification-page__time">{n.time}</p>
                          </div>

                          {/* Actions */}
                          <div className="notification-page__item-actions">
                            <button className="notification-page__action-btn">
                              숨기기
                            </button>
                            <button className="notification-page__action-btn">
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
