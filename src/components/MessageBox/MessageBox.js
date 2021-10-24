import moment from 'moment';
import React from 'react';
import styles from './MessageBox.module.css';

function MessageBox({message}) {
  const { content, author, updated } = message;
  return (
    <div className={styles.messageBox}>
      <div className={styles.messageDetailContainer}>
        <img className={styles.avatarImg} src={`http://message-list.appspot.com${author.photoUrl}`} alt={author.name} />
        <div className={styles.authorDetails}>
          <p>{author.name}</p>
          <p>{moment(updated).fromNow()}</p>
        </div>
      </div>
      <div className={styles.messageText}>
        <p>
          {content}
        </p>
      </div>
    </div>
  )
}

export default MessageBox

