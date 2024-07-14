import { v4 as uuidv4 } from 'uuid';
import { reformatDate } from '../../utils/reformatDate';

const id1 = uuidv4();
const id2 = uuidv4();
const id3 = uuidv4();

export const mockMessages = [
  {
    id: `${id1}-sent`,
    text: 'Hi',
    time: reformatDate(new Date('2023-07-11T10:00')),
    type: 'sent',
  },
  {
    id: `${id1}-received`,
    text: 'Hello! How can I assist you today?',
    time: reformatDate(new Date('2023-07-11T10:00')),
    type: 'received',
  },
  {
    id: `${id2}-sent`,
    text: 'What features do you have',
    time: reformatDate(new Date('2023-07-11T10:05')),
    type: 'sent',
  },
  {
    id: `${id2}-received`,
    text: 'I can assist you with a wide range of tasks! \nHere are some things I can help you with: \n- You can ask me questions \n- You can hide/show my sidebar \n- I have a side bar with a list of recent messages sorted by time, \n- Each item in the list contain a small menu with actions for resent and delete messages \n- And more!',
    time: reformatDate(new Date('2023-07-11T10:05')),
    type: 'received',
  },
  {
    id: `${id3}-sent`,
    text: 'Sounds good',
    time: reformatDate(new Date('2023-07-11T12:36')),
    type: 'sent',
  },
  {
    id: `${id3}-received`,
    text: 'Great! Lets start by asking me a question!',
    time: reformatDate(new Date('2023-07-11T12:36')),
    type: 'received',
  },
];
