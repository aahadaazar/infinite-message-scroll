import React, { useEffect, useRef, useState } from 'react';
import styles from './MessageApp.module.css';
import MessageIcon from '../../assets/message-icon.png'
import Loading from '../Loading/Loading';
import axios from 'axios';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import MessageBox from '../MessageBox/MessageBox';
import { calculateInViewMessage } from '../../utils/utils';
import Draggable from 'react-draggable';


function MessageApp() {
  const [messages, setMessages] = useState([]);
  const [pageToken, setPageToken] = useState();
  const [count] = useState(10);
  const [hideLoading, setHideLoading] = useState(false);
  const messageContainerRef = useRef(null);
  // const [messageIndex, setMessageIndex] = useState();

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
    if (isFetching) {
      return;
    }
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

  const onDragStart = event => {

  };

  const onDragStop = event => {
    // console.log(event.target.closest('.react-draggable-dragged'));
    console.log()
    let messageIndex = parseInt(event.path[3].closest('.react-draggable-dragged').getAttribute("message-index"));
    event.path[3].closest('.react-draggable-dragged').remove()
    console.log(messageIndex);
    const tempMessages = [...messages];
    tempMessages.splice(messageIndex, 1);
    setMessages(tempMessages);
    console.log('drag stopped');
  };

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
        {React.Children.toArray(messages.map((o, index) => {
          return <Draggable
            axis={"x"} bounds={{ top: 0, left: 0, right: 80 }}
            onStop={onDragStop}
            onStart={onDragStart}
          >
            <div message-index={index}>
              <MessageBox message={o} />
            </div>
          </Draggable>
        }))}
      </div>
    </div >
  )
}

export default MessageApp

