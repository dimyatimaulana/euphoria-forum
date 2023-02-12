import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ThreadInput from '../components/ThreadInput';
import ListThreads from '../components/ListThreads';
import Category from '../components/Category';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import { asyncAddThread, asyncUpvoteThread, asyncDownvoteThread } from '../states/threads/action';
import '../styles/HomePage.css';

function HomePage() {
  const {
    threads = [],
    users = [],
    authUser,
  } = useSelector((states) => states);

  const [selectedCategory, setSelectedCategory] = useState(''); // state buat nyimpen value category yg dipilih

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, dispatch);

  const createThread = ({ title, body, category }) => {
    dispatch(asyncAddThread({ title, body, category }));
  };

  const onUpVote = (id) => {
    dispatch(asyncUpvoteThread(id));
  };

  const onDownVote = (id) => {
    dispatch(asyncDownvoteThread(id));
  };

  const threadsList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser: authUser.id,
  }));

  // block di bawah buat nyari category yang suah difilter berdasarkan value di atas

  const categories = threads.map((thread) => (thread.category));

  // eslint-disable-next-line max-len
  const filteredCategories = categories.reduce((result, element) => (result.includes(element) ? result : [...result, element]), []);

  const filteredThreads = threadsList.filter(
    (thread) => thread.category.toLowerCase().includes(
      selectedCategory.toLocaleLowerCase(),
    ),
  );

  // const onFilteredThreads = () => {
  //   if (selectedCategory === null) {
  //     return threadsList;
  //   }
  //   return filteredThreads;
  // };

  return (
    <div className="flex">
      <div className="flex-3">
        <ThreadInput createThread={createThread} />
        <ListThreads threads={filteredThreads} like={onUpVote} dislike={onDownVote} />
      </div>
      <Category
        categories={filteredCategories}
        selectedCategory={setSelectedCategory}
      />
    </div>
  );
}

export default HomePage;
