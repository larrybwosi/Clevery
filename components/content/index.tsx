import { FaHome, FaSearch, FaUsers, FaUser, FaUserFriends } from 'react-icons/fa';

export const sidebarItems = [
  {
    href: '/',
    text: 'Home',
    icon: <FaHome className="w-6 h-6 mr-2" />,
  },
  {
    href: '/search',
    text: 'Search',
    icon: <FaSearch className="w-6 h-6 mr-2" />,
  },
  {
    href: '/communities',
    text: 'Communities',
    icon: <FaUsers className="w-6 h-6 mr-2" />,
    subItems: [
      { href: '', text: '' },
      { href: '/communities/', text: '' },
      { href: '/communities/', text: '' },
    ],
  },
  {
    href: '/profile',
    text: 'Profile',
    icon: <FaUser className="w-6 h-6 mr-2" />,
  },
  {
    href: '/friends',
    text: 'Friends',
    icon: <FaUserFriends className="w-6 h-6 mr-2" />,
  },
];
export const rightBarText ='Have questions or want to share your latest adventures? Bird3r has got you covered. Our platform empowers you to engage in meaningful conversations, connect with like-minded individuals, and explore communities that resonate with your interests. From deep discussions to inspiring stories, Bird3r is the place to connect, engage, and celebrate the diversity of our community.'