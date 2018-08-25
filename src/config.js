/*
 * NOTE: Supports HTML.
 */

module.exports = {

  /**
   * Used template.
   * @see templates folder
   * @param {Number} app_template
   */
  app_template: 1,

  /**
   * Specify a valid URL address. Used in the Open graph and other important places*.
   * @param {String} app_url - "login" change to your login on Github'e.
   */
  app_url: 'https://login.github.io/',

  /**
   * Progressive Web Apps (PWA).
   * @param {String} app_icon - displays when you open a site from the desktop
   * @param {String} app_theme - changes the color of the toolbar
   * @param {String} app_background - filling backgrounds when the application from the desktop
   * @see https://developers.google.com/web/progressive-web-apps/
   */
  app_icon: 'static/images/pixabay/resume.png',
  app_theme: '#485e6c',
  app_background: '#fff',

  /**
   * The Open Graph protocol
   * @see http://ogp.me/
   */
  opg_description: 'Portfolio by Name Surname. Experience, training, and also implemented projects',

  /**
   * Basic information about the user + for meta tags.
   */
  username: 'My username',
  first_name: 'Name',
  last_name: 'Surname',
  gender: 'Female',
  email: 'mail@example.com',
  profession: 'Senior Graphic Designer',
  image: 'static/images/profile/avatar.jpeg',
  cv: 'static/files/cv.pdf',

  /**
   * Notify users that you are open to suggestions.
   * @param {Boolean} looking_job
   */
  looking_job: true,

  /**
   * Display link to Github repository.
   * @param {Boolean} display_repository
   * @see package.json - homepage attribute
   */
  display_repository: false,

  /**
   * A little information about yourself.
   */
  about_me:
    '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has ' +
    'been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley ' +
    'of type and scrambled it to make a type specimen book.</p> ' +
    '<p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially ' +
    'unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, ' +
    'and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>',


  /**
   * Programming languages, technologies.
   */
  skills: [
    'Photoshop', 'Adobe Illustrator', 'CSS', 'HTML', 'Javascript', 'GIT'
  ],

  /**
   * Knowledge of foreign languages (the skill is also used in css, for color).
   */
  languages: [
    { name: 'English', skill: 'Native' },
    { name: 'German', skill: 'Intermediate' }
  ],

  /**
   * name - Name of the site.
   * href - Full url address to your profile.
   * icon - Font-awesome 4.7.
   * @see https://fontawesome.com/v4.7.0/icons/
   */
  social_media: [
    { name: 'Facebook', href: 'https://facebook.com/profile', icon: 'facebook', },
    { name: 'Twitter', href: 'https://twitter.com/profile', icon: 'twitter' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/profile', icon: 'linkedin' }
  ],

  /**
   * For the date the plugin is used: humanizeDuration. Used only during build, does not fall into js.
   * dates.end - null (Present)
   * @example Date(year, month, day)
   * @see https://github.com/EvanHahn/HumanizeDuration.js
   */
  experience: [{
    name: 'Example name1',
    image: 'static/images/logo/logo1.jpg',
    position: 'Senior Graphic Designer',
    description: 'Development of internal projects',
    dates: { start: new Date(2013, 9), end: null }
  }, {
    name: 'Example name2',
    image: 'static/images/logo/logo2.jpg',
    position: 'Graphic Designer',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ' +
      'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown ' +
      'printer took a galley of type and scrambled it to make a type specimen book.',
    dates: { start: new Date(2003, 2), end: new Date(2013, 7) }
  }],

  /**
   * School, college, university.
   */
  education: [{
    name: 'Massachusetts Institute of Technology',
    degree: 'Bachelor\'s degree',
    specialization: 'Computer Software Engineering',
    href: 'http://www.mit.edu/',
    image: 'static/images/logo/mit.png',
    year: { start: 2011, end: 2015 }
  }],

  /* TODO projects */
  projects: [{
    name: ''
  }]

}
