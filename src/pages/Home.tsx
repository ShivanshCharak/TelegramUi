import React, { useContext, useEffect, useRef, useState } from 'react';
import style from './home.module.css'; // Ensure the correct path to your CSS module
import ChatList from '../components/ChatList';
import ChatWindow from '../components/ChatWindow';
import { ChatIdContext } from '../context/ChatIdContext';

const Home: React.FC = () => {
  // State and refs initialization
  const underlineRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPopOver, setShowPopOver] = useState(false);
  const [showMenuDropdown, setShowMenuDropdown] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode
  const { chatId } = useContext(ChatIdContext);

  // Function to handle link click and adjust underline position
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.target as HTMLAnchorElement;
    const rect = target.getBoundingClientRect();
    const parentRect = target.closest(`.${style.options}`)!.getBoundingClientRect();

    if (underlineRef.current) {
      underlineRef.current.style.width = `${rect.width}px`;
      underlineRef.current.style.left = `${rect.left - parentRect.left}px`;
    }
  };

  // Effect to initialize underline position on first render
  useEffect(() => {
    const firstLink = document.querySelector(`.${style.options} > a`);
    if (firstLink && underlineRef.current) {
      const rect = firstLink.getBoundingClientRect();
      const parentRect = firstLink.closest(`.${style.options}`)!.getBoundingClientRect();
      underlineRef.current.style.width = `${rect.width}px`;
      underlineRef.current.style.left = `${rect.left - parentRect.left}px`;
    }
  }, []);

  // Handlers for input focus and blur
  const handleInputFocus = () => {
    setIsMenuOpen(true);
  };

  const handleInputBlur = () => {
    setIsMenuOpen(false);
  };

  // Handler for edit button click
  const handleEditClick = () => {
    setShowPopOver(prev => !prev);
  };

  // Handler for menu button click
  const handleMenuClick = () => {
    setShowMenuDropdown(prev => !prev);
  };

  // Handler for toggling dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <div className={`${style.mainPage} ${isDarkMode ? style.darkMode : ''}`}>
      <div className={style.contacts}>
        <div className={style.topbar}>
          <div className={style.inputContainer}>
            <i
              className={`fa-solid ${isMenuOpen ? 'fa-arrow-left' : 'fa-bars'} ${style.menuButton} ${showMenuDropdown ? style.active : ''}`}
              onClick={handleMenuClick}
            ></i>
            {showMenuDropdown && (
              <div className={`${style.menuDropdown} ${showMenuDropdown ? style.active : ''}`}>
                <ul onClick={handleMenuClick}>
                  <li><i className="fa-regular fa-bookmark"></i>Saved Messages</li>
                  <li><i className="fa-solid fa-box-archive"></i> Archived Chats</li>
                  <li><i className="fa-regular fa-user"></i> Contacts</li>
                  <li><i className="fa-solid fa-cog"></i> Settings</li>
                  <li onClick={toggleDarkMode}><i className={`fa-solid ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i> {isDarkMode ? 'Light Mode' : 'Dark Mode'}</li>
                  <li><i className="fa-solid fa-cog"></i> Animation</li>
                  <li><i className="fa-solid fa-bug"></i> Report Bug</li>
                  <li><i className="fa-solid fa-question"></i>Telegram features</li>
                  <li><i className="fa-solid fa-a"></i>Switch to A version</li>
                </ul>
                <span className={style.teleVersion}>Telegram Webk2.0.0(517)</span>
              </div>
            )}
            <input
              type="text"
              placeholder="Search"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          </div>
          <div className={style.options}>
            <a onClick={handleLinkClick}>All Chats</a>
            <a onClick={handleLinkClick}>Course Hub</a>
            <div className={style.underline} ref={underlineRef}></div>
          </div>
        </div>
        <div>
          <ChatList />
        </div>
        <div className={style.button}>
          <div onClick={handleEditClick} className={`${style.Edit} ${showPopOver ? style.active : ''}`}>
            {showPopOver ? <i className="fa-solid fa-xmark fa-2xl"></i> : <i className="fa-solid fa-pen fa-lg"></i>}
            {showPopOver && (
              <div className={`${style.popOver} ${showPopOver ? 'active' : ''}`}>
                <ul>
                  <li><i className="fa-solid fa-volume-low"></i> New Chat</li>
                  <li><i className="fa-solid fa-user"></i> New Group</li>
                  <li><i className="fa-solid fa-users"></i> New Private Group</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={style.chatSection}>
        {/* Render ChatWindow if chatId is not null */}
        {chatId !== null && <ChatWindow chatId={chatId} />}
      </div>
    </div>
  );
};

export default Home;
