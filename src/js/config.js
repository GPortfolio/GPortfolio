/*
 * NOTE: Supports HTML.
 */

module.exports = {

  /**
   * Specify a valid URL address. Used in the Open graph and other important places*.
   */
  app_url: 'https://alexeykhr.github.io/',

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
  about_me:
    '<p>Hi, my name is Alexey Khrushch, I\'m from Ukraine. Now I practicing in SEMALT company, studying in KNUTE university ' +
    'and improving my knowledge on their projects in Github. I like developing my programming skills and I\'m not ' +
    'afraid of difficulties. You also can view source code this site on Github repository.</p>' +
    '<p>Love: IT, Traveling, Sport, Open Source and tea.</p>',

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

  /**
   * For the date the plugin is used: humanizeDuration. Used only during build, does not fall into js.
   * dates.end - null (Present)
   * @see https://github.com/EvanHahn/HumanizeDuration.js
   */
  experience: [{
    name: 'SEMALT',
    image: 'static/images/logo/semalt.png',
    position: 'Junior PHP Developer',
    description: 'Development of internal projects',
    dates: { start: new Date(2018, 7), end: null }
  }],

  /**
   * School, college, university.
   */
  education: [{
    name: 'Kyiv national university of trade and economics (KNUTE)',
    degree: 'Bachelor\'s degree',
    specialization: 'Computer Software Engineering',
    href: 'https://www.knteu.kiev.ua/',
    image: 'static/images/logo/knteu.png',
    year: { start: 2016, end: 2019 }
  }],

  /* TODO projects */
  projects: [{
    name: ''
  }]

}
