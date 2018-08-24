module.exports = {

  /**
   * Progressive Web Apps (PWA).
   * @see https://developers.google.com/web/progressive-web-apps/
   */
  app_icon: 'static/images/pixabay/resume.png',
  app_color: '#fff',

  /**
   * Basic information about the user + meta tags.
   */
  username: 'Alexeykhr',
  first_name: 'Alexey',
  last_name: 'Khrushch',
  gender: 'Male',
  email: 'alexeykhr@outlook.com',
  profession: 'Web developer',
  image: 'static/images/profile/avatar.jpg',

  /**
   * Notify users about a job search.
   */
  find_job: false,

  /**
   * Display link to Github repository.
   * Homepage attribute in the package.json file.
   */
  display_repository: true,

  /**
   * A little information about yourself (without tags, just text).
   * Each element of the array is wrapped in a <p>.
   */
  about_me: [
    'Hi, my name is Alexey Khrushch, I\'m from Ukraine. Now I practicing in SEMALT company, studying in KNUTE university ' +
    'and improving my knowledge on their projects in Github. I like developing my programming skills and I\'m not ' +
    'afraid of difficulties. You also can view source code this site on Github repository.',
    'Love: IT, Traveling, Sport, Open Source and tea.'
  ],

  /**
   * Programming languages, technologies.
   */
  skills: [
    'PHP', 'HTML', 'CSS', 'Javascript', 'jQuery', 'SQL', 'Git', 'Laravel', 'Vue.js', 'C#'
  ],

  /**
   * Knowledge of foreign languages (the skill is also used in css, for color).
   * @example ../scss/header.scss (languages section)
   */
  languages: [
    { name: 'English', skill: 'Elementary' },
    { name: 'Russian', skill: 'Native' },
    { name: 'Ukrainian', skill: 'Native' }
  ],

  /**
   * name - Name of the site.
   * href - Full url address.
   * icon - Font-awesome 4.7.
   * @see https://fontawesome.com/v4.7.0/icons/
   */
  social_media: [
    { name: 'Twitter', href: 'https://twitter.com/Alexeykhr_', icon: 'twitter' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/alexeykhr', icon: 'linkedin' },
    { name: 'Github', href: 'https://github.com/Alexeykhr', icon: 'github' }
  ],

  /* TODO \/ */

  experience: [{
    name: ''
  }],

  education: [{
    name: 'Kyiv national university of trade and economics (KNUTE)',
    degree: 'Bachelor',
    specialization: 'Computer Software Engineering',
    year: { receipt: 2016, ending: 2019 }
  }, {
    name: '',
    degree: '',
    specialization: '',
    year: { receipt: 0, ending: 0 }
  }],

  projects: [{
    name: ''
  }]

}
