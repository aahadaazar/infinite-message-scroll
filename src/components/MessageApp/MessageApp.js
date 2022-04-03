import React, { useEffect, useRef, useState } from 'react';
import styles from './MessageApp.module.css';
import MessageIcon from '../../assets/message-icon.png'
import Loading from '../Loading/Loading';
import axios from 'axios';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import MessageBox from '../MessageBox/MessageBox';
import { calculateInViewMessage } from '../../utils/utils';
// import Draggable from 'react-draggable';


function MessageApp() {
  // list of messages
  const [messages, setMessages] = useState([]);
  // page token, gets updated whenever fresh messages are recieved
  const [pageToken, setPageToken] = useState();
  // static count for messages, can be hard-coded in url as well
  const [count] = useState(10);
  // flag for loading state
  const [hideLoading, setHideLoading] = useState(false);
  // reference for message scroll container, to remove dom element that is swipped to delete
  const messageContainerRef = useRef(null);


  // this use effect will check whenever messages are updated, and sets up the 5rd last element from end for interaction observer to work
  useEffect(() => {
    if (messages.length > 0) {
      const length = messageContainerRef.current.children.length;
      setElementRef(messageContainerRef.current.children[calculateInViewMessage(length)]);
    }
    // eslint-disable-next-line
  }, [messages]);

  // on initial load, gets 10 messages
  useEffect(() => {
    getMessages();
    // eslint-disable-next-line
  }, []);

  // general function to get messages, uses axios to fetch data from given api
  const getMessages = () => {
    if (isFetching) {
      return;
    }
    console.log('getting messages');
    setIsFetching(true);
    axios.get(`https://message-list.appspot.com/messages?limit=${count}${pageToken ? `&pageToken?${pageToken}` : ''}`).then(res => {
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

  // custom hook for infinite scroll
  const [isFetching, setIsFetching, setElementRef] = useInfiniteScroll(getMessages);

  // on message drag, whenever drag ends, message is deleted
  // eslint-disable-next-line
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
      {/* Messaging header with name and icon */}
      <div className={styles.appStickyHeader}>
        <img id={styles.messageIcon} src={MessageIcon} alt='message-icon' />
        {'Messages'}
      </div>
      {/* Loading Container, which displays on first time load*/}
      <div className={`${styles.loadingContainer}${messages.length > 0 ? ` ${styles.fadeOut}` : ''}${hideLoading ? ` ${styles.hidden}` : ''}`}>
        <Loading />
      </div>
      {/* Message List Container */}
      <div ref={messageContainerRef} className={styles.messagesContainer}>
        {/* React.Children.toArray is used to avoid id as keys */}
        {/* {React.Children.toArray(messages.map((o, index) => { */}
        {/* return <Draggable */}
        {/* axis={"x"} bounds={{ top: 0, left: 0, right: 80 }} */}
        {/* onStop={onDragStop}> */}
        {/* for draggable reference */}
        {/* <div message-index={index}> */}
        {/* message details container */}
        {/* <MessageBox message={o} /> */}
        {/* </div> */}
        {/* </Draggable> */}
        {/* }))} */}
        {React.Children.toArray(messages.map((o, index) => {
          return <MessageBox message={o} />
        }))}
      </div>
    </div >
  )
}

export default MessageApp

