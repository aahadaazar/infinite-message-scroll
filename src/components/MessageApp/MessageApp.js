import React, { useEffect, useRef, useState } from 'react';
import styles from './MessageApp.module.css';
import MessageIcon from '../../assets/message-icon.png'
import Loading from '../Loading/Loading';
import axios from 'axios';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import MessageBox from '../MessageBox/MessageBox';
import { calculateInViewMessage } from '../../utils/utils';

function MessageApp() {
  const [messages, setMessages] = useState([]);
  const [pageToken, setPageToken] = useState();
  const [count] = useState(10);
  const [hideLoading, setHideLoading] = useState(false);
  const messageContainerRef = useRef(null);

  useEffect(() => {
    if (messages.length > 0) {
      const length = messageContainerRef.current.children.length;
      setElementRef(messageContainerRef.current.children[calculateInViewMessage(length)]);
    }
    // eslint-disable-next-line
  }, [messages]);

  useEffect(() => {
    getMessages();
    // eslint-disable-next-line
  }, []);

  const getMessages = () => {
    console.log('getting messages');
    setIsFetching(true);
    axios.get(`http://message-list.appspot.com/messages?limit=${count}${pageToken ? `&pageToken?${pageToken}` : ''}`).then(res => {
      setIsFetching(false);
      const { messages: newMessages, pageToken } = res.data;
      setMessages([...messages, ...newMessages]);
      if (!hideLoading) {
        setTimeout(() => {
          setHideLoading(true);
        }, 1000);
      }
      setPageToken(pageToken);
    });
  }

  const [isFetching, setIsFetching, setElementRef] = useInfiniteScroll(getMessages);

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

