import {
  IconMoodHappy, IconUsers, IconShield, IconSun, IconBallBasketball, IconStar, IconHeart,
  IconMessageCircle, IconDeviceMobile, IconCookie, IconGhost, IconHourglass, IconBellOff, IconCup,
  IconApple, IconMoodCry, IconPill, IconLock, IconUserCheck, IconSword, IconMicrophone, IconCoins,
  IconHeartBroken, IconZzz, IconSticker, IconVideo, IconBiohazard, IconBrain
} from '@tabler/icons-react';

const CATEGORY_MAP = {
  // Positive
  'Best Sense of Humor': { icon: IconMoodHappy, description: 'Always makes the whole room laugh.' },
  'Social Butterfly': { icon: IconUsers, description: 'Friends with literally everyone.' },
  'Group Mom / Dad': { icon: IconShield, description: 'Always looking out for the rest of us.' },
  'Human Sunshine': { icon: IconSun, description: 'Always positive, smiling, and full of good vibes.' },
  'Most Athletic': { icon: IconBallBasketball, description: 'Always ready for sports or the gym.' },
  'Main Character Energy': { icon: IconStar, description: 'Naturally the center of attention.' },
  'Class Crush': { icon: IconHeart, description: 'The one everyone secretly (or openly) likes.' },
  'Sticker King': { icon: IconSticker, description: 'Has a meme or sticker for every possible situation.' },
  'Content Machine': { icon: IconVideo, description: 'Always recording, snapping, or vlogging the moment.' },
  'Big Brain Energy': { icon: IconBrain, description: 'The actual human ChatGPT. Hard carries group projects.' },

  // Negative / Funny
  'Biggest Gossip': { icon: IconMessageCircle, description: 'The official source for spilled tea.' },
  'Phone Addict': { icon: IconDeviceMobile, description: 'Screen time completely off the charts.' },
  'Snack Bandit': { icon: IconCookie, description: 'Always asking for "just one bite".' },
  'The Ghost': { icon: IconGhost, description: 'Rarely seen, impossible to track down.' },
  'Serial Procrastinator': { icon: IconHourglass, description: 'Starts the assignment the night it’s due.' },
  'Sleeps Through Alarms': { icon: IconBellOff, description: 'Chronically late, every single time.' },
  'Caffeine Addict': { icon: IconCup, description: 'Blood type is practically 90% coffee.' },
  'Teacher\'s Pet': { icon: IconApple, description: 'Always knows the answer, sits in the front row.' },
  'Easily Emotional': { icon: IconMoodCry, description: 'Will cry over a slightly sad commercial.' },
  'Looks Dangerous': { icon: IconBiohazard, description: 'Has an intimidating aura, but is actually a softie.' },
  'Looks Like a Drug Addict': { icon: IconPill, description: 'Sleep-deprived, unkempt, running on pure chaos.' },

  // Most Likely To
  'Most Likely to Get Arrested': { icon: IconLock, description: 'Definitely an accomplice to a bank heist.' },
  'Most Likely to Ask for Proxy': { icon: IconUserCheck, description: '"Bro, please mark my attendance!"' },
  'Most Likely to Survive a Zombie Apocalypse': { icon: IconSword, description: 'Has a wild, strangely plausible backup plan.' },
  'Most Likely to Get Brutally Rejected': { icon: IconHeartBroken, description: '"Shoot your shot" they said. It did not end well.' },
  'Most Likely to Sleep During Class': { icon: IconZzz, description: 'Champion of the 10 AM power nap.' },
  'Most Likely to Become a Millionaire': { icon: IconCoins, description: 'Hustling 24/7 since day one.' },
};

export function getCategoryConfig(name) {
  return CATEGORY_MAP[name] || { icon: IconBrain, description: '' };
}

export default CATEGORY_MAP;
