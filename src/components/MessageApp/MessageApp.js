import React, { useEffect, useRef, useState } from 'react';
import styles from './MessageApp.module.css';
import MessageIcon from '../../assets/message-icon.png'
import Loading from '../Loading/Loading';
import axios from 'axios';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import MessageBox from '../MessageBox/MessageBox';

function MessageApp() {
  const [messages, setMessages] = useState([]);
  const [pageToken, setPageToken] = useState();
  const [count] = useState(10);
  const [hideLoading, setHideLoading] = useState(false);
  const messageContainerRef = useRef(null);


  useEffect(() => {
    getMessages();
    // eslint-disable-next-line
  }, []);

  const getMessages = () => {
    axios.get(`http://message-list.appspot.com/messages?limit=${count}${pageToken ? `&pageToken?${pageToken}` : ''}`).then(res => {
      const { messages: newMessages, pageToken } = res.data;
      console.log(messages);
      setTimeout(() => {
        setMessages([...messages, ...newMessages]);
        if (!hideLoading) {
          setTimeout(() => {
            setHideLoading(true);
          }, 1000);
        }
      }, 1000);
      setPageToken(pageToken);
      setIsFetching(false);
    });
  }

  const [isFetching, setIsFetching] = useInfiniteScroll(getMessages, messageContainerRef.current);

  return (
    <div className={styles.appContainer}>
      <div className={styles.appStickyHeader}>
        <img id={styles.messageIcon} src={MessageIcon} alt='message-icon' />
        {'Messages'}
      </div>
      <div className={`${styles.loadingContainer}${messages.length > 0 ? ` ${styles.fadeOut}` : ''}${hideLoading ? ` ${styles.hidden}` : ''}`}>
        <Loading />
      </div>
      <div ref={messageContainerRef} className={styles.messagesContainer}>
        {React.Children.toArray(messages.map(o => {
          return <MessageBox message={o} />
        }))}
      </div>
    </div >
  )
}

export default MessageApp

