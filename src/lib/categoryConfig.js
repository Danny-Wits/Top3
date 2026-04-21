import {
  IconMoodHappy,
  IconUsers,
  IconShield,
  IconMusic,
  IconSun,
  IconMoodSmile,
  IconBallBasketball,
  IconStar,
  IconCamera,
  IconShirt,
  IconMessageCircle,
  IconDeviceMobile,
  IconCookie,
  IconCar,
  IconSpeakerphone,
  IconGhost,
  IconSword,
  IconHourglass,
  IconBellOff,
  IconCup,
  IconBrain
} from '@tabler/icons-react';

const CATEGORY_MAP = {
  'Class Clown': {
    icon: IconMoodHappy,
    description: 'Always makes the whole room laugh.',
  },
  'Social Butterfly': {
    icon: IconUsers,
    description: 'Friends with literally everyone.',
  },
  'Group Mom / Dad': {
    icon: IconShield,
    description: 'Always looking out for the rest of us.',
  },
  'Best Playlist': {
    icon: IconMusic,
    description: 'The ultimate designated aux cord DJ.',
  },
  'Human Sunshine': {
    icon: IconSun,
    description: 'Always positive, smiling, and full of good vibes.',
  },
  'Best Smile': {
    icon: IconMoodSmile,
    description: 'Infectious smile that brightens the day.',
  },
  'Most Athletic': {
    icon: IconBallBasketball,
    description: 'Always ready for sports or the gym.',
  },
  'Main Character Energy': {
    icon: IconStar,
    description: 'Naturally the center of attention.',
  },
  'Most Likely to be Famous': {
    icon: IconCamera,
    description: 'Destined for the spotlight and millions of followers.',
  },
  'Best Drip': {
    icon: IconShirt,
    description: 'Always stepping out in the freshest fits.',
  },
  'Biggest Gossip': {
    icon: IconMessageCircle,
    description: 'The official source for spilled tea.',
  },
  'Phone Addict': {
    icon: IconDeviceMobile,
    description: 'Screen time completely off the charts.',
  },
  'Snack Bandit': {
    icon: IconCookie,
    description: 'Always asking for "just one bite".',
  },
  'Worst Driver': {
    icon: IconCar,
    description: 'Terrifying behind the wheel.',
  },
  'Chronic Exaggerator': {
    icon: IconSpeakerphone,
    description: 'Turns every small event into a Hollywood drama.',
  },
  'The Ghost': {
    icon: IconGhost,
    description: 'Rarely seen, impossible to track down.',
  },
  'Zombie Survivor': {
    icon: IconSword,
    description: 'Has a wild, strangely plausible backup plan for everything.',
  },
  'Serial Procrastinator': {
    icon: IconHourglass,
    description: 'Starts the assignment the night it’s due.',
  },
  'Sleeps Through Alarms': {
    icon: IconBellOff,
    description: 'Chronically late, every single time.',
  },
  'Caffeine Addict': {
    icon: IconCup,
    description: 'Blood type is practically 90% coffee at this point.',
  },
};

export function getCategoryConfig(name) {
  return CATEGORY_MAP[name] || { icon: IconBrain, description: '' };
}

export default CATEGORY_MAP;
