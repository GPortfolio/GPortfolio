const packageJSON = require('../../package')

module.exports = {
  // PWA
  app_icon: 'static/images/profile/avatar.png',
  app_color: '#fff',

  // USER
  username: 'Alexeykhr',
  first_name: 'Alexey',
  last_name: 'Khrushch',
  gender: 'Male',
  email: 'alexeykhr@outlook.com',
  profession: 'Web developer',
  image: 'static/images/profile/avatar.png',
  github_url: packageJSON.homepage,
  about_me: [
    'Hi, my name is Alexey Khrushch, I\'m from Ukraine. Now I working in Semalt company, studying in KNUTE university ' +
    'and improving my knowledge on their projects in Github. I like developing my programming skills and I\'m not ' +
    'afraid of difficulties. You also can view source code this site on Github repository.',
    'Love: IT, Traveling, Sport and Open Source.'
  ],
  skills: [
    'PHP', 'HTML', 'CSS', 'Javascript', 'jQuery', 'SQL', 'Git', 'Laravel', 'Vue.js', 'C#'
  ],
  social_media: [
    { name: 'Twitter', href: 'https://twitter.com/Alexeykhr_', icon: 'twitter' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/alexeykhr', icon: 'linkedin' },
    { name: 'Github', href: 'https://github.com/Alexeykhr', icon: 'github' }
  ],
  education: [
    {
      name: 'Kyiv national university of trade and economics (KNUTE)',
      degree: 'Bachelor',
      specialization: 'Computer Software Engineering',
      year: {
        receipt: 2016,
        ending: 2019
      }
    },
    {
      name: '',
      degree: '',
      specialization: '',
      year: {
        receipt: 0,
        ending: 0
      }
    }
  ],
  projects: [
    {
      name: ''
    }
  ],
  jobs: [
    {
      name: ''
    }
  ]
}
