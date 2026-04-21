import {
  IconMoodHappy,
  IconUsers,
  IconShield,
  IconSun,
  IconBallBasketball,
  IconStar,
  IconHeartHandshake,
  IconAnchor,
  IconSpeakerphone,
  IconBook,
  IconMessageCircle,
  IconDeviceMobile,
  IconCookie,
  IconGhost,
  IconSword,
  IconHourglass,
  IconBellOff,
  IconCup,
  IconMapPinOff,
  IconBriefcase,
  IconBrain
} from '@tabler/icons-react';

const CATEGORY_MAP = {
  'Best Sense of Humor': {
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
  'Human Sunshine': {
    icon: IconSun,
    description: 'Always positive, smiling, and full of good vibes.',
  },
  'Most Athletic': {
    icon: IconBallBasketball,
    description: 'Always ready for sports or the gym.',
  },
  'Main Character Energy': {
    icon: IconStar,
    description: 'Naturally the center of attention.',
  },
  'Best Advice Giver': {
    icon: IconHeartHandshake,
    description: 'The go-to person when things get tough.',
  },
  'Most Dependable': {
    icon: IconAnchor,
    description: 'Always there when you need them most.',
  },
  'Ultimate Hype Man': {
    icon: IconSpeakerphone,
    description: 'Loudest cheerleader for everyone else.',
  },
  'Best Storyteller': {
    icon: IconBook,
    description: 'Can make a trip to the grocery store sound epic.',
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
  'Zero Sense of Direction': {
    icon: IconMapPinOff,
    description: 'Gets lost going to a classroom they’ve been to 100 times.',
  },
  'Chronic Over-Packer': {
    icon: IconBriefcase,
    description: 'Brings enough supplies for a week-long camping trip.',
  },
};

export function getCategoryConfig(name) {
  return CATEGORY_MAP[name] || { icon: IconBrain, description: '' };
}

export default CATEGORY_MAP;
