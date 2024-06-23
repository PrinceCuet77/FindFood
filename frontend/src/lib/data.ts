import ManWithBeard from '../assets/avatars/man-with-beard.jpg';
import LatinWoman from '../assets/avatars/beautiful-latin-woman.jpg';
import SimpleMan from '../assets/avatars/simple-man.jpg';
import WomanWithRedHair from '../assets/avatars/beautiful-woman-red-hair.jpg';
import BlackManWithBeard from '../assets/avatars/black-man-with-beard.jpg';
import OldMan from '../assets/avatars/old-man-with-beard-wearing-glasses.jpg';

import { Angry, Frown, Heart, Laugh, ThumbsUp } from 'lucide-react';

export const avatars = [
  {
    id: 'a1',
    image: {
      src: ManWithBeard,
      alt: 'A Man With Beard',
    },
  },
  {
    id: 'a2',
    image: {
      src: LatinWoman,
      alt: 'A Beautiful Latin Woman',
    },
  },
  {
    id: 'a3',
    image: {
      src: SimpleMan,
      alt: 'A Simple Man',
    },
  },
  {
    id: 'a4',
    image: {
      src: WomanWithRedHair,
      alt: 'A Beautiful Woman With Red Hair',
    },
  },
  {
    id: 'a5',
    image: {
      src: BlackManWithBeard,
      alt: 'A Black Man With Beard',
    },
  },
  {
    id: 'a6',
    image: {
      src: OldMan,
      alt: 'An Old Man With Beard Wearing Glasses',
    },
  },
];

export const reacts = [
  {
    id: 'r1',
    Icon: ThumbsUp,
    reactions: 3,
  },
  {
    id: 'r2',
    Icon: Heart,
    reactions: 30,
  },
  {
    id: 'r3',
    Icon: Laugh,
    reactions: 8,
  },
  {
    id: 'r4',
    Icon: Frown,
    reactions: 121,
  },
  {
    id: 'r5',
    Icon: Angry,
    reactions: 30,
  },
];
