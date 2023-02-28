import { React, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Segment, Header, Comment } from 'semantic-ui-react';
import { getSingleJob } from '../../utils/data/job';
import JobDetail from '../../components/JobDetail';
import { getJobMessages } from '../../utils/data/messages';
import Message from '../../components/Message';
import MessageForm from '../../components/MessageForm';
import Images from '../../components/Images';

function Job() {
  const [job, setJob] = useState({});
  const [messages, setMessages] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  const getTheContent = () => {
    getSingleJob(id).then(setJob);
    getJobMessages(id).then(setMessages);
  };

  const updateMessages = () => {
    getJobMessages(id).then(setMessages);
  };

  useEffect(() => {
    getTheContent();
  }, [router]);

  return (
    <>
      <JobDetail obj={job} />
      <Images imageArr={job.images} />
      <Segment>
        <Header as="h3">Messages</Header>
        <Comment.Group>
          {messages.map((i) => (
            <Message key={i.content} obj={i} onUpdate={updateMessages} />
          ))}
        </Comment.Group>
        <MessageForm obj={{}} job={job.id} onUpdate={updateMessages} />
      </Segment>
    </>
  );
}

export default Job;
