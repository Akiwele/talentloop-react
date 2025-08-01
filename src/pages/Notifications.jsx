import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import "../styles/Notifications.css";
import axios from "axios";
import CustomToast from "../components/CustomToast";

const NotificationPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState([]);
  const [requests, setRequests] = useState([]);
  const [toast, setToast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const currentUserString = sessionStorage.getItem("tl_user");
  const currentUser = currentUserString ? JSON.parse(currentUserString) : null;
  const BaseUrl = import.meta.env.VITE_BACKEND_URL;

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const getNotifications = async () => {
    if (!currentUser) return;
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${BaseUrl}/notifications/?userId=${currentUser?.userId}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser?.token}`,
          },
        }
      );
      setNotifications(res.data?.data || []);
    } catch (error) {
      showToast("error", error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getRequests = async () => {
    if (!currentUser) return;
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${BaseUrl}/requests/?userId=${currentUser?.userId}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser?.token}`,
          },
        }
      );
      setRequests(res.data?.data || []);
    } catch (error) {
      showToast("error", error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateRequest = async (requestId, newStatus) => {
    if (!currentUser) return;
    setIsLoading(true);
    try {
      const res = await axios.patch(
        `${BaseUrl}/requests/update?requestId=${requestId}&userId=${currentUser?.userId}&status=${newStatus}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${currentUser?.token}`,
          },
        }
      );
      showToast("success", res.data?.message || "Request updated");
      getRequests();
    } catch (error) {
      showToast("error", error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptRequest = (requestId) => {
    updateRequest(requestId, "APPROVED");
  };

  const handleDeclineRequest = (requestId) => {
    updateRequest(requestId, "DECLINED");
  };

  const markAsRead = (notificationId) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const combined = [
    ...notifications.map((n, index) => ({
      id: index + 1,
      type: "notification",
      message: n.message,
      timestamp: n.createdAt,
      read: true,
    })),
    ...requests.map((r) => ({
      id: r.id,
      type: "request",
      message: `${r.sender.username} wants to connect`,
      timestamp: r.sentAt,
      read: r.status !== "PENDING",
      requestData: r,
    })),
  ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  const getFilteredNotifications = () => {
    switch (activeTab) {
      case "unread":
        return combined.filter((n) => !n.read);
      case "approved":
        return combined.filter(
          (n) => n.type === "request" && n.requestData?.status === "APPROVED"
        );
      case "requests":
        return combined.filter((n) => n.type === "request");
      default:
        return combined;
    }
  };

  const getUnreadCount = () => combined.filter((n) => !n.read).length;
  const getApprovedCount = () =>
    combined.filter(
      (n) => n.type === "request" && n.requestData?.status === "APPROVED"
    ).length;
  const getRequestsCount = () =>
    combined.filter((n) => n.type === "request").length;

  useEffect(() => {
    getNotifications();
    getRequests();
  }, []);

  return (
    <div className="notification-container">
      <button
        className="back-icon"
        onClick={() => (window.location.href = "/explorepage")}
      >
        <ArrowLeft size={24} />
      </button>

      <div className="notification-header">
        <h1>Notifications</h1>
      </div>

      <div className="notification-tabs">
        <button
          className={`tab-button ${activeTab === "all" ? "active" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          All <span className="count">{combined.length}</span>
        </button>
        <button
          className={`tab-button ${activeTab === "unread" ? "active" : ""}`}
          onClick={() => setActiveTab("unread")}
        >
          Unread
          {getUnreadCount() > 0 && (
            <span className="count">{getUnreadCount()}</span>
          )}
        </button>
        <button
          className={`tab-button ${activeTab === "approved" ? "active" : ""}`}
          onClick={() => setActiveTab("approved")}
        >
          Approved
          {getApprovedCount() > 0 && (
            <span className="count">{getApprovedCount()}</span>
          )}
        </button>
        <button
          className={`tab-button ${activeTab === "requests" ? "active" : ""}`}
          onClick={() => setActiveTab("requests")}
        >
          Requests
          {getRequestsCount() > 0 && (
            <span className="count">{getRequestsCount()}</span>
          )}
        </button>
      </div>

      {isLoading ? (
        <div className="loading-state">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="notifications-list">
          {getFilteredNotifications().length === 0 ? (
            <div className="empty-state">
              <h3>No notifications</h3>
              <p>You're all caught up!</p>
            </div>
          ) : (
            getFilteredNotifications().map((n) => (
              <div
                key={n.id}
                className={`notification-item ${!n.read ? "unread" : ""}`}
                onClick={() => !n.read && markAsRead(n.id)}
              >
                {!n.read && <div className="unread-indicator"></div>}

                <div className="notification-content">
                  <div className="notification-text">
                    <p className="notification-message">{n.message}</p>
                    <p className="notification-timestamp">
                      {formatDate(n.timestamp)}
                    </p>
                  </div>

                  {n.type === "request" && (
                    <div className="notification-actions">
                      <button
                        className="action-button accept-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAcceptRequest(n.id);
                        }}
                      >
                        Accept
                      </button>
                      <button
                        className="action-button decline-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeclineRequest(n.id);
                        }}
                      >
                        Decline
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {toast && (
        <CustomToast
          type={toast?.type}
          message={toast?.message}
          duration={4000}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default NotificationPage;
