import axios from 'axios';
import { useState, useEffect } from 'react';

import './App.css';

import List from './components/List/List';
import Tasks from './components/Tasks/Tasks';
import DB from './services/db.json';


function App() {
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/colors').then(({ data }) => {
      setColors(data);
    });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks')
      .then(({ data }) => {
        data.map(item => {
          item.color = colors.filter(color => item.colorId === color.id)[0].hex;
          return item;
        })
        setLists(data);
      });
  }, [colors]);

  const onAddList = (obj) => {
    const newLists = [...lists, obj];
    setLists(newLists);
  }

  const onRemove = (id) => {
    const newLists = lists.filter(item => item.id !== id);
    setLists(newLists);
  }




  return (
    <div className='todo'>
      {lists && <List lists={lists} colors={colors} onAddList={onAddList} onRemove={onRemove}/>}
      {lists && <Tasks list={lists[1]}/>}
    </div>
  );
}

export default App;
