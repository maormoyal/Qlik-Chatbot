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
    text: 'The chatbot says Hi',
    time: reformatDate(new Date('2023-07-11T10:00')),
    type: 'received',
  },
  {
    id: `${id2}-sent`,
    text: 'How are you?',
    time: reformatDate(new Date('2023-07-11T10:05')),
    type: 'sent',
  },
  {
    id: `${id2}-received`,
    text: 'The chatbot says how are you?',
    time: reformatDate(new Date('2023-07-11T10:05')),
    type: 'received',
  },
  {
    id: `${id3}-sent`,
    text: 'What is your name',
    time: reformatDate(new Date('2023-07-11T12:36')),
    type: 'sent',
  },
  {
    id: `${id3}-received`,
    text: 'The chatbot says what is your name',
    time: reformatDate(new Date('2023-07-11T12:36')),
    type: 'received',
  },
];
