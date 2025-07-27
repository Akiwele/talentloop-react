import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import '../styles/Notifications.css';

const NotificationPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'approval',
      from: 'Wilson',
      email: 'wiladdai@gmail.com',
      message: '@Wilson has approved your request. Email: wiladdai@gmail.com',
      timestamp: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'request',
      from: 'Sarah Johnson',
      email: 'sarah.j@gmail.com',
      message: 'Sarah Johnson sent you a connection request',
      timestamp: '5 hours ago',
      read: false
    },
    {
      id: 3,
      type: 'approval',
      from: 'Mike Chen',
      email: 'mike.chen@outlook.com',
      message: '@Mike Chen has approved your request. Email: mike.chen@outlook.com',
      timestamp: '1 day ago',
      read: true
    },
    {
      id: 4,
      type: 'request',
      from: 'Emily Davis',
      email: 'emily.davis@yahoo.com',
      message: 'Emily Davis sent you a connection request',
      timestamp: '2 days ago',
      read: false
    },
    {
      id: 5,
      type: 'sent_approval',
      to: 'John Smith',
      email: 'john.smith@gmail.com',
      message: 'You approved John Smith\'s request. Your email was sent: your.email@gmail.com',
      timestamp: '3 days ago',
      read: true
    }
  ]);

  const handleAcceptRequest = (notificationId, fromUser, fromEmail) => {
    // Remove the request from notifications
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
    
    // Add a new notification showing you approved their request
    const newNotification = {
      id: Date.now(),
      type: 'sent_approval',
      to: fromUser,
      email: fromEmail,
      message: `You approved ${fromUser}'s request. Your email was sent: your.email@gmail.com`,
      timestamp: 'Just now',
      read: true
    };
    
    setNotifications(prev => [newNotification, ...prev]);
  };

  const handleDeclineRequest = (notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
  };

  const getFilteredNotifications = () => {
    switch (activeTab) {
      case 'unread':
        return notifications.filter(n => !n.read);
      case 'approved':
        return notifications.filter(n => n.type === 'approval');
      case 'requests':
        return notifications.filter(n => n.type === 'request');
      default:
        return notifications;
    }
  };

  const getUnreadCount = () => notifications.filter(n => !n.read).length;
  const getApprovedCount = () => notifications.filter(n => n.type === 'approval').length;
  const getRequestsCount = () => notifications.filter(n => n.type === 'request').length;

  return (
    <div className="notification-container">
      <button className="back-icon" onClick={() => window.location.href = '/ExplorePage'}>
        <ArrowLeft size={24} />
      </button>

      <div className="notification-header">
        <h1>Notifications</h1>
      </div>

      <div className="notification-tabs">
        <button
          className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All
          <span className="count">{notifications.length}</span>
        </button>
        <button
          className={`tab-button ${activeTab === 'unread' ? 'active' : ''}`}
          onClick={() => setActiveTab('unread')}
        >
          Unread
          {getUnreadCount() > 0 && <span className="count">{getUnreadCount()}</span>}
        </button>
        <button
          className={`tab-button ${activeTab === 'approved' ? 'active' : ''}`}
          onClick={() => setActiveTab('approved')}
        >
          Approved
          {getApprovedCount() > 0 && <span className="count">{getApprovedCount()}</span>}
        </button>
        <button
          className={`tab-button ${activeTab === 'requests' ? 'active' : ''}`}
          onClick={() => setActiveTab('requests')}
        >
          Requests
          {getRequestsCount() > 0 && <span className="count">{getRequestsCount()}</span>}
        </button>
      </div>

      <div className="notifications-list">
        {getFilteredNotifications().length === 0 ? (
          <div className="empty-state">
            <h3>No notifications</h3>
            <p>You're all caught up!</p>
          </div>
        ) : (
          getFilteredNotifications().map(notification => (
            <div
              key={notification.id}
              className={`notification-item ${!notification.read ? 'unread' : ''}`}
              onClick={() => !notification.read && markAsRead(notification.id)}
            >
              {!notification.read && <div className="unread-indicator"></div>}
              
              <div className="notification-content">
                <div className="notification-text">
                  <p className="notification-message">{notification.message}</p>
                  <p className="notification-timestamp">{notification.timestamp}</p>
                </div>

                {notification.type === 'request' && (
                  <div className="notification-actions">
                    <button
                      className="action-button accept-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAcceptRequest(notification.id, notification.from, notification.email);
                      }}
                    >
                      Accept
                    </button>
                    <button
                      className="action-button decline-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeclineRequest(notification.id);
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
    </div>
  );
};

export default NotificationPage;